import * as React from 'react';
import style from './index.module.scss'
import { Spin, Tag } from 'antd';
import { VideoJson } from '../../../../utils/apiInterface';
import { RouteComponentProps, withRouter } from 'react-router-dom';

interface IMoreContentProps extends RouteComponentProps {
    renderlist: VideoJson[]
}

const MoreContent: React.FC<IMoreContentProps> = (props) => {
    const [loading, setLoading] = React.useState<boolean>(true)

    const handleLoad = React.useCallback(() => {
        setLoading(false)
    }, [])

    const handleClick = React.useCallback((id: number) => {
        props.history.push(`/knowledge/details/${id}`)
    }, [])
  return (
      <main className={style.root}>
          <div className={style.content}>
              {
                  props.renderlist.length ? props.renderlist.map((item: VideoJson) => (
                    <div key={item.id} className={style.box}>
                        <Spin spinning={loading} size="small" className={style.spin}>
                            <img src={`${process.env.REACT_APP_LOCALHOST}/${item.video_pic}`} onLoad={handleLoad} onClick={() => handleClick(item.id)} />
                        </Spin>
                        <span>
                            {item.video_name}
                            <Tag className={style.tag} color={item.video_price ? 'gold' : 'green'}>{item.video_price ? `¥${item.video_price}` : '免费'}</Tag>
                        </span>
                    </div>
                  )) : null
              }
          </div>
      </main>
  );
};

export default withRouter(MoreContent);
