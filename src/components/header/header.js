import React from 'react';
import './header.scss'
import logo from "./../../common/images/logo.png";

import {
    Link
} from "react-router-dom";

export default class Header extends React.Component {
    render() {
        return (
            <Link to='/'>
                <div className="component-header row">
                    <img src={logo} width="40" alt="logo" className="-col-auto"/>
                    <h1 className="caption">React Music Player</h1>
                </div>
            </Link>
        );
    }
}
