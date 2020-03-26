import React from 'react'
import {Dropdown, Menu} from "antd";
import { UnorderedListOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { isPay, noPay } from './actionCreater'
import { Reducers } from '../../../store/reducers';
import { RouteComponentProps, withRouter } from 'react-router-dom';

interface IDropDownProps extends RouteComponentProps {
  isPay: () => ReturnType<typeof isPay>
  noPay: () => ReturnType<typeof noPay>
  id: number
}

const DropDown: React.FC<IDropDownProps> = (props) => {
  const handleClick = (e: any) => {
    if (e.key == 0) {
      props.noPay()
    } else {
      props.id ? props.isPay() : props.history.push(`/login`)
    }
  }

  const menu = (
    <Menu onClick={handleClick}>
      <Menu.Item key={0}>推荐/免费</Menu.Item>
      <Menu.Divider />
      <Menu.Item key={1}>付费</Menu.Item>
    </Menu>
  );
  
  return (
      <div>
        <Dropdown overlay={menu} trigger={['click']}>
            <UnorderedListOutlined />
        </Dropdown>
      </div>
  )
}

const mapStateToProps = (store: Reducers) => {
  return {
    id: store.tokenReducer.id
  }
}

const mapDispatchToProps = {
  isPay,
  noPay
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(DropDown))
