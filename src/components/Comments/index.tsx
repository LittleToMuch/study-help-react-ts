import React, { useState, ChangeEvent, useEffect, useCallback, useRef } from 'react'
import { Comment, Avatar, Form, Button, List, Input } from 'antd';
import moment from 'moment';
import Editor from '../Editor';
import CommentList from '../CommentList';
import store from '../../store'
import Axios from 'axios';
import { PullToRefresh } from 'antd-mobile';
import style from './index.module.scss'
import { RouteComponentProps, withRouter } from 'react-router-dom';

interface ICommentsProps extends RouteComponentProps {
    id: number
    insertUrl: string
    listUrl: string
}

interface CommentsProps {
    username: string
    avatar: string
    content: string
    createDate?: string
}

const { TextArea } = Input;

const Comments: React.FC<ICommentsProps> = (props) => {
    const [comments, setComments] = useState<CommentsProps[]>([])
    const [value, setValue] = useState<string>('')
    const [submitting, setSubmitting] = useState<boolean>(false)
    const [limit, setLimit] = useState<number>(5)
    const [offset, setOffset] = useState<number>(0)
    const [refreshing, setRefreshing] = useState<boolean>(false)
    const [isBottom, setIsBottom] = useState<boolean>(false)

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setValue(e.target.value)
    }

    const handleSubmit = useCallback(async (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
        setSubmitting(true)
        const params = {
            userid: store.getState().tokenReducer.id,
            commentid: props.id,
            content: value
        }
        const res = await Axios.post(props.insertUrl, params)
        const { code } = res.data
        if (code === 200) {
            setSubmitting(false)
            setValue('')
            const { username, avatar } = store.getState().tokenReducer
            const param: CommentsProps = {
                username, avatar, content: value, createDate: new Date() + ''
            }
            setComments((comments) => [param, ...comments])
        }
    }, [props.id, props.insertUrl, value])

    useEffect(() => {
        // 评论请求接口
        (async () => {
            const data = await getList(limit, offset)
            data && setComments(data)
        })()
        
    }, [])

    const getList = useCallback((limit, offset) => {
        return Axios.get(props.listUrl, {params: {commentid: props.id, limit, offset}}).then(res => {
            const { data, code } = res.data
            if (code === 200) {
                const result: CommentsProps[] = data.map((item: any) => {
                    return { createDate: item.createDate, username: item.username, avatar: item.avatar, content: item.content }
                })
                setOffset(value => value + 5)
                return result
            }
        })
    }, [props.id, props.listUrl])

    const onRefresh = useCallback(async () => {
        console.log(isBottom)
        !isBottom && setRefreshing(true)
        const data = await getList(limit, offset)
        setTimeout(() => {
            if (data?.length) {
                setComments(comments => [...comments, ...data])
            } else {
                setIsBottom(true)
            }
            setRefreshing(false)
        }, 1000);
    }, [getList, limit, offset, isBottom])

    const handleLogin = useCallback(async () => {
        props.history.push(`/login`)
    }, [props.history])

    return (
        <div className={style.root}>
            {
                comments.length > 0 ? 
                // @ts-ignore
                <PullToRefresh
                    damping={60}
                    indicator={isBottom ? {activate: '已经到底啦', deactivate: '已经到底啦', finish: '已经到底啦'} : {deactivate: '上拉可以刷新'}}
                    direction='up'
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                >
                    {   
                        comments.map((item: CommentsProps, index: number) => <CommentList key={index} {...item}/>)
                    }
                </PullToRefresh> :
                null
            }

            {
                localStorage.getItem("token") ? 
                <Comment
                avatar={
                    <Avatar
                    src={`${process.env.REACT_APP_LOCALHOST}/${store.getState().tokenReducer.avatar}`}
                    alt="Han Solo"
                    />
                }
                content={
                    <Editor
                    onChange={handleChange}
                    onSubmit={handleSubmit}
                    submitting={submitting}
                    value={value}
                    />
                }
                /> :
                
                <div className={style.validate}>
                    <Button type="link" block className={style.login} onClick={handleLogin}>
                        登陆后方可评论
                    </Button>
                </div>
                
            }
        </div>
    )
}

export default withRouter(Comments)
