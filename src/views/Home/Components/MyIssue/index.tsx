import React, { useRef, useCallback, useState, useEffect } from 'react'
import Hoc from '../Hoc'
import { hideTabbar, showTabbar } from './actionCreater'
import { RouteComponentProps } from 'react-router-dom'
import { connect } from 'react-redux'
import Header from '../../../../components/Header'
import { WingBlank, SearchBar } from 'antd-mobile'
import Axios from 'axios'
import { ContentListJson } from '../../../../utils/apiInterface'
import ItemList from '../../../../components/ItemList'

interface IMyIssueProps extends RouteComponentProps {
    hideTabbar: () => ReturnType<typeof hideTabbar>
    showTabbar: () => ReturnType<typeof showTabbar>
}

const MyIssue: React.FC<IMyIssueProps> = (props) => {
    const timerId = useRef<NodeJS.Timeout | null>(null)

    const [value, setValue] = useState<string>('')
    const [datalist, setDatalist] = useState<ContentListJson[]>([])


    useEffect(() => {
        getList()
    }, [])

    const getList = useCallback(() => {
        const first = Axios.get('/api/experience/list')
        const seconed = Axios.get('/api/learning/list')
        Axios.all([first, seconed]).then(res => {
            let data = res.map(item => {
                return item.data.data ? item.data.data : []
            })
            const result = data.reduce((prev,next) => {
                return prev.concat(next)
            }, [])
            result.sort((a: ContentListJson, b: ContentListJson) => new Date(b.createDate).getTime() - new Date(a.createDate).getTime())
            console.log(result)
            setDatalist(result)
        })
    }, [])

    const update = useCallback(async (id: number) => {
        getList()
    }, [getList])

    const handleChange = useCallback((value: string) => {
        timerId.current && clearTimeout(timerId.current)
        timerId.current = setTimeout(() => {
            setValue(value)
        }, 400)
    }, [])
    
    return (
        <div>
            <Header name="我的发布" hasRight="/articleModal" path={-1}/>
            <WingBlank size="sm"><SearchBar placeholder="Search" maxLength={14} onChange={handleChange}/></WingBlank>
            {
                datalist.length ? datalist.map((item: ContentListJson, index: number) => (
                    item.title.includes(value) ? 
                    <ItemList key={index} {...item} hasDel={true} update={update} delApi={item.category === '经验' ? "/api/experience/del" : '/api/learning/del'} detailUrl={item.category === '经验' ? "/experience/detail" : "/learning/detail"}/> : null
                )) : null
            }
        </div>
    )
}

const mapDispatchToProps = {
    hideTabbar,
    showTabbar
}

export default connect(null, mapDispatchToProps)(Hoc(MyIssue))
