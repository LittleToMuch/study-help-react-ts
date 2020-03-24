import React, { useEffect, memo, useCallback, useState } from 'react';
import Header from '../../../components/Header';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import Axios from 'axios';
import { VideoJson } from '../../../utils/apiInterface';
import style from './index.module.scss'

interface ParamId {
  id: string
}

interface IKnowledgeDetailProps extends RouteComponentProps<ParamId> {
}

const KnowledgeDetail: React.FC<IKnowledgeDetailProps> = (props) => {
  const [renderList, setRenderList] = useState<VideoJson | null>(null)
  useEffect(() => {
    getList()
  }, [])
  const getList = useCallback(async () => {
    const { id } = props.match.params
    const res = await Axios.get('/api/video/list', { params: { id: +id } })
    const { data } = res.data
    setRenderList(data[0])
  }, [props.match.params])
  console.log(renderList)
  return (
    <div>
      <Header name="视频详情" path={-1} />
      {
        renderList ? <video className={style.video} src={`http://localhost:8080/${renderList.video_path}`} preload="meta" x5-playsinline poster={`http://localhost:8080/${renderList.video_pic}`} controls>
          <source src={`http://localhost:8080/${renderList.video_path}`} type="video/mp4" />
          <source src={`http://localhost:8080/${renderList.video_path}`} type="video/webm" />
        </video> : null
      }
      
    </div>
  )
};

export default withRouter(memo(KnowledgeDetail));
