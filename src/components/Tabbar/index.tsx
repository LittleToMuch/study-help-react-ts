import React, { useState, FunctionComponent } from "react";
import { NavLink } from 'react-router-dom'
import style from './index.module.scss'
import { routelist } from '../../router/routelist'

interface ITabbarPorps {
}

const Tabbar: FunctionComponent = (props: ITabbarPorps) => {
    const [datalist, setDatalist] = useState(routelist)
    return (
        <div className={style.tabbar}>
            <ul>
                {
                    datalist.map(item => (
                        <li key={item.path}>
                            <NavLink to={item.path} activeClassName={style.active}>{item.name}</NavLink>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default Tabbar