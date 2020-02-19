import * as React from 'react';
import {Button} from "antd-mobile";
import { RouteComponentProps } from 'react-router-dom';
import Hoc from './HocHome'
import Axios from '../../utils/axios';
import Header from '../../components/Header';
import AvatarBox from './AvatarBox'
import store from "../../store";

interface IHomeProps extends RouteComponentProps {
    code: number
}

interface IHomeState {
    username: string
    avatar: string
}
class Home extends React.Component<IHomeProps, IHomeState> {
    public state = {
        username: '',
        avatar: ''
    }
    public componentDidMount() {
        const { username, avatar } = store.getState().tokenReducer
        this.setState({ username, avatar })
        Axios.get('/api/users/token').then(res => {
            console.log(res.data); 
        })
    }
    public componentWillReceiveProps(nextProps: IHomeProps) {
        nextProps.code !== 200 && this.props.history.push(`/login`)
    }
    render() {
        return (
            <div>
                <Header name="我的" hasRight={false}/>
                <AvatarBox { ...this.state }/>
                <Button type="primary" size="small">测试</Button>
            </div>
        );
    }
}
export default Hoc<IHomeProps>(Home);