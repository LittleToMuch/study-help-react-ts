import React, { ReactElement, useCallback } from "react";
import { NavBar, Icon } from "antd-mobile";
import style from './index.module.scss'

interface IHeaderProps {
    name: string
    path?: string
    hasRight: boolean
}

function Header(props: IHeaderProps): ReactElement {
    const leftClick = useCallback(() => {
        
    }, [])
  return (
    <div>
      <NavBar
        // mode="dark"
        style={{backgroundColor: 'rgb(255, 40, 50)'}}
        icon={props.path ? <Icon type="left" /> : ''}
        onLeftClick={() => leftClick()}
        rightContent={props.hasRight ? [
          <Icon key="1" type="cross" className={style.iconRotate}/>
        ]: ''}
      >
        {props.name}
      </NavBar>
    </div>
  );
}

export default Header;
