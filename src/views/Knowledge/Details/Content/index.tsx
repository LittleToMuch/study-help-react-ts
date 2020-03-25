import React, { memo } from 'react';
import { VideoJson } from '../../../../utils/apiInterface';
import style from './index.module.scss'
import { timestampToTime } from '../../../../utils/utils';
import { Tag } from 'antd';

interface IContentProps extends VideoJson {

}

const Content: React.FC<IContentProps> = (props) => {
  return (
    <div className={style.root}>
      <p className={style.left}>{ props.video_name }</p>
      <p className={style.right}>
        <Tag color="#2db7f5" className={style.category}>{ props.category }</Tag>
      </p>
      <p className={style.intro}>{ props.video_intro }</p>
      <div>{ timestampToTime(props.createDate) }</div>
    </div>
  )
};

export default memo(Content);
