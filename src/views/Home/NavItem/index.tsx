import React, { useCallback } from 'react'
import style from './index.module.scss'
import { List } from 'antd-mobile'
import { RouteComponentProps, withRouter } from 'react-router-dom'

const Item = List.Item

interface INavItemProps extends RouteComponentProps {
    title: string
    path: string
}

const NavItem: React.FC<INavItemProps> = (props) => {
    const handleClick = useCallback(() => {

    }, [])
    return (
        <div className={style.navItem}>
            <Item
            thumb={props.path}
            arrow="horizontal"
            onClick={handleClick}
            > {props.title} </Item>
        </div>
    )
}

export default withRouter(NavItem)
