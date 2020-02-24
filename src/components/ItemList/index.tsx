import React, { memo } from "react";
import { List, WingBlank } from "antd-mobile";
import { timestampToTime } from '../../utils/utils'
import style from './index.module.scss'

export interface IItemListProps {
    id: number
    title: string
    content: string
    createDate: string
    category: string
    pic: string
    userid?: number
}

const Item = List.Item
const Brief = Item.Brief

export default function ItemList(props: IItemListProps) {
  const { id, title, content, createDate, category, pic } = props
  const time = timestampToTime(createDate).split(" ")[0]
  console.log(time)
  return (
    <div>
      <WingBlank size="sm">
          <Item onClick={() => {}} platform="android" className={style.item} >
            <div className={style.pic}><img src={`http://localhost:8080/${pic}`} alt=""/></div>
            <span className={style.title}>{ title }</span>
            <span className={style.category}>{ category }</span>
            <Brief className={style.brief}>
              <span className={style.content}>{ content }</span>
              <span className={style.createTime}>{ time }</span>
            </Brief>
          </Item>
      </WingBlank>
    </div>
  );
};
