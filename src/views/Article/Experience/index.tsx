import React, { useEffect, useState, FunctionComponent, useCallback } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import style from './index.module.scss'
import Axios from 'axios';
import { ArticleJson } from '../../../typings/api';
import ItemList from '../../../components/ItemList';

interface IExperienceProps extends RouteComponentProps {
}

const Experience = (props: IExperienceProps) => {
    const [num, setNum] = useState<number>(1)
    const [renderList, setRenderList] = useState<ArticleJson[]>([])

    useEffect(() => {
        getRenderList()
    },[])

    const getRenderList = useCallback(async () => {
        const res = await Axios.get('/api/experience/list')
        const { data } = res.data
        setRenderList(data)
    }, [])

    return (
        <div className={style.experience}>
            {
                renderList.length ? renderList.map((item: ArticleJson, index: number) => (
                    <ItemList key={item.id} {...item} detailUrl="/experience/detail"/>
                )) : null
            }
        </div>
    );
}

export default Experience;