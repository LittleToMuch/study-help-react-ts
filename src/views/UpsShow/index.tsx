import React, {Component, useEffect, useState} from 'react';
import Header from '../../components/Header';
import Swiper from '../../components/Swiper';
import Axios from 'axios';
import UpshowGrid from './UpshowGrid';
import style from './index.module.scss'
import Cards from './Cards';

interface IUpsShowProps {

}

const UpsShow = (props: IUpsShowProps) => {
    const [datalist, setDatalist] = useState([])
    useEffect(() => {
        (async () => {
            const res = await Axios.get('/api/index/slider')
            const { data } = res.data
            setDatalist(datalist => datalist = data)
        })()
        
    }, [])
    return (
        <div className={style.UpsShow}>
            <Header name="大咖秀" hasRight={false} />
            <Swiper datalist={datalist}/>
            <UpshowGrid />
            <div className={style.glory}>
                <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5562" width="200" height="200"><path d="M513.9 126.1c16 0 31.4 3.2 46.2 9.6 14.8 6.4 27.4 15.2 38 26.5 10.6 11.2 19.1 24.2 25.5 39 6.4 14.8 9.6 30.5 9.6 47.2 0 24.4-6.3 46.2-18.8 65.4-12.5 19.3-28.7 34-48.6 44.3-7.1 19.9-10.6 40.4-10.6 61.6 0 23.7 4.3 47.3 13 70.7 8.7 23.4 20.5 44.6 35.6 63.5 15.1 18.9 32.7 34.3 52.9 46.2 20.2 11.9 41.9 17.8 65 17.8 19.9 0 38.7-4.8 56.3-14.4 17.6-9.6 33.7-22 48.1-37.1 14.4-15.1 26.6-32.1 36.6-51 9.9-18.9 17.2-37.7 21.7-56.3-17.3-8.3-31.4-20.8-42.3-37.5-10.9-16.7-16.4-35.3-16.4-55.8 0-14.1 2.6-27.3 7.7-39.5s12.2-22.8 21.2-31.8 19.6-16.2 31.8-21.7 25-8.2 38.5-8.2 26.3 2.7 38.5 8.2c12.2 5.5 22.8 12.7 31.8 21.7s16 19.6 21.2 31.8c5.1 12.2 7.7 25.3 7.7 39.5 0 20.5-5.3 39-15.9 55.3-10.6 16.4-24.2 28.7-40.9 37.1-3.2 32.1-8 64.8-14.4 98.2-6.4 33.4-14.4 66.6-24.1 99.6-9.6 33-20.9 65-33.7 95.8-12.8 30.8-26.9 59-42.3 84.7-53.3 19.9-108.4 35.1-165.5 45.7-57.1 10.6-115.8 15.9-176.1 15.9s-118.9-5.3-175.6-15.9-112.1-25.8-166-45.7c-15.4-25.7-29.5-53.9-42.3-84.7-12.8-30.8-24.1-62.7-33.7-95.8-9.6-33-17.8-66.2-24.5-99.6-6.7-33.4-11.4-66.1-14-98.2-16.7-8.3-30-20.7-39.9-37.1C5 404.7 0 386.2 0 365.7c0-14.1 2.6-27.3 7.7-39.5s12-22.8 20.7-31.8 18.9-16.2 30.8-21.7c11.9-5.5 24.5-8.2 38-8.2s26.3 2.7 38.5 8.2c12.2 5.5 22.8 12.7 31.8 21.7s16 19.6 21.2 31.8c5.1 12.2 7.7 25.3 7.7 39.5 0 21.2-5.5 40.1-16.4 56.8-10.9 16.7-25 28.9-42.3 36.6 4.5 19.3 11.7 38.3 21.7 57.3 9.9 18.9 22.1 36.1 36.6 51.5 14.4 15.4 30.5 27.9 48.1 37.5 17.6 9.6 36.4 14.4 56.3 14.4 23.1 0 44.8-5.9 65-17.8 20.2-11.9 38-27.3 53.4-46.2 15.4-18.9 27.4-40.3 36.1-64 8.7-23.7 13-47.5 13-71.2 0-22.5-4.5-44.3-13.5-65.4-18-10.9-32.6-25.8-43.8-44.8-11.2-18.9-16.8-39.6-16.8-62.1 0-16.7 3.2-32.4 9.6-47.2 6.4-14.8 15.1-27.8 26-39s23.6-20 38-26.5c14.3-6.3 29.8-9.5 46.5-9.5z m0 0" fill="#EFC100" p-id="5563"></path></svg>
            </div>
            <Cards />
        </div>
    )
}

export default UpsShow;