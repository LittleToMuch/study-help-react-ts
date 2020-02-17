import React, { Component } from 'react'
import style from './index.module.scss'
import { NavLink, RouteComponentProps } from 'react-router-dom'
import Axios from '../../utils/axios'
import { setToken } from '../../utils/utils'
import { Toast } from 'antd-mobile'
import Input from '../../components/Input'
import { StoreToken } from '../../store/state'
import { updateToken } from './actionCreater'
import { connect } from 'react-redux'
import { Reducers } from '../../store/reducers'

interface ILoginProps extends RouteComponentProps {
    updateToken: (params: StoreToken) => void
    id?: number
    username?: string
    role?: number
    createDate?: string
    telephone?: string
}
interface ILoginState {
    isUserFocus: boolean
    isPasswordFocus: boolean
    isCaptcha: boolean
    username: string
    password: string
    captcha: string
    captchaSvg: string
}

class Login extends Component<ILoginProps, ILoginState> {
    public state: Readonly<ILoginState> = {
        isPasswordFocus: false,
        isUserFocus: false,
        isCaptcha: false,
        username: '',
        password: '',
        captcha: '',
        captchaSvg: ''
    }

    public componentDidMount() {
        this.getCaptcha()
    }
    

    private getCaptcha = (): void => {
        Axios.get('/api/users/captcha').then(res => {
            this.setState({
                captchaSvg: res.data
            })
        })
    }

    private failToast = (msg: string): void => Toast.fail(msg, 1, () => this.getCaptcha());

    private successToast = (msg: string): void => Toast.success(msg, 1, () => this.props.history.push('/article'));

    private refreshCaptcha = (): void => this.getCaptcha()

    private username = (value: string) => this.setState({ username: value})
    private password = (value: string) => this.setState({ password: value })
    private captcha = (value: string) => this.setState({ captcha: value })

    private submit = (): void => {
        const { username, password, captcha } = this.state
        const data = { username, password, captcha }
        Axios.post('/api/users/login', data).then(res => {
            const { code, token, userInfo } = res.data
            code === 400 && this.failToast('验证码输入错误')
            code === 401 && this.failToast('账号或密码输入错误')
            if (code === 200) {
                setToken(token)
                const userInfoJson: string = JSON.stringify(userInfo)
                localStorage.setItem("userInfo", userInfoJson)
                this.props.updateToken(userInfo)
                this.successToast('登陆成功')
            }
        })
    }

    public render() {
        return (
            <div>
                <div className={style.loginForm}>
                    <h1>Login</h1>
                    <Input type="username" placeholder="Username" value={this.username}/>
                    <Input type="password" placeholder="Password" value={this.password}/>
                    <Input type="captcha" placeholder="Captcha" captchaSvg={this.state.captchaSvg} refresh={this.refreshCaptcha} value={this.captcha}/>
                    <input type="submit" className={style.logbtn} value='Login' onClick={this.submit}/>
                    <div className={style.bottomText}>
                        Don't have account?  <NavLink to="/register">Sign up</NavLink>
                    </div>
                </div>
            </div>
        )
    }
}

export const mapStateToProps = (state: Reducers) => {
    return {
        username: state.tokenReducer.username
    }
}

export const mapDispatchToProps = {
    updateToken
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)