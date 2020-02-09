import * as React from 'react';
import style from './index.module.scss'
import { NavLink, RouteComponentProps } from 'react-router-dom';
import Axios from '../../utils/axios'
import ReactDOM from 'react-dom';
import { Toast } from 'antd-mobile';

export interface IRegisterProps extends RouteComponentProps {}

interface IRegisterState {
    isUserFocus: boolean
    isPasswordFocus: boolean
    isCaptcha: boolean
    isTelephone: boolean
    captcha: string
}

export default class Register extends React.Component<IRegisterProps, IRegisterState> {
    public state: Readonly<IRegisterState> = {
        isPasswordFocus: false,
        isUserFocus: false,
        isCaptcha: false,
        isTelephone: false,
        captcha: ''
    }

    public componentDidMount() {
        this.getCaptcha()
    }

    private getCaptcha = (): void => {
        Axios.get('/api/users/captcha').then(res => {
            this.setState({
                captcha: res.data
            })
        })
    }
    
    private usernameBlur = (): void => {
        let container: HTMLInputElement = ReactDOM.findDOMNode(this.refs['username']) as HTMLInputElement
        !container.value && this.setState({
            isUserFocus: !this.state.isUserFocus
        })
    }

    private passwordBlur = (): void => {
        let container: HTMLInputElement = ReactDOM.findDOMNode(this.refs['password']) as HTMLInputElement
        !container.value && this.setState({
            isPasswordFocus: !this.state.isPasswordFocus
        })
    }
    
    
    private captchaBlur = (): void => {
        let container: HTMLInputElement = ReactDOM.findDOMNode(this.refs['captcha']) as HTMLInputElement
        !container.value && this.setState({
            isCaptcha: !this.state.isCaptcha
        })
    }
    
    private telBlur = (): void => {
        let container: HTMLInputElement = ReactDOM.findDOMNode(this.refs['telephone']) as HTMLInputElement
        !container.value && this.setState({
            isTelephone: !this.state.isTelephone
        })
    }
    
    private usernameFoucs = ():void => this.setState({ isUserFocus: true })
    private passwordFocus = (): void => this.setState({ isPasswordFocus: true })
    private captchaFocus = (): void => this.setState({ isCaptcha: true })
    private telFocus = (): void => this.setState({ isTelephone: true })

    private failToast = (msg: string): void => Toast.fail(msg, 1, () => this.getCaptcha())

    private refreshCaptcha = (): void => this.getCaptcha()

    private submit = (): void => {
        const username: HTMLInputElement = ReactDOM.findDOMNode(this.refs['username']) as HTMLInputElement
        const password: HTMLInputElement = ReactDOM.findDOMNode(this.refs['password']) as HTMLInputElement
        const telephone: HTMLInputElement = ReactDOM.findDOMNode(this.refs['telephone']) as HTMLInputElement
        const captcha: HTMLInputElement = ReactDOM.findDOMNode(this.refs['captcha']) as HTMLInputElement
        const data = { username: username.value, password: password.value, telephone: telephone.value, captcha: captcha.value, createDate: new Date() }
        Axios.post('/api/users/register', data).then(res => {
            const { code } = res.data
            code === 401 && this.failToast('该手机号已注册')
            code === 402 && this.failToast('该用户名已注册')
            code === 405 && this.failToast('验证码输入错误')
            code === 404 && this.failToast('注册失败，请重试')
            code === 200 && Toast.info('注册成功！', 1, () => this.props.history.push('/login'))
        })
    }

    public render() {
        return (
            <div>
                <div className={style.loginForm}>
                    <h1>Register</h1>
                    <div className={style.txtb}>
                        <input type="text" ref="username" className={this.state.isUserFocus ? style.focus : ''} onFocus={this.usernameFoucs} onBlur={this.usernameBlur}/>
                        <span data-placeholder='Username'></span>
                    </div>
                    <div className={style.txtb}>
                        <input type="password" ref="password" className={this.state.isPasswordFocus ? style.focus : ''} onFocus={this.passwordFocus} onBlur={this.passwordBlur}/>
                        <span data-placeholder="Password"></span>
                    </div>
                    <div className={style.txtb}>
                        <input type="tel" ref="telephone" className={this.state.isTelephone ? style.focus : ''} onFocus={this.telFocus} onBlur={this.telBlur}/>
                        <span data-placeholder="telephone"></span>
                    </div>
                    <div className={style.txtc}>
                        <input type="text" ref="captcha" className={this.state.isCaptcha ? style.focusCaptcha : ''} onFocus={this.captchaFocus} onBlur={this.captchaBlur}/>
                        <span data-placeholder="Captcha"></span>
                        <p dangerouslySetInnerHTML={{ __html: this.state.captcha }} onClick={this.refreshCaptcha}/>
                    </div>
                    <input type="submit" className={style.logbtn} value='Register' disabled={!(this.state.isCaptcha || this.state.isPasswordFocus || this.state.isTelephone|| this.state.isUserFocus)} onClick={this.submit}/>
                    <div className={style.bottomText}>
                        <NavLink to="/login">⬅Come back</NavLink>
                    </div>
                </div>
            </div>
        )
    }
}
