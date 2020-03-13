import React, { useEffect, useState, useCallback } from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import Axios from '../../utils/axios'
import { Card, Tag } from 'antd'
import style from './index.module.scss'
import { hideTabbar, showTabbar } from './actionCreater'
import { connect } from 'react-redux'
import Header from '../Header'
import { TuTsauJson } from '../../typings/api'
import CollectIcon from './CollectIcon'
import Comments from '../Comments'
import { WingBlank, Toast } from 'antd-mobile'
import { timestampToTime } from '../../utils/utils'
import store from '../../store'

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
    const [color, setColor] = useState<boolean>(false)
    useEffect(() => {
        props.hideTabbar()
        const { id } = props.match.params
        Axios.get(props.url, { params: { id } }).then(res => {
            const { data } = res.data
            setData(data[0])
        })
        if (localStorage.getItem("token")) {
            const params = { userid: store.getState().tokenReducer.id, tutsauid: id }
            Axios.post('/api/tutsau/isCollection', params).then(res => {
                const { code } = res.data
                code === 200 ? setColor(true) : setColor(false)
            })
        }
        return () => { props.showTabbar() }
    }, [])
    console.log(data)
    const successToast = (msg: string): void => Toast.success(msg, 1);

    const onSetColor = async () => {
        if (localStorage.getItem("token")) {
            const params = { userid: store.getState().tokenReducer.id, tutsauid: props.match.params.id }
            const res = color ? await Axios.post('/api/tutsau/disCollectTutsau', params) : await Axios.post('/api/tutsau/collectTutsau', params)
            const { code, msg } = res.data
            if (code === 200) {
                successToast(msg)
                setColor(color => !color)
            }
        } else {
            props.history.push(`/login`)
        }
    }

    return (
        <div className={style.cardBox}>
            <Header name={ props.headName } path={-1}/>
            <Card title={data?.title} bordered={false} headStyle={{fontSize: '.3rem'}} extra={<div><CollectIcon style={{color: color ? '#f4ea2a' : 'grey'}} onClick={onSetColor}/></div>}>
                <p className={style.img}>
                    <img src={`http://localhost:8080/${data?.pic}`} alt=""/>
                </p>
                <p>{data?.content}</p>
                <p className={style.date}>{data?.createDate && timestampToTime(data?.createDate)}</p>
                <Tag color="cyan" className={style.tag}>{data?.category}</Tag>
            </Card>
            <div className={style.comments}>
                <WingBlank size="lg">
                    <Comments id={+props.match.params.id} insertUrl="/api/tutsau/insertComment" listUrl="/api/tutsau/listComment"/>
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
