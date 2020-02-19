import React, { Component, ComponentType, ComponentClass } from 'react'
import Axios from '../../../utils/axios'
import Login from '../../Login'
import { Redirect, RouteComponentProps } from 'react-router-dom'

interface IHocHomeState {
    code: number
}
export default function HocHome<T extends RouteComponentProps>(WrapComponent: ComponentType<T>): ComponentClass<T> {
    return class extends Component<T, IHocHomeState> {
        state = {
            code: 0
        }
        public componentDidMount() {
            Axios.get('/api/users/token').then(res => {
                console.log(res.data);
                
                this.setState({ code: res.data.code })
            })
        }
        public render() {
            console.log('hyh');
            
            return (
                <WrapComponent {...this.props} code={this.state.code}/>
            )
        }
    }
}
