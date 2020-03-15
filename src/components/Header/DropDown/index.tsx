import React from 'react'
import {Dropdown, Menu} from "antd";
import { UnorderedListOutlined } from '@ant-design/icons';
interface IDropDownProps {
}
const handleClick = (e: any) => {
  console.log(e)
}
const menu = (
    <Menu onClick={handleClick}>
      <Menu.Item key={0}>推荐/免费</Menu.Item>
      <Menu.Divider />
      <Menu.Item key={1}>付费</Menu.Item>
    </Menu>
);

const DropDown: React.FC<IDropDownProps> = (props) => {
  return (
      <div>
        <Dropdown overlay={menu} trigger={['click']}>
            <UnorderedListOutlined />
        </Dropdown>
      </div>
  )
}

export default DropDown
