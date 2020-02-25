import * as React from 'react';
import {Button} from "antd-mobile";
import { RouteComponentProps } from 'react-router-dom';
import Hoc from './HocHome'
import Axios from '../../utils/axios';
import Header from '../../components/Header';
import AvatarBox from './AvatarBox'
import store from "../../store";
import NavItem from './NavItem';

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
        const { username, avatar, telephone } = store.getState().tokenReducer
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
                <NavItem title="我的收藏" path="/png/收藏.png" src="/myCollection"/>
                <NavItem title="我的提问" path="/png/提问.png" src="/myQuestion"/>
                <NavItem title="我的解答" path="/png/解答.png" src="/myAnswer"/>
                <NavItem title="我的发布" path="/png/发布.png" src="/myIssue"/>
                <NavItem title="我的吐槽" path="/png/吐槽.png" src="/myTutsau"/>
                <NavItem title="已购买视频" path="/png/已购买.png" src="/hasBuy"/>
                <Button type="primary" size="small">测试</Button>
            </div>
        );
    }
}
export default Hoc<IHomeProps>(Home);