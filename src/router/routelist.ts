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
const UpdateAvatar = lazy(() => import(/* webpackChunkName: "UpdateAvatar" */ '../views/UpdateAvatar'))
const InputModal = lazy(() => import(/* webpackChunkName: "InputModal" */ '../views/TuTsau/InputModal'))
const MyTutsau = lazy(() => import( /* webpackChunkName: "MyTutsau" */ '../views/Home/Components/MyTutsau'))
const MyQuestion = lazy(() => import( /* webpackChunkName: "MyQuestion" */ '../views/Home/Components/MyQuestion'))
const MyIssue = lazy(() => import( /* webpackChunkName: "MyIssue" */ '../views/Home/Components/MyIssue'))
const MyCollection = lazy(() => import( /* webpackChunkName: "MyCollection" */ '../views/Home/Components/MyCollection'))
const MyAnswer = lazy(() => import( /* webpackChunkName: "MyAnswer" */ '../views/Home/Components/MyAnswer'))
const HasBuy = lazy(() => import( /* webpackChunkName: "HasBuy" */ '../views/Home/Components/HasBuy'))

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
    },
    {
        path: '/updateAvatar',
        name: '上传头像',
        isAuth: true,
        isShow: false,
        component: UpdateAvatar
    },
    {
        path: '/TuTsauModal',
        name: '上传头像',
        isAuth: true,
        isShow: false,
        component: InputModal
    },
    {
        path: '/myTutsau',
        name: '我的吐槽',
        isAuth: true,
        isShow: false,
        component: MyTutsau
    },
    {
        path: '/myQuestion',
        name: '我的提问',
        isAuth: true,
        isShow: false,
        component: MyQuestion
    },
    {
        path: '/myIssue',
        name: '我的发布',
        isAuth: true,
        isShow: false,
        component: MyIssue
    },
    {
        path: '/myCollection',
        name: '我的收藏',
        isAuth: true,
        isShow: false,
        component: MyCollection
    },
    {
        path: '/myAnswer',
        name: '我的回答',
        isAuth: true,
        isShow: false,
        component: MyAnswer
    },
    {
        path: '/hasBuy',
        name: '已购买',
        isAuth: true,
        isShow: false,
        component: HasBuy
    }
]