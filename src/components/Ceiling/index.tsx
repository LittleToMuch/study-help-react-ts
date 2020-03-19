import React, { ComponentType, FunctionComponent, useEffect, useState, useRef, Component } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import style from './index.module.scss'

export default <T extends RouteComponentProps>(WrappedComponent: ComponentType<T>) => {
    return (props: T) => {
        const [isFixed, setIsFixed] = useState<boolean>(false)
        const top = useRef<any>()
        useEffect(() => {
            window.onscroll = () => {
                if(document.documentElement.scrollTop >= 208 || document.body.scrollTop >= 208) {
                    setIsFixed(true)
                } else {
                    setIsFixed(false)
                }
            }
            return () => { window.onscroll = null }
        },[])
        return (
            <div ref={top} className={isFixed ? style.isFixed : ''}>
               <WrappedComponent {...props}/> 
            </div>
        )
    }
}
