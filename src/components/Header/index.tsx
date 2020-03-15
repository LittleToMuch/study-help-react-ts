import React, { ReactElement, useCallback } from "react";
import { NavBar, Icon } from "antd-mobile";
import style from './index.module.scss'
import { RouteComponentProps, withRouter } from "react-router-dom";
import DropDown from "./DropDown";

interface IHeaderProps extends RouteComponentProps {
    name: string
    path?: string | number
    hasRight?: string
    hasCategory?: boolean
}

function Header(props: IHeaderProps): ReactElement {
  
  const leftClick = () => {
    typeof props.path === 'string' && props.history.push(props.path)
    typeof props.path === 'number' && props.history.go(props.path)
  }

  const handleClick = useCallback(() => {
    props.hasRight && props.history.push(props.hasRight)
  }, [props])

  return (
    <div className={style.header}>
      <NavBar
        // mode="dark"
        style={{backgroundColor: 'rgb(255, 40, 50)', position: 'fixed', width: '100%', height: '45px', zIndex: 1}}
        icon={props.path ? <Icon type="left" /> : ''}
        onLeftClick={leftClick}
        rightContent={props.hasRight ? [
          <Icon key="1" type="cross" className={style.iconRotate} onClick={handleClick}/>
        ]: props.hasCategory ? <DropDown/> : null}
      >
        {props.name}
      </NavBar>
    </div>
  );
}

export default withRouter(Header);
