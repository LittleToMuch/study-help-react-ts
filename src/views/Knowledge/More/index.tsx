import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { useEffect, useCallback } from 'react';
import Axios from 'axios';
import { VideoJson } from '../../../utils/apiInterface';
import Header from '../../../components/Header';
import Tab from '../Tab';
import MoreContent from './Content';

interface ParamId {
    id: string
} 

interface IMoreProps extends RouteComponentProps<ParamId> {

}

const More: React.FC<IMoreProps> = (props) => {
    const [renderlist, setRenderlist] = React.useState<VideoJson[]>([])
    
    useEffect(() => {
        getList()        
    }, [props.match.params])

    const getList = useCallback(async () => {
        const category = decodeURIComponent(props.match.params.id)
        const res = await Axios.get('/api/video/list/category', {params: {category}})
        const { data } = res.data
        setRenderlist(data)
    }, [props.match.params])
    return (
        <div>
            <Header name="更多视频..." path={-1}/>
            <Tab name={decodeURIComponent(props.match.params.id)}/>
            <MoreContent renderlist={renderlist} />
        </div>
    );
};

export default withRouter(More);
