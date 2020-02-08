import {Route, BrowserRouter as Router, Redirect, Switch, RouteComponentProps} from 'react-router-dom'
import React from 'react'
import App from '../App'
import Home from "../views/Home";
import Experience from '../views/Article/Experience';
import LearningStrategy from '../views/Article/LearningStrategy';
import Article from '../views/Article';
import Knowledge from '../views/Knowledge';
import TuTsau from '../views/TuTsau';
import UpsShow from '../views/UpsShow';
import Login from '../views/Login';
import Register from '../views/Register';
const isLogin = () => localStorage.getItem("token")
const router = (
    <Router>
        <App>
            <Switch>
                <Route path="/article" render={(props: RouteComponentProps) => {
                    return (
                        <Article {...props}>
                            <Switch>
                                <Route path="/article/experience" component={Experience}/>
                                <Route path="/article/learning" component={LearningStrategy}/>
                                <Redirect from="/article" to="/article/experience"/>
                            </Switch>
                        </Article>
                    )
                }}/>
                <Route path="/knowledge" component={Knowledge}/>
                <Route path="/tutsau" component={TuTsau}/>
                <Route path="/upshow" component={UpsShow}/>
                <Route path="/login" component={Login}/>
                <Route path="/register" component={Register}/>
                <Route path="/home" render={(props: RouteComponentProps) => (
                    isLogin() ? <Home {...props}/> : <Login {...props}/>
                )}/>
                <Redirect from="/" to="/article"/>
            </Switch>
        </App>
    </Router>
)

export default router