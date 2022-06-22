import React, { useEffect } from 'react';
import { Collapse } from 'reactstrap';

import { useSelector } from 'react-redux';

export default function SidebarUserBlock(props){

    let showUserBlock = false;

    useEffect(() => {
        showUserBlock = props.showUserBlock;
    }, [props.showUserBlock]);

    showUserBlock = useSelector(state=>state.settings.showUserBlock);

    return (
        <Collapse id="user-block" isOpen={ !showUserBlock }>
            <div>
                <div className="item user-block">
                    {/* User picture */}
                    <div className="user-block-picture">
                        <div className="user-block-status">
                            <img className="img-thumbnail rounded-circle" src={sessionStorage.getItem('photo')!==undefined||
                                                                               sessionStorage.getItem('photo')!==null?'img/user/01.jpg':sessionStorage.getItem('photo')} 
                                                                               alt="Avatar" width="40" height="40" />
                            <div className="circle bg-success circle-lg"></div>
                        </div>
                    </div>
                    
                </div>
                {/* Name and Job */}
                {/* <div className="user-block-info">
                    <span className="user-block-name text-dark">Hola {sessionStorage.getItem("name")} Tonny Cárdenas</span>
                    <span className="user-block-role bold">{sessionStorage.getItem("role")} Role:</span>
                </div>  */}
            </div>
        </Collapse>
    )
}
