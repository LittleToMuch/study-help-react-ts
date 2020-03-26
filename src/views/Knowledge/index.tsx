import React, { PureComponent } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import Header from "../../components/Header";
import Tab from "./Tab";
import Content from "./Content";
import style from './index.module.scss'
import Axios from 'axios';
import { VideoJson } from '../../utils/apiInterface';
import { connect } from 'react-redux';
import { Reducers } from '../../store/reducers';
import store from '../../store';

interface IKnowledgeProps extends RouteComponentProps{
    itemKey: boolean
}

interface IKnowledgeState {
    tabname: string
    category: string[],
    datalist: VideoJson[]
    renderlist: VideoJson[]
}

class Knowledge extends PureComponent<IKnowledgeProps, IKnowledgeState> {
    public state = {
        tabname: '推荐/免费',
        category: [],
        datalist: [],
        renderlist: []
    }

    public async componentDidMount() {
        await this.getList()
        
        this.setState({
            renderlist: this.state.datalist.filter((item: VideoJson) => item.video_price === 0),
            tabname: '推荐/免费'
        }, () => {
            const category = this.state.renderlist.map((item: VideoJson) => item.category)
            // @ts-ignore
            const flattenCategory = [...new Set(category)]
            this.setState({ category: flattenCategory })
        })
    }

    public componentWillReceiveProps() {
        console.log(this.props.itemKey)
        if (!this.props.itemKey) {
            this.setState({
                renderlist: this.state.datalist.filter((item: VideoJson) => item.video_price > 0),
                tabname: '精品/付费'
            }, () => {
                const category = this.state.renderlist.map((item: VideoJson) => item.category)
                // @ts-ignore
                const flattenCategory = [...new Set(category)]
                console.log(flattenCategory)
                this.setState({ category: flattenCategory })
            })
        } else {
            this.setState({
                renderlist: this.state.datalist.filter((item: VideoJson) => item.video_price === 0),
                tabname: '推荐/免费'
            }, () => {
                const category = this.state.renderlist.map((item: VideoJson) => item.category)
                // @ts-ignore
                const flattenCategory = [...new Set(category)]
                this.setState({ category: flattenCategory })
            })
        }
    }

    getList = async () => {
        const res = await Axios.get('/api/video/list')
        const { data } = res.data
        console.log(data)
        this.setState({ datalist: data })
    }

    
    render() {
        const { category, renderlist, datalist } = this.state
        console.log(renderlist)

        return (
            <div>
                <Header name="知识汇" hasCategory={true}/>
                <Tab name={this.state.tabname}/>
                <div className={style.content}>
                    {
                        // @ts-ignore
                        
                        category.length ? renderlist.length ?  category.map((item, index) => <Content key={item} title={item} datalist={renderlist.filter((val: VideoJson) => val.category === item)}/>) : null : null
                    }
                </div>
                
            </div>
        );
    }
}

const mapStateToProps = (state: Reducers) => {
    return {
        itemKey: state.isPay
    }
}

export default connect(mapStateToProps, null)(Knowledge);