import React, { useEffect, memo, useCallback, useState } from 'react';
import Header from '../../../components/Header';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import Axios from 'axios';
import { VideoJson } from '../../../utils/apiInterface';
import style from './index.module.scss'
import Content from './Content';

interface ParamId {
  id: string
}

interface IKnowledgeDetailProps extends RouteComponentProps<ParamId> {
}

const KnowledgeDetail: React.FC<IKnowledgeDetailProps> = (props) => {
  const [render, setRender] = useState<VideoJson | null>(null)
  useEffect(() => {
    getList()
  }, [])
  const getList = useCallback(async () => {
    const { id } = props.match.params
    const res = await Axios.get('/api/video/list', { params: { id: +id } })
    const { data } = res.data
    setRender(data[0])
  }, [props.match.params])
  return (
    <div>
      <Header name="视频详情" path={-1} />
      {
        render ? <video className={style.video} src={`${process.env.REACT_APP_LOCALHOST}/${render.video_path}`} preload="meta" poster={`${process.env.REACT_APP_LOCALHOST}/${render.video_pic}`} controls>
          <source src={`${process.env.REACT_APP_LOCALHOST}/${render.video_path}`} type="video/mp4" />
          <source src={`${process.env.REACT_APP_LOCALHOST}/${render.video_path}`} type="video/webm" />
        </video> : null
      }
      {render ? <Content {...render} /> : null}
    </div>
  )
};

export default withRouter(memo(KnowledgeDetail));
