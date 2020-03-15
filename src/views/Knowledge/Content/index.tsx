import * as React from 'react';
import style from './index.module.scss'

type Props = {
  title: string
};
type State = {

};

export default class Content extends React.Component<Props, State> {


  public render() {
    return (
        <div className={style.root}>
          <p>{this.props.title}</p>
          <div className={style.content}>
            <div><img src="" alt=""/><span>xxxxx</span></div>
            <div><img src="" alt=""/><span>xxxxx</span></div>
          </div>
        </div>
    );
  };
};