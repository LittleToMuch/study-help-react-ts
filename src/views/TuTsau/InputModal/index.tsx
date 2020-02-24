import React, { useCallback, useState, ReactText, useLayoutEffect } from 'react'
import style from './index.module.scss'
import { List, TextareaItem, Picker, WingBlank, Button, WhiteSpace, ActivityIndicator, Toast } from 'antd-mobile';
import Header from '../../../components/Header';
import { connect } from 'react-redux';
import { hideTabbar, showTabbar } from './actionCreater'
import UploadImg from './UploadImg';
import store from '../../../store';
import Axios from 'axios';
import { RouteComponentProps, withRouter } from 'react-router-dom';

interface IInputModalProps extends RouteComponentProps {
    hideTabbar: () => ReturnType<typeof hideTabbar>
    showTabbar: () => ReturnType<typeof showTabbar>
}

const InputModal: React.FC<IInputModalProps> = (props) => {

    const [loading, setLoading] = useState<boolean>(false)
    
    const [category, setCategory] = useState<ReactText[]>([])
    const [imgUrl, setImgUrl] = useState<string>('')
    const [title, setTitle] = useState<string | undefined>('')
    const [content, setContent] = useState<string | undefined>('')

    useLayoutEffect(() => {
        props.hideTabbar()
        return () => {
            props.showTabbar()
        }
    }, [props])

    const handleOk = useCallback((val: ReactText[]) => setCategory(val), [])

    const getImgUrl = useCallback((url: string) => setImgUrl(url), [])

    const titleChange = useCallback((title?: string) => setTitle(title), [])

    const contentChange = useCallback((content?: string) => setContent(content), [])

    const successToast = useCallback((msg: string): void => Toast.success(msg, 1, () => props.history.push('/tutsau')), [props.history]);

    const handleSubmit = useCallback(async () => {
        setLoading(true)
        const { id } = store.getState().tokenReducer
        const param = { userid: id, title, content, pic: imgUrl, category: category[0], createDate: new Date() }
        const res = await Axios.post('/api/tutsau/insert', param)
        setLoading(false)
        const { code } = res.data
        code === 200 && successToast('发布成功~~')
    }, [category, content, imgUrl, successToast, title])

    return (
        <div>
            <Header name="吐槽发布中..." hasRight={false} path="/tutsau"/>
            <WingBlank>
                <List renderHeader={() => '标题:'}>
                    <TextareaItem count={15} value={title} onChange={titleChange}/>
                </List>
                <List renderHeader={() => '类别:'}>
                    <Picker data={store.getState().tutsauCategory} cols={1} className="forss" value={category} onOk={handleOk}>
                        <List.Item arrow="horizontal">类别:</List.Item>
                    </Picker>
                </List>
                <List renderHeader={() => '选择图片:'}>
                    <UploadImg imgUrl={getImgUrl}/>
                </List>
                <List renderHeader={() => '内容:'}>
                    <TextareaItem rows={5} count={100} value={content} onChange={contentChange} />
                </List>
                <WhiteSpace size="xl" />
                <Button type="warning" size="small" onClick={handleSubmit}>提交</Button>
            </WingBlank>
            <ActivityIndicator size="large" animating={loading} text="吐槽发布中" className={style.loading}/>
        </div>
    )
}

// const mapStateToProps = (state: Reducers) => {
//     return {
//         district: state.tutsauCategory
//     }
// }

const mapDispatchToProps = {
    hideTabbar,
    showTabbar
}

export default connect(null, mapDispatchToProps)(withRouter(InputModal))
