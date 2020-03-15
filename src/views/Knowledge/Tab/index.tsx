import * as React from 'react';
import style from './index.module.scss'

interface ITabProps {
  name: string
};

interface ITabState {

};

export default class Tab extends React.PureComponent<ITabProps, ITabState> {
  render() {
    return (
        <div className={style.root}>
          <span>{this.props.name}</span>
        </div>
    );
  };
};