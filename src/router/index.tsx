import {Route, BrowserRouter as Router, Redirect, Switch, RouteComponentProps} from 'react-router-dom'
import React, { lazy, Suspense } from 'react'
import App from '../App'
import Loading from '../components/Loading'
const Home = lazy(() => import('../views/Home'))
const Knowledge = lazy(() => import('../views/Knowledge'))
const Login = lazy(() => import('../views/Login'))
const Register = lazy(() => import('../views/Register'))
const TuTsau = lazy(() => import('../views/TuTsau'))
const UpsShow = lazy(() => import('../views/UpsShow'))
const Expeience = lazy(() => import('../views/Article/Experience'))
const LearningStrategy = lazy(() => import('../views/Article/LearningStrategy'))
const Article = lazy(() => import('../views/Article'))

const isLogin = () => localStorage.getItem("token")
const router = (
    <Router>
        <App>
            <Switch>
                <Suspense fallback={ <Loading /> }>
                    <Route path="/article" render={(props: RouteComponentProps) => {
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
                    <Route path="/upshow" component={ UpsShow }/>
                    <Route path="/login" component={ Login }/>
                    <Route path="/register" component={ Register }/>
                    <Route path="/home" render={(props: RouteComponentProps) => (
                        isLogin() ? <Home { ...props }/> : <Login { ...props }/>
                    )}/>
                    <Redirect from="/" to="/article/experience"/>
                </Suspense>
            </Switch>
        </App>
    </Router>
)

export default router