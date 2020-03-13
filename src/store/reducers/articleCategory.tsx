import { AnyAction } from 'redux'
import { ArticleCategory } from '../state/index'
import { ArticleCategoryEnum } from '../state/index'

const initState: ArticleCategory[] = [
    {label: '攻略', value: `${ArticleCategoryEnum.learning}`},
    {label: '经验', value: `${ArticleCategoryEnum.experience}`},
]

export default function (state: ArticleCategory[] = initState, action: AnyAction): ArticleCategory[] {
    switch(action.type) {
        default: 
            return state
    }
}