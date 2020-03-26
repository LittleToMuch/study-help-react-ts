import * as React from 'react';
import style from './index.module.scss'
import { VideoJson } from '../../../utils/apiInterface';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Spin } from 'antd';

interface Props extends RouteComponentProps {
  title: string
  datalist: VideoJson[]
};
interface State  {
  renderList: VideoJson[]
  loading: boolean
};

class Content extends React.PureComponent<Props, State> {
  public state = {
    renderList: [],
    loading: true
  }

  public componentDidMount() {
    const renderList = this.props.datalist.slice(0, 2)
    this.setState({ renderList })
  }

  private handleClick = (id: number) => {
    this.props.history.push(`/knowledge/details/${id}`)
  }

  private handleLoad = () => {
    this.setState({ loading: false })
  }

  private moreClick = () => {
    const param = encodeURIComponent(this.props.title)
    this.props.history.push(`/konwledge/more/${param}`)
  }

  public render() {
    const { renderList, loading } = this.state
    return (
        <div className={style.root}>
          <p>{this.props.title}<span onClick={this.moreClick.bind(this)}>更多></span></p>
          <div className={style.content}>
            {
              renderList.length ? renderList.map((item: VideoJson) => (
                <div key={item.id} className={style.box}>
                  <Spin spinning={loading} size="small" className={style.spin}>
                    <img src={`${process.env.REACT_APP_LOCALHOST}/${item.video_pic}`} onLoad={this.handleLoad} onClick={this.handleClick.bind(this, item.id)}/>
                  </Spin>
                  <span>{ item.video_name }</span>
                </div>
              )) : null
            }
          </div>
        </div>
    );
  };
};

export default withRouter(Content)