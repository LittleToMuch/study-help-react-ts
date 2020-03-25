import React, { useState } from 'react'
import { Comment, Tooltip, Avatar } from 'antd';
import moment from 'moment';
import { DislikeOutlined, LikeOutlined, DislikeFilled, LikeFilled } from '@ant-design/icons';
import style from './index.module.scss'
import { TuTsauJson } from '../../typings/api'

interface ICommentListProps {
    username: string
    avatar: string
    content: string
    createDate?: string
}

const CommentList: React.FC<ICommentListProps> = (props) => {
    const [likes, setLikes] = useState<number>(0)
    const [dislikes, setDislike] = useState<number>(0)
    const [action, setAction] = useState<string | null>(null)

    const like = () => {

    }

    const dislike = () => {

    }

    const actions = [
        <span key="comment-basic-like">
          <Tooltip title="Like">
            {React.createElement(action === 'liked' ? LikeFilled : LikeOutlined, {
              onClick: like,
            })}
          </Tooltip>
          <span className="comment-action">{likes}</span>
        </span>,
        <span key="comment-basic-dislike">
          <Tooltip title="Dislike">
            {React.createElement(action === 'liked' ? DislikeFilled : DislikeOutlined, {
              onClick: dislike,
            })}
          </Tooltip>
          <span className="comment-action">{dislikes}</span>
        </span>,
        <span key="comment-basic-reply-to">Reply to</span>,
      ];

    //   console.log(props.pic)
    
    return (
        <div className={style.root}>
            <Comment
                author={<a>{props.username}</a>}
                avatar={
                <Avatar
                    src={`${process.env.REACT_APP_LOCALHOST}/${props.avatar}`}
                    alt="Han Solo"
                />
                }
                content={
                <p className={style.content}>
                    {props.content}
                </p>
                }
                datetime={
                <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
                    <span>{moment().fromNow()}</span>
                </Tooltip>
                }
            />
        </div>
    )
}

export default CommentList
