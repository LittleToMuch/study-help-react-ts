import React, { useEffect, memo, useCallback, useState } from 'react';
import Header from '../../../components/Header';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import Axios from 'axios';
import { VideoJson } from '../../../utils/apiInterface';
import style from './index.module.scss'
import Content from './Content';
import store from '../../../store';

interface ParamId {
  id: string
}

interface IKnowledgeDetailProps extends RouteComponentProps<ParamId> {
}

const KnowledgeDetail: React.FC<IKnowledgeDetailProps> = (props) => {
  const [render, setRender] = useState<VideoJson | null>(null)
  const [isRole, setIsRole] = useState<boolean>(false)
  useEffect(() => {
    const { role } = store.getState().tokenReducer
    role ? setIsRole(true) : setIsRole(false)
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
      <div className={render?.video_price ? isRole ? style.hide : style.mock : style.hide}>
        {
          window.localStorage.getItem("userInfo") ? <span>付费后方可观看</span> : <span>请登陆后观看</span>
        }
      </div>
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
