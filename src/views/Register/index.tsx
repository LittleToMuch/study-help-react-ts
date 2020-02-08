import * as React from 'react';
import style from './index.module.scss'
import { NavLink } from 'react-router-dom';
import Axios from '../../utils/axios'
import ReactDOM from 'react-dom';
import { Toast } from 'antd-mobile';

export interface IRegisterProps {}

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

    private usernameFoucs = ():void => {
        this.setState({
            isUserFocus: true
        })
    }

    private usernameBlur = (): void => {
        let container: HTMLInputElement = ReactDOM.findDOMNode(this.refs['username']) as HTMLInputElement
        !container.value && this.setState({
            isUserFocus: !this.state.isUserFocus
        })
    }

    private passwordFocus = (): void => {
        this.setState({
            isPasswordFocus: true
        })
    }

    private passwordBlur = (): void => {
        let container: HTMLInputElement = ReactDOM.findDOMNode(this.refs['password']) as HTMLInputElement
        !container.value && this.setState({
            isPasswordFocus: !this.state.isPasswordFocus
        })
    }

    private captchaFocus = (): void => {
        this.setState({
            isCaptcha: true
        })
    }

    private captchaBlur = (): void => {
        let container: HTMLInputElement = ReactDOM.findDOMNode(this.refs['captcha']) as HTMLInputElement
        !container.value && this.setState({
            isCaptcha: !this.state.isCaptcha
        })
    }
    private telFocus = (): void => {
        this.setState({
            isTelephone: true
        })
    }

    private telBlur = (): void => {
        let container: HTMLInputElement = ReactDOM.findDOMNode(this.refs['telephone']) as HTMLInputElement
        !container.value && this.setState({
            isTelephone: !this.state.isTelephone
        })
    }

    private failToast = (): void => {
        Toast.fail('验证码输入错误', 1, () => this.getCaptcha());
    }

    private submit = () => {
        let username: HTMLInputElement = ReactDOM.findDOMNode(this.refs['username']) as HTMLInputElement
        let password: HTMLInputElement = ReactDOM.findDOMNode(this.refs['password']) as HTMLInputElement
        let telephone: HTMLInputElement = ReactDOM.findDOMNode(this.refs['telephone']) as HTMLInputElement
        let captcha: HTMLInputElement = ReactDOM.findDOMNode(this.refs['captcha']) as HTMLInputElement
        let data = { username: username.value, password: password.value, telephone: telephone.value, captcha: captcha.value, createDate: new Date() }
        Axios.post('/api/users/register', data).then(res => {
            const { code } = res.data
            code === 400 && this.failToast()
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
                    <p dangerouslySetInnerHTML={{ __html: this.state.captcha }} ></p>
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
