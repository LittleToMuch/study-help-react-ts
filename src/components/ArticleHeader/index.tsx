import * as React from 'react';
import style from './index.module.scss'
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { WingBlank, SegmentedControl } from 'antd-mobile';
export interface IArticleHeaderProps extends RouteComponentProps {
}

class ArticleHeader extends React.Component<IArticleHeaderProps> {
  onChange = (e: any) => {
    switch (e.nativeEvent.selectedSegmentIndex) {
      case 1:
        this.props.history.push('/article/learning')
        break;
      default:
        this.props.history.push('/article/experience')
        break;
    }
    console.log(e.nativeEvent.selectedSegmentIndex);
  }
  public render() {
    return (
      <WingBlank size="lg" className={style.scExample}>
        <SegmentedControl values={['经验百科', '学习攻略']} onChange={this.onChange}/>
      </WingBlank>
    );
  }
}

export default withRouter(ArticleHeader)
