import React, {useCallback, useEffect, useRef, useState} from 'react'
import Header from '../../../../components/Header'
import Hoc from '../Hoc'
import { hideTabbar, showTabbar, tutsauSearch } from './actionCreater'
import { RouteComponentProps } from 'react-router-dom'
import { connect } from 'react-redux'
import {SearchBar, WingBlank} from "antd-mobile";
import {TutsauSearch} from "../../../../store/state";
import Axios from "axios";
import store from "../../../../store";
import {flatten} from "../../../../utils/utils";
import {LikeList} from "../../../../typings/api";
import ItemList from "../../../../components/ItemList";

interface IMyQuestionProps extends RouteComponentProps {
    tutsauSearch: (value: TutsauSearch) => ReturnType<typeof tutsauSearch>
    hideTabbar: () => ReturnType<typeof hideTabbar>
    showTabbar: () => ReturnType<typeof showTabbar>
}

const MyQuestion: React.FC<IMyQuestionProps> = (props) => {
    let timerId = useRef<NodeJS.Timeout | null>(null)
    const [renderList, setRenderList] = useState<LikeList[]>([])

    useEffect(() => {
        const expList = Axios.get('/api/experience/likeList', {params: {userid: store.getState().tokenReducer.id}})
        const learningList = Axios.get('/api/learning/likeList', {params: {userid: store.getState().tokenReducer.id}})
        Axios.all([expList, learningList]).then(res => {
            const data = res.map(item => item.data.data)
            const result = flatten(data)
            setRenderList(result)
        })
    }, [])
    console.log(renderList)
    const handleChange = useCallback((value: TutsauSearch) => {
        timerId.current && clearTimeout(timerId.current)
        timerId.current = setTimeout(() => {
            props.tutsauSearch(value)
        }, 400)
    }, [props])
    return (
        <div>
            <Header name="我赞过的" path={-1}/>
            <WingBlank size="sm"><SearchBar placeholder="Search" maxLength={14} onChange={handleChange}/></WingBlank>
            {
                renderList.length ? renderList.map((item: LikeList, index: number) => (
                    <ItemList key={index} {...item} detailUrl={item.experienceid ? '/experience/detail' : '/learning/detail'}/>
                )) : null
            }
        </div>
    )
}

const mapDispatchToProps = {
    hideTabbar,
    showTabbar,
    tutsauSearch
}

export default connect(null, mapDispatchToProps)(Hoc<IMyQuestionProps>(MyQuestion))
