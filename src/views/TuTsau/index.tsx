import React, {Component, useCallback, useState} from 'react';
import Header from '../../components/Header';
import { WingBlank, SearchBar } from 'antd-mobile';
import Tab from './Tabs';
import InputModal from './InputModal';

interface ITuTsauProps {

}

const TuTsau = (props: ITuTsauProps) => {
    const [showModal, setShowModal] = useState<boolean>(false)

    const showModel = useCallback(() => {
        setShowModal(true)
    }, [])

    const handleChange = useCallback((value: string) => {
        
    }, [])
    
    return (
        <div>
            <Header name="吐槽中心" hasRight={true} showModal={showModel}/>
            <WingBlank size="sm"><SearchBar placeholder="Search" maxLength={8} onChange={handleChange}/></WingBlank>
            <Tab />
        </div>
    )
}

export default TuTsau;