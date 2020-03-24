import * as React from 'react';
import style from './index.module.scss'
import { VideoJson } from '../../../utils/apiInterface';
import { RouteComponentProps, withRouter } from 'react-router-dom';

interface Props extends RouteComponentProps {
  title: string
  datalist: VideoJson[]
};
interface State  {
  renderList: VideoJson[]
};

class Content extends React.PureComponent<Props, State> {
  public state = {
    renderList: []
  }

  public componentDidMount() {
    const renderList = this.props.datalist.slice(0, 2)
    this.setState({ renderList })
  }

  private handleClick = (id: number) => {
    this.props.history.push(`/knowledge/details/${id}`)
  }

  public render() {
    const { renderList } = this.state
    return (
        <div className={style.root}>
          <p>{this.props.title}</p>
          <div className={style.content}>
            {
              renderList.length ? renderList.map((item: VideoJson) => (
                <div key={item.id}><img src={`http://localhost:8080/${item.video_pic}`} alt="" onClick={this.handleClick.bind(this, item.id)}/><span>{ item.video_name }</span></div>
              )) : null
            }
          </div>
        </div>
    );
  };
};

export default withRouter(Content)