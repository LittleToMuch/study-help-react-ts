import React, {Component} from 'react';
import { LearningStrategyJson } from '../../../utils/apiInterface'
import ItemList from '../../../components/ItemList';
import { ArticleJson } from '../../../typings/api';
import Axios from 'axios';

export interface ILearningStrategyProps {}
export interface ILearningStrategyState {
    renderList: ArticleJson[]
}

class LearningStrategy extends Component<ILearningStrategyProps, ILearningStrategyState> {

    public state = {
        renderList: []
    }

    public componentDidMount () {
        this.getRenderList()
    }

    getRenderList = async () => {
        const res = await Axios.get('/api/learning/list')
        const { data } = res.data
        this.setState({
            renderList: data
        })
    }

    render() {
        const {renderList} = this.state
        return (
            <div>
                {
                    renderList.length ? renderList.map((item: ArticleJson, index: number) => (
                        <ItemList key={item.id} {...item}  detailUrl="/learning/detail"/>
                    )) : null
                }
            </div>
        );
    }
}


export default LearningStrategy;