import React, { Component } from 'react'
import style from './index.module.scss'
import { NavLink, RouteComponentProps } from 'react-router-dom'
import Axios from '../../utils/axios'
import ReactDOM from 'react-dom'
import { Toast } from 'antd-mobile'

interface ILoginProps extends RouteComponentProps {
    
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

export default class Login extends Component<ILoginProps, ILoginState> {
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

    private usernameBlur = (): void => {
        let container: HTMLInputElement = ReactDOM.findDOMNode(this.refs['username']) as HTMLInputElement
        this.setState({ username: container.value })
        !container.value && this.setState({
            isUserFocus: !this.state.isUserFocus
        })
    }
    
    private passwordBlur = (): void => {
        let container: HTMLInputElement = ReactDOM.findDOMNode(this.refs['password']) as HTMLInputElement
        this.setState({ password: container.value })
        !container.value && this.setState({
            isPasswordFocus: !this.state.isPasswordFocus
        })
    }
    
    private captchaBlur = (): void => {
        let container: HTMLInputElement = ReactDOM.findDOMNode(this.refs['captcha']) as HTMLInputElement
        this.setState({ captcha: container.value })
        !container.value && this.setState({
            isCaptcha: !this.state.isCaptcha
        })
    }

    private usernameFoucs = (): void => this.setState({ isUserFocus: true })
    private passwordFocus = (): void => this.setState({ isPasswordFocus: true })
    private captchaFocus = (): void => this.setState({ isCaptcha: true })

    private failToast = (msg: string): void => Toast.fail(msg, 1, () => this.getCaptcha());

    private successToast = (msg: string): void => Toast.success(msg, 1, () => this.props.history.push('/'));

    private refreshCaptcha = (): void => this.getCaptcha()

    private submit = (): void => {
        const { username, password, captcha } = this.state
        const data = { username, password, captcha }
        Axios.post('/api/users/login', data).then(res => {
            const { code } = res.data
            code === 400 && this.failToast('验证码输入错误')
            code === 401 && this.failToast('账号或密码输入错误')
            code === 200 && this.successToast('登陆成功')
        })
    }

    public render() {
        return (
            <div>
                <div className={style.loginForm}>
                    <h1>Login</h1>
                    <div className={style.txtb}>
                        <input type="text" ref="username" className={this.state.isUserFocus ? style.focus : ''} onFocus={this.usernameFoucs} onBlur={this.usernameBlur}/>
                        <span data-placeholder='Username'></span>
                    </div>
                    <div className={style.txtb}>
                        <input type="password" ref="password" className={this.state.isPasswordFocus ? style.focus : ''} onFocus={this.passwordFocus} onBlur={this.passwordBlur}/>
                        <span data-placeholder="Password"></span>
                    </div>
                    <div className={style.txtc}>
                        <input type="text" ref="captcha" className={this.state.isCaptcha ? style.focusCaptcha : ''} onFocus={this.captchaFocus} onBlur={this.captchaBlur}/>
                        <span data-placeholder="Captcha"></span>
                        <p dangerouslySetInnerHTML={{ __html: this.state.captchaSvg }} onClick={this.refreshCaptcha}/>
                    </div>
                    <input type="submit" className={style.logbtn} value='Login' onClick={this.submit}/>
                    <div className={style.bottomText}>
                        Don't have account?  <NavLink to="/register">Sign up</NavLink>
                    </div>
                </div>
            </div>
        )
    }
}
