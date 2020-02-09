import React, { memo } from "react";
import { List } from "antd-mobile";
import { LearningStrategyJson } from '../../utils/apiInterface'

export interface IItemListProps extends LearningStrategyJson {

}

const Item = List.Item
const Brief = Item.Brief

export default memo(function ItemList(props: IItemListProps) {
  const { id, title, content, createTime, category, pic } = props
  return (
    <div>
      <List renderHeader={() => title} className="my-list">
        <Item multipleLine onClick={() => {}} platform="android">
          <span style={{float: "left"}}>pic</span>
          {content}
          <Brief>
            {createTime}
            <span style={{float: "right"}}>{category}</span>
          </Brief>
        </Item>
      </List>
    </div>
  );
});
