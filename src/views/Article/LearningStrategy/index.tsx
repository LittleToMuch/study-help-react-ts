import React, {Component} from 'react';
import { LearningStrategyJson } from '../../../utils/apiInterface'
import ItemList from '../../../components/ItemList';

export interface ILearningStrategyProps {}
export interface ILearningStrategyState {
    datalist: LearningStrategyJson[]
}

class LearningStrategy extends Component<ILearningStrategyProps, ILearningStrategyState> {

    public state = {
        datalist: [
            {
                id: 1,
                title: "测试标题",
                content: "测试内容",
                createTime: "2020/2/9",
                category: "水谷",
                pic: "213a.jpg"
            },
            {
                id: 2,
                title: "测试标题",
                content: "测试内容",
                createTime: "2020/2/9",
                category: "水谷",
                pic: "213a.jpg"
            }
        ]
    }

    render() {
        const { datalist } = this.state
        return (
            <div>
                {
                    datalist.map(item => <ItemList key={item.id} { ...item }/>)
                }
            </div>
        );
    }
}


export default LearningStrategy;