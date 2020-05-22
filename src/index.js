import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import './index.scss';
import './common/css/common.css';
import './common/css/reset.css';

import noMatch from "./components/noMatch";
import App from './App';

import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <Switch>
                <Route path="/">
                    <App/>
                </Route>
                <Route path="*" component={noMatch}/>
            </Switch>
            <div className={'footer'}>
                <div  className="beian-icp">
                    <a href="http://beian.miit.gov.cn/" target="_blank"
                       rel="nofollow noopener">粤ICP备20032374号</a>
                </div>
            </div>
        </Router>
    </React.StrictMode>,
    document.getElementById('root')
);


// if ('production' === process.env.NODE_ENV) {
//     serviceWorker.register();
// } else {
//     serviceWorker.unregister();
// }

serviceWorker.unregister();
