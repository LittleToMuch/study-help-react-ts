import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './assest/iconfont/iconfont.css'
import 'antd/dist/antd.css';
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux';
import store from './store';
import router from './router'

// const rem = document.documentElement.clientWidth / 10
// document.documentElement.style.fontSize = rem + 'px'

ReactDOM.render(
    <Provider store={store}>
        {router}
    </Provider>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
