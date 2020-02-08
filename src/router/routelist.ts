import Home from "../views/Home";
import Experience from '../views/Article/Experience';
import LearningStrategy from '../views/Article/LearningStrategy';
import Article from '../views/Article';
import Knowledge from '../views/Knowledge';
import TuTsau from '../views/TuTsau';
import UpsShow from '../views/UpsShow';

export interface RouteList {
    path: string
    name: string,
    children?: RouteList[],
    component: any
}
export const routelist: Array<RouteList> = [
    {
        path: '/article',
        name: '文章',
        component: Article,
        children: [
            {
                path: '/article/experience',
                name: '经验百科',
                component: Experience
            },
            {
                path: '/article/learning',
                name: '学习攻略',
                component: LearningStrategy
            }
        ]
    },
    {
        path: '/knowledge',
        name: '知识汇',
        component: Knowledge
    },
    {
        path: '/tutsau',
        name: '吐槽',
        component: TuTsau
    },
    {
        path: '/upshow',
        name: '大咖秀',
        component: UpsShow
    },
    {
        path: '/home',
        name: '我的',
        component: Home
    }
]