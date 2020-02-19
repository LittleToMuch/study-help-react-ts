import React, { useEffect, useState, FunctionComponent } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import style from './index.module.scss'

interface IExperienceProps extends RouteComponentProps {
}

const Experience = (props: IExperienceProps) => {
    const [num, setNum] = useState<number>(1)

    useEffect(() => {
        
    },[])
    
    return (
        <div className={style.experience}>
            Experience({num})
        </div>
    );
}

export default Experience;