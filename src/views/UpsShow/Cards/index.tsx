import React from 'react'
import style from './index.module.scss'

interface ICardsProps {
    
}

function Cards(props: ICardsProps) {
    return (
        <ul className={style.root}>
            <li>
                <div className={style.pic}><img src="" alt=""/></div>
                <div>
                    姓名:<span>Golang</span>
                </div>
                <div>
                    点赞数:<span>18</span>
                </div>
            </li>
            <li>
                <div><img src="" alt=""/></div>
                <div>
                    姓名:<span>Golang</span>
                </div>
                <div>
                    点赞数:<span>18</span>
                </div>
            </li>
            <li>
                <div><img src="" alt=""/></div>
                <div>
                    姓名:<span>Golang</span>
                </div>
                <div>
                    点赞数:<span>18</span>
                </div>
            </li>
        </ul>
    )
}

export default Cards
