import React, { memo } from "react";
import { List, WingBlank } from "antd-mobile";
import { LearningStrategyJson } from '../../utils/apiInterface'
import style from './index.module.scss'

export interface IItemListProps extends LearningStrategyJson {

}

const Item = List.Item
const Brief = Item.Brief

export default memo(function ItemList(props: IItemListProps) {
  const { id, title, content, createTime, category, pic } = props
  return (
    <div>
      <WingBlank>
          <Item onClick={() => {}} platform="android" className={style.item} >
            <div className={style.pic}><img src={pic} alt=""/></div>
            <span className={style.title}>{ title }</span>
            <span className={style.category}>{ category }</span>
            <Brief className={style.brief}>
              <span className={style.content}>{ content }</span>
              <span className={style.createTime}>{ createTime }</span>
            </Brief>
          </Item>
      </WingBlank>
    </div>
  );
});
