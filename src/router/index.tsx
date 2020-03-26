import { Route, BrowserRouter as Router, Redirect, Switch, RouteComponentProps, withRouter } from 'react-router-dom'
import React, { Suspense } from 'react'
import App from '../App'
import Loading from '../components/Loading'
import { routelist, RouteList } from './routelist'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
const isLogin = () => localStorage.getItem("token")
const routerlist = (item: RouteList) => {
    if (item.children) {
        return <Route key={item.path} path={item.path} render={(props: RouteComponentProps) => (
            <item.component {...props}>
                <Switch>
                    {item.children!.map(key => (
                        routerlist(key)
                    ))}
                    <Redirect from={item.path} to={item.children![0].path} />
                </Switch>
            </item.component>
        )} />
    } else {
        return item.isAuth ? <Route key={item.path} path={item.path} render={(props: RouteComponentProps) => (
            isLogin() ? <item.component {...props} exact /> : <Redirect to="/login" />
        )} /> : <Route key={item.path} path={item.path} component={item.component} exact />
    }
}
const router = (
    <Router>
        <App>
            <Switch>
                <Suspense fallback={<Loading />}>
                    {
                        routelist.map(item => {
                            return routerlist(item)
                        })
                    }
                    <Redirect from="/" to="/article" />
                </Suspense>
            </Switch>
        </App>
    </Router>
)

export default router





{/* <Route path="/article" render={(props: RouteComponentProps) => {
                        return (
                            <Article { ...props }> 
                                <Switch>
                                    <Route path="/article/experience" component={ Expeience }/>
                                    <Route path="/article/learning" component={ LearningStrategy }/>
                                    <Redirect from="/article" to="/article/experience"/>
                                </Switch>
                            </Article>
                        )
                    }}/>
                    <Route path="/knowledge" component={ Knowledge }/>
                    <Route path="/tutsau" component={ TuTsau }/>
                    <Route path="/upshow" component={UpsShow}/>
                    <Route path="/login" component={ Login }/>
                    <Route path="/register" component={ Register }/>
                    <Route path="/home" render={(props: RouteComponentProps) => {
                        return isLogin() ? <Home { ...props }/> : <Redirect to="/login" />
                    }}/>
                    <Redirect from="/" to="/article"/> */}