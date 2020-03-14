import * as React from 'react';
import style from './index.module.scss'
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { WingBlank, SegmentedControl } from 'antd-mobile';
import { connect } from 'react-redux';
import { Reducers } from '../../../store/reducers';
export interface IArticleHeaderProps extends RouteComponentProps {
  backState?: boolean
}

class ArticleHeader extends React.PureComponent<IArticleHeaderProps> {
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
  }
  public render() {
    const { backState } = this.props
    return (
      <div className={style.articleHeader}>
        <WingBlank size="lg" className={style.scExample}>
          <SegmentedControl selectedIndex={backState ? 1 : 0} values={['经验百科', '学习攻略']} tintColor={'#ff0000'} onChange={this.onChange} className={style.segControl}/>
        </WingBlank>
      </div>
      
    );
  }
}

export const mapStateToProps = (state: Reducers): {backState: boolean} => {
    return {
        backState: state.backState
    }
}

export default connect(mapStateToProps, null)(withRouter(ArticleHeader))
