import React, { useEffect, useState, useCallback } from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import Axios from '../../../../utils/axios'
import { Card, Tag } from 'antd'
import style from './index.module.scss'
import { hideTabbar, showTabbar } from './actionCreater'
import { connect } from 'react-redux'
import Header from '../../../../components/Header'
import { TuTsauJson } from '../../../../typings/api'
import CollectIcon from './CollectIcon'
import { WingBlank, Toast } from 'antd-mobile'
import { timestampToTime } from '../../../../utils/utils'
import store from '../../../../store'
import Comments from '../../../../components/Comments'
import LikeIcon from "./LikeIcon";

interface ParamId {
    id: string
}

interface IDetailsProps extends RouteComponentProps<ParamId> {
    url: string
    headName: string
    hasLike?: boolean
    hideTabbar: () => ReturnType<typeof hideTabbar>
    showTabbar: () => ReturnType<typeof showTabbar>
}

const Details: React.FC<IDetailsProps> = (props) => {
    const [data, setData] = useState<TuTsauJson>()
    const [collectColor, setCollectColor] = useState<boolean>(false)
    const [likeColor, setLikeColor] = useState<boolean>(false)
    useEffect(() => {
        props.hideTabbar()
        const { id } = props.match.params
        const params = { userid: store.getState().tokenReducer.id, experienceid: +id }
        console.log(params)
        Axios.get('/api/experience/list', { params: { id } }).then(res => {
            const { data } = res.data
            setData(data[0])
        })
        Axios.post('/api/experience/isCollection', params).then(res => {
            const { code } = res.data
            console.log(code)
            code === 200 && setCollectColor(true)
        })
        Axios.post('/api/experience/isLike', params).then(res => {
            const { code } = res.data
            console.log(code)
            code === 200 && setLikeColor(true)
        })
        return () => { props.showTabbar() }
    }, [props, props.match.params, props.url])

    const successToast = (msg: string): void => Toast.success(msg, 1);

    const onCollectColor = useCallback(async () => {
        if (localStorage.getItem("token")) {
            const params = { userid: store.getState().tokenReducer.id, experienceid: +props.match.params.id }
            const res = collectColor ? await Axios.post('/api/experience/disCollect', params) : await Axios.post('/api/experience/collect', params)
            const { code, msg } = res.data
            if (code === 200) {
                successToast(msg)
                setCollectColor(color => !color)
            }
        } else {
            props.history.push(`/login`)
        }
    }, [props.history, props.match.params.id, collectColor])

    const onLikeColor = useCallback(async () => {
        if (localStorage.getItem("token")) {
            const params = { userid: store.getState().tokenReducer.id, experienceid: +props.match.params.id }
            const res = likeColor ? await Axios.post('/api/experience/disLike', params) : await Axios.post('/api/experience/like', params)
            const { code, msg } = res.data
            if (code === 200) {
                successToast(msg)
                setLikeColor(color => !color)
            }
        } else {
            props.history.push(`/login`)
        }
    }, [props.history, props.match.params.id, likeColor])

    return (
        <div className={style.cardBox}>
            <Header name="经验详情" path="/article/experience"/>
            <Card title={data?.title} bordered={false} headStyle={{fontSize: '.3rem'}} extra={<div className={style.icon}>
                <LikeIcon style={{color: likeColor ? '#f4ea2a' : 'grey'}} likeCb={onLikeColor} />
                <CollectIcon style={{color: collectColor ? '#f4ea2a' : 'grey'}} collectCb={onCollectColor} />
            </div>}>
                <p className={style.img}>
                    <img src={`http://localhost:8080/${data?.pic}`} alt=""/>
                </p>
                <p>{data?.content}</p>
                <p className={style.date}>{data?.createDate && timestampToTime(data?.createDate)}</p>
                <Tag color="cyan" className={style.tag}>{data?.category}</Tag>
            </Card>
            <div className={style.comments}>
                <WingBlank size="lg">
                    <Comments id={+props.match.params.id} insertUrl="/api/experience/insertComment" listUrl="/api/experience/listComment"/>
                </WingBlank>
            </div>
        </div>
    )
}

const mapDisPatchToProps = {
    hideTabbar,
    showTabbar
}

export default connect(null, mapDisPatchToProps)(withRouter(Details))
