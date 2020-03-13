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
  }
  public componentDidMount () {
    if (this.props.history.location.pathname === '/article/learning') {
      const event = {
      nativeEvent: {
          selectedSegmentIndex: 1
        }
      }
      this.onChange(event)
    }
    
  }
  public render() {
    return (
      <div className={style.articleHeader}>
        <WingBlank size="lg" className={style.scExample}>
          <SegmentedControl values={['经验百科', '学习攻略']} tintColor={'#ff0000'} onChange={this.onChange} className={style.segControl}/>
        </WingBlank>
      </div>
      
    );
  }
}

export default withRouter(ArticleHeader)
