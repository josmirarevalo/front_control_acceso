import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../store/actions/actions';

import ToggleFullscreen from '../Common/ToggleFullscreen';
import SidebarUserBlock from './SidebarUserBlock';
import HeaderRun from './Header.run';

import { logout } from '../../config/AuthLogin';

class Header extends Component {

    componentDidMount() {
        HeaderRun();      
    }

    toggleUserblock = e => {
        e.preventDefault();
        this.props.actions.toggleSetting('showUserBlock');
    }

    toggleOffsidebar = e => {      
        e.preventDefault();
        logout();
        sessionStorage.clear();
        window.location.href = '/login';
        //props.history.push(`/login`);
        //this.props.actions.toggleSetting('offsidebarOpen');
    }

    toggleCollapsed = e => {
        e.preventDefault()
        this.props.actions.toggleSetting('isCollapsed');
        this.resize()
    }

    toggleAside = e => {
        e.preventDefault()
        this.props.actions.toggleSetting('asideToggled');
    }

    resize () {
        // all IE friendly dispatchEvent
        var evt = document.createEvent('UIEvents');
        evt.initUIEvent('resize', true, false, window, 0);
        window.dispatchEvent(evt);
        
    }

    render() {

        let message = '';

        let user = JSON.parse(sessionStorage.getItem('user'));

        if (sessionStorage.user) {
            let name = JSON.parse(sessionStorage.user).name;
            message = `Bienvenido al Sistema ` + name;
        }

        return (
            <header className="topnavbar-wrapper">
                { /* START Top Navbar */ }
                <nav className="navbar topnavbar">
                    { /* START navbar header */ }
                    <div className="navbar-header">
                        <a className="navbar-brand" href="#/">
                            <div className="brand-logo">
                                <img className="img-fluid" src="img/logo-base.png" alt="Logo" />
                            </div>
                            <div className="brand-logo-collapsed">
                                <img className="img-fluid" src="img/logo-single.png" alt="App Logo" />
                            </div>
                        </a>
                    </div>
                    { /* END navbar header */ }

                    { /* START Left navbar */ }
                    <ul className="navbar-nav mr-auto flex-row">
                        <li className="nav-item">
                            { /* Button used to collapse the left sidebar. Only visible on tablet and desktops */ }
                            <a href="" className="nav-link d-none d-md-block d-lg-block d-xl-block" onClick={ this.toggleCollapsed }>
                                <em className="fas fa-bars"></em>
                            </a>
                            { /* Button to show/hide the sidebar on mobile. Visible on mobile only. */ }
                            <a href=""  className="nav-link sidebar-toggle d-md-none" onClick={ this.toggleAside }>
                                <em className="fas fa-bars"></em>
                            </a>
                        </li>
                        
                        
                    </ul>            
                    <ul className="navbar-nav flex-row">
                    <h4 style={{paddingTop: '14px', paddingRight: '15px', color: '#fff'}}>{message}</h4>
                        <li className="has-user-block">
                            <SidebarUserBlock/>
                        </li> 
                        {process.env.REACT_APP_SUPER_USER === user?.userrole ?
                            <li className="nav-item">                                 
                                <a className="nav-link" onFocus="Configuración" > 
                                    <div className="float-right">                                       
                                        <Link to="systemconfig" className="icon-settings"></Link>
                                    </div>
                                </a>
                            </li>
                            :
                            null
                        }

                        { /* Fullscreen (only desktops) */ }
                        <li className="nav-item d-none d-md-block">
                            <ToggleFullscreen className="nav-link"/>
                        </li>                       
                        <li className="nav-item">
                            <a className="nav-link" href="" onClick={this.toggleOffsidebar}>
                                <em className="icon-logout"/>
                            </a>
                        </li>
                        { /* END Offsidebar menu */ }
                    </ul>
                    { /* END Right Navbar */ }

                    { /* START Search form */ }
                    <form className="navbar-form" role="search" action="search.html">
                       <div className="form-group">
                          <input className="form-control" type="text" placeholder="Type and hit enter ..."/>
                          <div className="fa fa-times navbar-form-close" data-search-dismiss=""/>
                       </div>
                       <button className="d-none" type="submit">Submit</button>
                    </form>
                    { /* END Search form */ }
                </nav>
                { /* END Top Navbar */ }
            </header>
            );
    }
}

Header.propTypes = {
    actions: PropTypes.object,
    settings: PropTypes.object
};

const mapStateToProps = state => ({ 
    settings: state.settings,
})
const mapDispatchToProps = dispatch => ({ 
    actions: bindActionCreators(actions, dispatch),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Header);