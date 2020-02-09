import React, { useState, useEffect } from 'react';
import style from './index.module.scss'
import ArticleHeader from '../../components/ArticleHeader'
import Swiper from '../../components/Swiper'

export interface IArticleProps {
    children?: React.ReactNode
}

function Article(props: IArticleProps) {
    console.log(props)
    return (
        <div className={style.article}>
            <Swiper/>
            <ArticleHeader/>
            {props.children}
        </div>
    )
}

export default Article