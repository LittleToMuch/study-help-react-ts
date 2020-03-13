import React, { useEffect } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import Header from '../../../components/Header'
import { connect } from 'react-redux'
import { hideTabbar, showTabbar } from './actionCreater'
interface UpshowListProps extends RouteComponentProps {
    hideTabbar: () => ReturnType<typeof hideTabbar>
    showTabbar: () => ReturnType<typeof showTabbar>
}

const UpshowList: React.FC<UpshowListProps> = (props) => {
    console.log(props.match.params)
    useEffect(() => {
        props.hideTabbar()
        return () => {
            props.showTabbar()
        }
    }, [props])
    return (
        <div>
            <Header name="大咖列表" path="/upshow"/>
            
        </div>
    )
}

const mapDispatchToProps = {
    hideTabbar,
    showTabbar
}

export default connect(null, mapDispatchToProps)(UpshowList)
