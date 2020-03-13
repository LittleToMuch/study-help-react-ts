import React, { useEffect, ComponentType, ComponentClass } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { hideTabbar, showTabbar } from './actionCreater'
import { connect } from 'react-redux'

interface IHocProps extends RouteComponentProps {
    hideTabbar: () => ReturnType<typeof hideTabbar>
    showTabbar: () => ReturnType<typeof showTabbar>
}
interface IHocState {

}

const Hoc = <T extends IHocProps>(Component: ComponentType<T>): React.ComponentClass<T> => {
    return class extends React.Component<T, IHocState> {
        public componentDidMount () {
            this.props.hideTabbar()
        }
        public componentWillUnmount () {
            this.props.showTabbar()
        }
        public render () {
            return <Component {...this.props}/>
        }
    }
}

export default Hoc
