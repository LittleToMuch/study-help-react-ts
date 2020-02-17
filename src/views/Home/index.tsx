import * as React from 'react';
import {Button} from "antd-mobile";
import { RouteComponentProps } from 'react-router-dom';
import Hoc from './HocHome'
import Axios from '../../utils/axios';

interface IHomeProps extends RouteComponentProps {}
class Home extends React.Component<IHomeProps> {
    public componentDidMount() {
        Axios.get('/api/users/token').then(res => {
            console.log(res.data); 
        })
    }
    render() {
        return (
            <div>
                我的
                <Button type="primary" size="small">测试</Button>
            </div>
        );
    }
}
export default Hoc<IHomeProps>(Home);