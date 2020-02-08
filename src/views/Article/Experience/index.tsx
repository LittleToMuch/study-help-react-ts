import React, { useEffect, useState, FunctionComponent } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Button } from 'antd-mobile';
import Axios from '../../../utils/axios'
import style from './index.module.scss'

interface IExperienceProps extends RouteComponentProps {
}

const Experience = (props: IExperienceProps) => {
    const [num, setNum] = useState<number>(1)
    const [data, setData] = useState<string>('hyh')

    useEffect(() => {
        (async function() {
            Axios({
                url: 'http://www.mei.com/appapi/search/searchFind/v3',
                method: 'get'
            }).then(res => {
                console.log(res.data);
            })
        })()
    },[])

    const handleClick = () => {
        setNum(num => num + 1)
    }
    console.log(props);
    
    return (
        <div className={style.experience}>
            Experience({num})
            <p className={style.box}></p>
            <Button className={style.button} type="primary" size="small" onClick={handleClick}>点我({num})</Button>
        </div>
    );
}

export default Experience;