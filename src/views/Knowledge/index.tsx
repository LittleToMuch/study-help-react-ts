import React, {Component} from 'react';
import { RouteComponentProps } from 'react-router-dom';
import Header from "../../components/Header";
import Tab from "./Tab";
import Content from "./Content";

interface IKnowledgeProps extends RouteComponentProps{}

interface IKnowledgeState {
    tabname: string
}

class Knowledge extends Component<IKnowledgeProps, IKnowledgeState> {
    public state = {
        tabname: '推荐/免费'
    }
    render() {
        return (
            <div>
                <Header name="知识汇" hasCategory={true}/>
                <Tab name={this.state.tabname}/>
                <Content title="计算机网络"/>
                <Content title="软件工程"/>
                <Content title="数据结构"/>
            </div>
        );
    }
}

export default Knowledge;