import React, { useEffect } from 'react'
import Header from '../../../../components/Header'
import Hoc from '../Hoc'
import { hideTabbar, showTabbar } from './actionCreater'
import { RouteComponentProps } from 'react-router-dom'
import { connect } from 'react-redux'

interface IMyQuestionProps extends RouteComponentProps {
    hideTabbar: () => ReturnType<typeof hideTabbar>
    showTabbar: () => ReturnType<typeof showTabbar>
}

const MyQuestion: React.FC<IMyQuestionProps> = (props) => {
    return (
        <div>
            <Header name="我的提问" path={-1}/>
        </div>
    )
}

const mapDispatchToProps = {
    hideTabbar,
    showTabbar
}

export default connect(null, mapDispatchToProps)(Hoc<IMyQuestionProps>(MyQuestion))
