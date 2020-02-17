import * as React from 'react';
import style from './index.module.scss'
import { NavLink, RouteComponentProps } from 'react-router-dom';
import Axios from '../../utils/axios'
import { Toast } from 'antd-mobile';
import Input from '../../components/Input';

export interface IRegisterProps extends RouteComponentProps {}

interface IRegisterState {
    isUserFocus: boolean
    isPasswordFocus: boolean
    isCaptcha: boolean
    isTelephone: boolean
    captcha: string
    captchaSvg: string
    username: string
    password: string
    telephone: string
}

export default class Register extends React.Component<IRegisterProps, IRegisterState> {
    public state: Readonly<IRegisterState> = {
        isPasswordFocus: false,
        isUserFocus: false,
        isCaptcha: false,
        isTelephone: false,
        captcha: '',
        captchaSvg: '',
        username: '',
        password: '',
        telephone: ''
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
    
    
    private captcha = (value: string) => this.setState({ captcha: value })
    private username = (value: string) => this.setState({ username: value})
    private password = (value: string) => this.setState({ password: value })
    private telephone = (value: string) => this.setState({ telephone: value })

    private failToast = (msg: string): void => Toast.fail(msg, 1, () => this.getCaptcha())

    private refreshCaptcha = (): void => this.getCaptcha()

    private submit = (): void => {
        const { username, password, captcha, telephone } = this.state
        const data = { username, password, captcha, telephone, createDate: new Date() }
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
                    <Input type="username" placeholder="Username" value={this.username}/>
                    <Input type="password" placeholder="Password" value={this.password}/>
                    <Input type="telephone" placeholder="telephone" value={this.telephone}/>
                    <Input type="captcha" placeholder="Captcha" captchaSvg={this.state.captchaSvg} refresh={this.refreshCaptcha} value={this.captcha}/>
                    <input type="submit" className={style.logbtn} value='Register' disabled={!(this.state.isCaptcha || this.state.isPasswordFocus || this.state.isTelephone|| this.state.isUserFocus)} onClick={this.submit}/>
                    <div className={style.bottomText}>
                        <NavLink to="/login">⬅Come back</NavLink>
                    </div>
                </div>
            </div>
        )
    }
}
