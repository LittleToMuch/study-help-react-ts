import React, { FunctionComponent } from 'react';
import Tabbar from './components/Tabbar';
import Header from './components/Header';
import { connect } from 'react-redux';
import { Reducers } from './store/reducers';
// import './App.css';

export interface IAppProps {
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

export default connect(mapStateToProps, mapDispatchToProps)(App);
