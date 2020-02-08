import * as React from 'react';
import style from './index.module.scss'
import { NavLink } from 'react-router-dom';
export interface IArticleHeaderProps {
}

export default class ArticleHeader extends React.Component<IArticleHeaderProps> {
  public render() {
    return (
      <div className={style.articleheader}>
        <ul>
            <li><NavLink to="/article/experience" activeClassName={style.active}>经验百科</NavLink></li>
            <li><NavLink to="/article/learning" activeClassName={style.active}>学习攻略</NavLink></li>
        </ul>
      </div>
    );
  }
}
