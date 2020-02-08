import * as React from 'react';
import {Button} from "antd-mobile";
import { RouteComponentProps } from 'react-router-dom';

interface IHomeProps extends RouteComponentProps {}
class Home extends React.Component<IHomeProps> {
    render() {
        return (
            <div>
                我的
                <Button type="primary" size="small">测试</Button>
            </div>
        );
    }
}

export default Home;