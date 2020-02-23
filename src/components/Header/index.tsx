import React, { ReactElement, useCallback } from "react";
import { NavBar, Icon } from "antd-mobile";
import style from './index.module.scss'
import { RouteComponentProps, withRouter } from "react-router-dom";

interface IHeaderProps extends RouteComponentProps {
    name: string
    path?: string
    hasRight: boolean
    showModal?: () => void
}

function Header(props: IHeaderProps): ReactElement {
  
  const leftClick = () => props.history.push(props.path!)

  const handleClick = useCallback(() => {
    if(props.showModal) {
      props.history.push('/TuTsauModal')
    }
  }, [props])

  return (
    <div>
      <NavBar
        // mode="dark"
        style={{backgroundColor: 'rgb(255, 40, 50)'}}
        icon={props.path ? <Icon type="left" /> : ''}
        onLeftClick={leftClick}
        rightContent={props.hasRight ? [
          <Icon key="1" type="cross" className={style.iconRotate} onClick={handleClick}/>
        ]: ''}
      >
        {props.name}
      </NavBar>
    </div>
  );
}

export default withRouter(Header);
