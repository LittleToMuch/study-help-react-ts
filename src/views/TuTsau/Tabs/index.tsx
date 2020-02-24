import React, { useState, useEffect, useCallback } from 'react'
import { Tabs, WhiteSpace, Badge } from 'antd-mobile';
import store from '../../../store';
import { TutsauCategory } from '../../../store/state'
import { ContentList } from './apiTypes'
import Axios from 'axios';
import ItemList from '../../../components/ItemList';

interface ITabProps {
    
}
interface ITabs {
    title: string
    sub?: string
}
  
const tabList = [
    {title: 'React'},
    {title: 'Golang'},
    {title: 'Java'},
    {title: 'Swift'},
    {title: 'Python'},
    {title: 'Rust'},
    {title: 'PHP'},
    {title: 'Ruby'}
];

const Tab: React.FC<ITabProps> = () => {
    const [tabs, setTabs] = useState<ITabs[]>(tabList)
    const [contents, setContents] = useState<ContentList[]>([])

    useEffect(() => {
        Axios.get('/api/tutsau/list').then(res => {
            const { data } = res.data
            setContents(data)
        })
    }, [])

    const handleChange = useCallback(async (tab, index) => {
    }, [])

    return (
        <div>
            <div>
                <Tabs tabs={ tabs }
                initialPage={ 0 } 
                tabBarBackgroundColor="#f5f5f9"
                onChange={ handleChange }
                >
                {
                    tabs.map((item: ITabs, index: number) => (
                        <div key={index} style={{backgroundColor: '#fff'}}>
                            {
                                contents.filter((content: ContentList) => {
                                    return content.category === item.title.toLocaleLowerCase()
                                }).map((item: ContentList) => (
                                    <ItemList key={item.id} {...item}/>
                                ))
                            }
                        </div>
                    ))
                }
                </Tabs>
                <WhiteSpace />
            </div>
        </div>
    )
}

export default Tab
