import React, { useCallback, useEffect, useState, useRef } from 'react'
import Header from '../../../../components/Header'
import { WingBlank, SearchBar } from 'antd-mobile'
import store from '../../../../store'
import Axios from 'axios'
import { ContentListJson } from '../../../../utils/apiInterface'
import ItemList from '../../../../components/ItemList'
import { connect } from 'react-redux'
import { hideTabbar, showTabbar } from './actionCreater'

interface IMyTutsauProps {
    hideTabbar: () => ReturnType<typeof hideTabbar>
    showTabbar: () => ReturnType<typeof showTabbar>
}

const MyTutsau: React.FC<IMyTutsauProps> = (props) => {

    const [tutsauList, setTutsauList] = useState<ContentListJson[]>([])
    const [value, setValue] = useState<string>('')

    const timerId = useRef<NodeJS.Timeout | null>(null)

    const getList = useCallback(async () => {
        const { id } = store.getState().tokenReducer
        Axios.get('/api/tutsau/listByUser', {params: { userid: id }}).then(res => {
            const { code, data } = res.data
            code === 200 && setTutsauList(data)
        })
    }, [])

    useEffect(() => {
        props.hideTabbar()
        getList()
        return () => {
            props.showTabbar()
        }
    }, [getList, props])

    const update = useCallback(async (id: number) => {
        setTutsauList((tutsauList) => tutsauList.filter(item => item.id !== id))
    }, [])

    const handleChange = useCallback((value: string) => {
        timerId.current && clearTimeout(timerId.current)
        timerId.current = setTimeout(() => {
            setValue(value)
        }, 400)
    }, [])
    return (
        <div>
            <Header name="我的吐槽" path="/home"/>
            <WingBlank size="sm"><SearchBar placeholder="Search" maxLength={14} onChange={handleChange}/></WingBlank>
            {
                tutsauList.length ? tutsauList.map((item: ContentListJson) => (
                    item.title.includes(value) ? 
                    <ItemList key={item.id} {...item} hasDel={true} update={update} delApi="/api/tutsau/del" detailUrl="/tutsau/detail"/> : null
                )) : null
            }
        </div>
    )
}

const mapDispatchToProps = {
    hideTabbar,
    showTabbar
}

export default connect(null, mapDispatchToProps)(MyTutsau)
