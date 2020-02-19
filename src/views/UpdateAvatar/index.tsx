import React, { useCallback, useState } from 'react'
import Header from '../../components/Header'
import UploadAvatar from '../../components/UploadAvatar'
import { Button } from 'antd'
import style from './index.module.scss'
import store from '../../store'
import Axios from "axios";
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { Toast, Modal } from "antd-mobile";
import { setAvatar } from './actionCreater'
import {connect} from "react-redux";
import {SetAvatar} from "../../store/state";

interface IUpdateAvatarProps extends RouteComponentProps{
  setAvatar: (params: SetAvatar) => object
}

function UpdateAvatar(props: IUpdateAvatarProps) {
    const [path, setPath] = useState<string | undefined>('')
    const [animating, setAnimating] = useState<boolean>(false)

    const uploadPath = useCallback((path: string | undefined) => {
        setPath(path)
    }, [])

    const uploadClick = useCallback(async () => {
        Modal.alert('修改', '确定修改头像嘛???', [
          { text: 'Cancel', onPress: () => console.log('cancel') },
          { text: 'Ok', onPress: async () => {
              const { id } = store.getState().tokenReducer
              const res = await Axios.post('/api/users/updateAvatar', { path, id })
              const { code } = res.data
              code === 200 && props.setAvatar({ avatar: path! }) && Toast.success('修改成功 !!!', 1, () => props.history.push(`/home`))
            } },
        ])
    }, [path])

    return (
        <div>
            <Header name="修改头像" hasRight={ false } path="/home"/>
            <main className={style.main}>
                <UploadAvatar uploadPath={uploadPath}/>
                <Button type="danger" disabled={!path} className={style.btn} onClick={uploadClick}>上传</Button>
            </main>
        </div>
    )
}

export const mapDispatchToProps = {
  setAvatar
}

export default connect(null, mapDispatchToProps)(withRouter(UpdateAvatar))
