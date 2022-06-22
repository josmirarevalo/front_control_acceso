/*!
 *
 * Angle - Bootstrap Admin Template
 *
 * Version: 4.5
 * Author: @themicon_co
 * Website: http://themicon.co
 * License: https://wrapbootstrap.com/help/licenses
 *
 */

import React, { Component } from 'react';
// import { BrowserRouter, Router } from 'react-router-dom';
import { Router } from 'react-router-dom';
import {history} from './config/History';

// App Routes
import Routes from './Routes';

// Vendor dependencies
import "./Vendor";
// Application Styles
import './styles/bootstrap.scss';
import './styles/app.scss';
// Config
//import '../src/config/config';


class App extends Component {
  
  render() {
    
    // specify base href from env varible 'PUBLIC_URL'
    // use only if application isn't served from the root
    // for development it is forced to root only
    /* global PUBLIC_URL */
    const basename = process.env.NODE_ENV === 'development' ? '/' : (PUBLIC_URL || '/');

    return (
        <Router basename={basename} history={history}>
            <Routes />
        </Router>
    );

  }
}

export default App;
