import React, {Component, useCallback, useState, useRef} from 'react';
import Header from '../../components/Header';
import { WingBlank, SearchBar } from 'antd-mobile';
import Tab from './Tabs';
import { connect } from 'react-redux'
import { tutsauSearch } from './actionCreater'
import { TutsauSearch } from '../../store/state';
import { debounce } from '../../utils/utils';

interface ITuTsauProps {
    tutsauSearch: (value: TutsauSearch) => ReturnType<typeof tutsauSearch>
}

const TuTsau = (props: ITuTsauProps) => {
    const [showModal, setShowModal] = useState<boolean>(false)
    let timerId = useRef<NodeJS.Timeout | null>(null)

    const showModel = useCallback(() => {
        setShowModal(true)
    }, [])

    const handleChange = useCallback((value: TutsauSearch) => { 
        timerId.current && clearTimeout(timerId.current)
        timerId.current = setTimeout(() => {
            props.tutsauSearch(value)
        }, 400)
    }, [props])
    
    return (
        <div>
            <Header name="吐槽中心" hasRight="/TuTsauModal"/>
            <WingBlank size="sm"><SearchBar placeholder="Search" maxLength={14} onChange={handleChange}/></WingBlank>
            <Tab value=""/>
        </div>
    )
}

const mapDispatchToProps = {
    tutsauSearch
}

export default connect(null, mapDispatchToProps)(TuTsau);