import React, { FunctionComponent } from 'react';
import Tabbar from './components/Tabbar';
// import './App.css';

export interface IAppProps {
  children?: React.ReactNode
}

const App: FunctionComponent = (props: IAppProps) => {
  return (
    <div className="App">
      {props.children}
      <Tabbar/>
    </div>
  );
}

export default App;
