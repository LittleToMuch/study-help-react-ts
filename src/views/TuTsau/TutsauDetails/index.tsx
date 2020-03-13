import React, { useEffect, useState } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import Axios from 'axios'
import { TuTsauJson } from '../../../typings/api'
import { Card } from 'antd'
import style from './index.module.scss'
import Details from '../../../components/Details'

interface TutsauId {
    id: string
}

interface ITutsauDetailsProps extends RouteComponentProps<TutsauId> {
    
}

const TutsauDetails: React.FC<ITutsauDetailsProps> = (props) => {
    // const [data, setData] = useState<TuTsauJson[]>([])
    // useEffect(() => {
    //     const { id } = props.match.params
    //     console.log(typeof id);
        
    //     Axios.get('/api/tutsau/details', { params: { id } }).then(res => {
    //         const {data} = res.data
    //         console.log(data[0])
    //         setData(data[0])
    //     })
    // }, [props.match.params])
    return (
        <div>
            <Details url="/api/tutsau/details" headName="吐槽详情" {...props}/>
        </div>
    )
}

export default TutsauDetails
