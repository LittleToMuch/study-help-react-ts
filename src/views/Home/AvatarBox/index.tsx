import React, {ReactElement, useCallback, useMemo, useState} from 'react'
import style from './index.module.scss'
import { Avatar, Card, Skeleton, Menu } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import {Modal, Toast} from 'antd-mobile';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import store from "../../../store";
import Axios from "axios";
import { removeToken } from "../../../utils/utils";
import {connect} from "react-redux";
import { clearToken } from './actionCreater'

interface IAvatarProps extends RouteComponentProps {
    avatar: string
    username: string
    clearToken: () => void
}

const { Meta } = Card;

const menu = (
    <Menu>
      <Menu.Item key="0">
        修改密码
      </Menu.Item>
    </Menu>
);

function AvatarBox(props: IAvatarProps): ReactElement {
    const [loading, changeLoading] = useState<boolean>(false)

    const imgUrl = useMemo(() => {
      return `${process.env.REACT_APP_LOCALHOST}/${props.avatar}`
    }, [props])

    const updateAvatar = useCallback(() => {
      props.history.push(`/updateAvatar`)
    }, [props.history])

    const editPassword = useCallback(() => {
      const { id, password } = store.getState().tokenReducer
      Modal.prompt(
          '修改密码',
          '输入旧密码以验证身份',
          async psw => {
            const res = await Axios.post('/api/users/vertifyOldpsw', { password: psw })
            const { data } = res.data
            if(data === password) {
              Modal.prompt(
                  '修改密码',
                  '输入新密码',
                  async psw => {
                    const res = await Axios.post('/api/users/setPassword', {password: psw, id})
                    console.log(res)
                    const { code } = res.data
                    code === 200 && Toast.success('修改成功 !!! 请重新登录', 1, () => {
                      removeToken()
                      props.history.push(`/login`)
                    })
                  },
                  'secure-text',
                  '',
                  ['请输入新密码']
              )
            } else {
              Toast.fail('旧密码输入错误 !!!', 1);
            }
          },
          'secure-text',
          '',
          ['请输入旧密码'],
      )
    }, [props.history])

    const logout = useCallback(() => {
      removeToken()
      props.clearToken()
      Toast.success('注销成功', 1, () => props.history.push(`/login`))
    }, [props])

    const actions = [
      <EditOutlined key="edit" onClick={editPassword}/>,
      <SettingOutlined key="setting" onClick={updateAvatar}/>,
      <EllipsisOutlined key="ellipsis" onClick={logout}/>
    ]

    return (
        <div className={style.avatar}>
            <Card
            style={{ width: '100%', marginTop: 2 }}
            actions={actions}
            >
            <Skeleton loading={loading} avatar active>
                <Meta
                avatar={
                    <Avatar size={60} src={imgUrl} />
                }
                title={props.username}
                description="我的青春我做主~"
                />
            </Skeleton>
            </Card>
        </div>
    )
}

export const mapDispatchToProps = {
  clearToken
}

export default connect(null, mapDispatchToProps)(withRouter(AvatarBox))
