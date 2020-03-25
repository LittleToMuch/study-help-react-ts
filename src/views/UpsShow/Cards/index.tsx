import React, { useEffect, useState } from 'react'
import style from './index.module.scss'
import Axios from 'axios'
import { Data } from '../../../typings/api'
import { GetArrayMost, flatten } from '../../../utils/utils'

interface ICardsProps {
    
}

function Cards(props: ICardsProps) {
    const [info, setInfo] = useState<any[]>([])
    const [nums, setNums] = useState<number[]>([])
    useEffect(() => {
        Axios.get('/api/upshow/ranking').then(res => {
            res.data.sort((a: Data, b: Data) => a.experienceid - b.experienceid)
            let result1 = res.data.map((item: Data) => item.experienceid)
            console.log(result1)
            let key1 = GetArrayMost(result1)[0]
            let result2 = result1.filter((item: number) => item !== key1)
            let key2 = GetArrayMost(result2)[0]
            let result3 = result2.filter((item: number) => item !== key2)
            let key3 = GetArrayMost(result3)[0]
            setNums([GetArrayMost(result1)[1], GetArrayMost(result2)[1], GetArrayMost(result3)[1]])
            let first = Axios.get('/api/upshow/findUser', {params: {id: key1}})
            let second = Axios.get('/api/upshow/findUser', {params: {id: key2}})
            let third = Axios.get('/api/upshow/findUser', {params: {id: key3}})
            return Promise.all([first, second, third])
        }).then(res => {
            let result = flatten(res.map((item: any) => item.data))
            setInfo(result)
        })
    }, [])
    console.log(info);
    
    return (
        <ul className={style.root}>
            {
                info.length ? info.map((item, index) => (
                   <li key={index}>
                        <div className={style.pic}><img src={`${process.env.REACT_APP_LOCALHOST}/${item.avatar}`} alt=""/></div>
                        <div>
                            姓名:<span>{item.username}</span>
                        </div>
                        <div>
                            点赞数:<span>{nums[index]}</span>
                        </div>
                    </li> 
                )) : null
            }
        </ul>
    )
}

export default Cards
