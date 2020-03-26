import React, { FunctionComponent } from 'react';
import Tabbar from './components/Tabbar';
import Header from './components/Header';
import { connect } from 'react-redux';
import { Reducers } from './store/reducers';
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { withRouter, RouteComponentProps } from 'react-router-dom';
// import './App.css';

export interface IAppProps extends RouteComponentProps {
  children?: React.ReactNode
  isShow: boolean
}

const App: React.FC<IAppProps> = (props) => {
  return (
    <div className="App">
      {props.children}
      {
        props.isShow ? <Tabbar/> : null
      }
    </div>
  );
}

const mapStateToProps = (state: Reducers) => {
  return {
    isShow: state.tabbarReducer
  }
}

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
