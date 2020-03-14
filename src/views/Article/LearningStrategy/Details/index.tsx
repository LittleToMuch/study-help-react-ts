import React, { useEffect, useState, useCallback } from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import Axios from '../../../../utils/axios'
import { Card, Tag } from 'antd'
import style from './index.module.scss'
import { hideTabbar, showTabbar, backStateEnter } from './actionCreater'
import { connect } from 'react-redux'
import Header from '../../../../components/Header'
import { TuTsauJson } from '../../../../typings/api'
import CollectIcon from './CollectIcon'
import { WingBlank, Toast } from 'antd-mobile'
import { timestampToTime } from '../../../../utils/utils'
import store from '../../../../store'
import Comments from '../../../../components/Comments'
import LikeIcon from "../../Experience/Details/LikeIcon";

interface ParamId {
    id: string
}

interface IDetailsProps extends RouteComponentProps<ParamId> {
    url: string
    headName: string
    hasLike?: boolean
    hideTabbar: () => ReturnType<typeof hideTabbar>
    showTabbar: () => ReturnType<typeof showTabbar>
    backStateEnter: () => ReturnType<typeof backStateEnter>
}

const Details: React.FC<IDetailsProps> = (props) => {
    const [data, setData] = useState<TuTsauJson>()
    const [color, setColor] = useState<boolean>(false)
    const [likeColor, setLikeColor] = useState<boolean>(false)
    useEffect(() => {
        props.hideTabbar()
        props.backStateEnter()
        const { id } = props.match.params
        const params = { userid: store.getState().tokenReducer.id, learningstrategyid: id }
        Axios.get('/api/learning/list', { params: { id } }).then(res => {
            const { data } = res.data
            setData(data[0])
        })
        Axios.post('/api/learning/isCollection', params).then(res => {
            const { code } = res.data
            code === 200 && setColor(true)
        })
        return () => {
            props.showTabbar()
        }
    }, [props, props.match.params, props.url])

    const successToast = (msg: string): void => Toast.success(msg, 1);
    const failToast = (msg: string): void => Toast.fail(msg, 1,);

    const onCollectColor = useCallback(async () => {
        if (localStorage.getItem("token")) {
            const params = { userid: store.getState().tokenReducer.id, learningstrategyid: +props.match.params.id }
            const res = color ? await Axios.post('/api/learning/disCollect', params) : await Axios.post('/api/learning/collect', params)
            const { code, msg } = res.data
            if (code === 200) {
                successToast(msg)
                setColor(color => !color)
            } else {
                failToast(msg)
            }
        } else {
            props.history.push(`/login`)
        }
    }, [props.history, props.match.params.id, color])

    const onLikeColor = useCallback(async () => {
        if (localStorage.getItem("token")) {
            const params = { userid: store.getState().tokenReducer.id, learningstrategyid: +props.match.params.id }
            const res = likeColor ? await Axios.post('/api/learning/disLike', params) : await Axios.post('/api/learning/like', params)
            const { code, msg } = res.data
            if (code === 200) {
                successToast(msg)
                setLikeColor(color => !color)
            } else {
                failToast(msg)
            }
        } else {
            props.history.push(`/login`)
        }
    }, [props.history, props.match.params.id, likeColor])

    return (
        <div className={style.cardBox}>
            <Header name="攻略详情" path={-1}/>
            <Card title={data?.title} bordered={false} headStyle={{fontSize: '.3rem'}} extra={<div className={style.icon}>
                <LikeIcon style={{color: likeColor ? '#f4ea2a' : 'grey'}} likeCb={onLikeColor} />
                <CollectIcon style={{color: color ? '#f4ea2a' : 'grey'}} collectCb={onCollectColor} />
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
                    <Comments id={+props.match.params.id} insertUrl="/api/learning/insertComment" listUrl="/api/learning/listComment"/>
                </WingBlank>
            </div>
        </div>
    )
}

const mapDisPatchToProps = {
    hideTabbar,
    showTabbar,
    backStateEnter
}

export default connect(null, mapDisPatchToProps)(withRouter(Details))
