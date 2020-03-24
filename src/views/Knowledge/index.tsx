import React, { PureComponent } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import Header from "../../components/Header";
import Tab from "./Tab";
import Content from "./Content";
import style from './index.module.scss'
import Axios from 'axios';
import { VideoJson } from '../../utils/apiInterface';

interface IKnowledgeProps extends RouteComponentProps{}

interface IKnowledgeState {
    tabname: string
    category: string[],
    datalist: VideoJson[]
}

class Knowledge extends PureComponent<IKnowledgeProps, IKnowledgeState> {
    public state = {
        tabname: '推荐/免费',
        category: [],
        datalist: []
    }

    public async componentDidMount() {
        this.getList()
    }

    getList = async () => {
        const res = await Axios.get('/api/video/list')
        const { data } = res.data
        // console.log(data)
        const category = data.map((item: VideoJson) => item.category)
        // @ts-ignore
        const flattenCategory = [...new Set(category)]
        this.setState({ datalist: data, category: flattenCategory })
    }

    
    render() {
        const { category, datalist } = this.state
        return (
            <div>
                <Header name="知识汇" hasCategory={true}/>
                <Tab name={this.state.tabname}/>
                <div className={style.content}>
                    {
                        // @ts-ignore
                        category.length ? category.map((item, index) => <Content key={item} title={item} datalist={datalist.filter((val: VideoJson) => val.category === item)}/>) : null
                    }
                </div>
                
            </div>
        );
    }
}

export default Knowledge;