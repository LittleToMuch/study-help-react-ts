import { lazy } from 'react'
import Experience from '../views/Article/Experience'
import LearningStrategy from '../views/Article/LearningStrategy'

const Home = lazy(() => import(/* webpackChunkName: "Home" */ '../views/Home'))
const Knowledge = lazy(() => import(/* webpackChunkName: "Knowledge" */ '../views/Knowledge'))
const Login = lazy(() => import(/* webpackChunkName: "Login" */ '../views/Login'))
const Register = lazy(() => import(/* webpackChunkName: "Register" */ '../views/Register'))
const TuTsau = lazy(() => import(/* webpackChunkName: "TuTsau" */ '../views/TuTsau'))
const UpsShow = lazy(() => import(/* webpackChunkName: "UpsShow" */ '../views/UpsShow'))
const Article = lazy(() => import(/* webpackChunkName: "Article" */ '../views/Article'))

export interface RouteList {
    path: string
    name: string
    isAuth: boolean
    isShow: boolean
    children?: RouteList[]
    component: any
    icon?: string
}
export const routelist: Array<RouteList> = [
    {
        path: '/article',
        name: '文章',
        component: Article,
        isAuth: false,
        isShow: true,
        icon: 'iconfont icon-wenzhang',
        children: [
            {
                path: '/article/experience',
                name: '经验百科',
                isAuth: false,
                isShow: true,
                component: Experience
            },
            {
                path: '/article/learning',
                name: '学习攻略',
                isAuth: false,
                isShow: true,
                component: LearningStrategy
            }
        ]
    },
    {
        path: '/knowledge',
        name: '知识汇',
        isAuth: false,
        isShow: true,
        component: Knowledge,
        icon: 'iconfont icon-zhishi'
    },
    {
        path: '/tutsau',
        name: '吐槽',
        isAuth: false,
        isShow: true,
        component: TuTsau,
        icon: 'iconfont icon-tucaobalogo'
    },
    {
        path: '/upshow',
        name: '大咖秀',
        isAuth: false,
        isShow: true,
        component: UpsShow,
        icon: 'iconfont icon-dakahui'
    },
    {
        path: '/home',
        name: '我的',
        isAuth: true,
        isShow: true,
        component: Home,
        icon: 'iconfont icon-wodedangxuan'
    },
    {
        path: '/login',
        name: '登录',
        isAuth: false,
        isShow: false,
        component: Login
    },
    {
        path: '/register',
        name: '注册',
        isAuth: false,
        isShow: false,
        component: Register
    }
]