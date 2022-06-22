import React, { useState, useEffect} from 'react';
import { withNamespaces, Trans } from 'react-i18next';
import { Link, withRouter } from 'react-router-dom';
import { Collapse, Badge } from 'reactstrap';

import { useDispatch, useSelector } from 'react-redux';

import SidebarRun from './Sidebar.run';
import { MenuListAction, toggleSetting} from '../../store/actions/actions';
import { logout } from '../../config/AuthLogin';

import {messageSuccess} from '../../Utils/Utils';

/** Component to display headings on sidebar */
const SidebarItemHeader = ({item}) => (
    <li className="nav-heading">
        <span><Trans i14nKey={item.translate}>{item.heading}</Trans></span>
    </li>
)

/** Normal items for the sidebar */
const SidebarItem = ({item, isActive, parentName = '', isThird = false }) => (   
    <li className={ isActive ? 'active' : '' }>
        <Link to={item.path} title={item.name}>
            {item.label && <Badge tag="div" className="float-right" color={item.label.color}>{item.label.value}</Badge>}
            {item.icon && <em className={item.icon}></em>}
            <span data-parent-name={parentName} data-is-third={isThird}><Trans i18nKey={item.translate}>{item.name}</Trans></span>
        </Link>
    </li>
)

/** Build a sub menu with items inside and attach collapse behavior */
const SidebarSubItem = ({item, isActive, handler, children, isOpen, lvl=0}) => {
    return (<li className={ isActive ? 'active' : '' }>
        <div className="nav-item" onClick={ handler } >
            {item.label && <Badge tag="div" className="float-right" color={item.label.color}>{item.label.value}</Badge>}
            {item.icon && <em className={item.icon}></em>}
            <span><Trans i18nKey={item.translate}>{item.name}</Trans></span>            
        </div>
        <Collapse isOpen={ isOpen }>
            <ul id={item.path} className="sidebar-nav sidebar-subnav"
                style={{marginLeft: (lvl>0?'1.5vh':'0px')}}>
                { children }
            </ul>
        </Collapse>
    </li>
); }

/** Component used to display a header on menu when using collapsed/hover mode */
const SidebarSubHeader = ({item}) => (
    <li className="sidebar-subnav-header">{item.name}</li>
)

let showMessage=true;

function Sidebar(props) {

    const [state, setState] = useState({collapse: {}});

    const dispatch = useDispatch();

    useEffect(() => {

        // pass navigator to access router api
        SidebarRun(navigator, closeSidebar);

        // prepare the flags to handle menu collapsed states
        buildCollapseList();

        // Listen for routes changes in order to hide the sidebar on mobile
        props.history.listen(closeSidebar, SidebarRun);
    }, [dispatch, buildCollapseList ]);

    const Menu  = [
                    {"id":1,"name":"Inicio","path":"/home","order":10,"icon":"icon-home","visible":true,"submenu":null},
                    {"id":2,"name":"Usuarios","path":"/usuario","order":20,"icon":"icon-wallet","visible":true,"submenu":null}
                ];

    const closeSidebar = () => {
        dispatch(toggleSetting('asideToggled'));
    }

    /** prepare initial state of collapse menus. Doesnt allow same route names */
    var buildCollapseList = () => {
        let collapse = {};
        Menu
            .filter(({heading}) => !heading)
            .forEach(({name, path, submenu}) => {
                // collapse[name] = routeActive(submenu ? submenu.map(({path})=>path) : path);
                collapse[name] = name === 'Inicio' ? true : false;
            });

        setState({collapse});
    }

    const navigator = route => {
        props.history.push(route);
    }

    const routeActive = (paths) =>{
        paths = Array.isArray(paths) ? paths : [paths];
        return paths.some(p => props.location.pathname.indexOf(p) > -1)
    }

    const toggleItemCollapse = (stateName,isThirdLevel, parentName='' )=> {
        for (let c in state.collapse) {
            if (state.collapse[c] === true && c !== stateName)
                setState({
                    collapse: {
                        [c]: false
                    }
                });
        }
        if (isThirdLevel && parentName) {
            setState({
                collapse: {
                    [stateName]: !state.collapse[stateName],
                    [parentName]: true
                }
            });
            return
        }
        setState({
            collapse: {
                [stateName]: !state.collapse[stateName]
            }
        });
    }

    const getSubRoutes = item => item.submenu.map(({path}) => path)

    /** map menu config to string to determine which element to render */
    const itemType = item => {
        if (item.heading) return 'heading';
        if (!item.submenu) return 'menu';
        if (item.submenu) return 'submenu';
    }

    const mapper = (nodes, parentName = null, lvl = 0) => {        

        return nodes.map((item, i) => {
            // heading
            if (itemType(item) === 'heading')
                return (
                    <SidebarItemHeader item={item} key={i}/>
                )
            else {
                if (itemType(item) === 'menu')
                    return (
                        <SidebarItem isActive={routeActive(item.path)} item={item} key={i}/>
                    )
                if (itemType(item) === 'submenu') {
                    return [
                        <SidebarSubItem item={item} isOpen={state.collapse[item.name]}
                                        handler={toggleItemCollapse.bind(this, item.name, lvl > 0, parentName)}
                                        isActive={routeActive(getSubRoutes(item))} key={i}
                                        lvl={lvl}>
                            <SidebarSubHeader item={item} key={i}/>
                            {
                                mapper(item.submenu, item.name, (lvl || 0) + 1)
                            }
                        </SidebarSubItem>
                    ]
                }
            }
            return null; // unrecognized item
        });
    }

    return (
        <aside className='aside-container'>
            { /* START Sidebar (left) */ }
            <div className="aside-inner">
                <nav data-sidebar-anyclick-close="" className="sidebar">
                    { /* START sidebar nav */ }
                    <ul className="sidebar-nav">
                        {
                            mapper(Menu)            }
                    </ul>
                    { /* END sidebar nav */ }
                </nav>
            </div>
            { /* END Sidebar (left) */ }
        </aside>
    );
}

export default (withNamespaces('translations')(withRouter(Sidebar)));
