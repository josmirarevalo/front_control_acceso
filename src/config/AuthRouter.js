import React, {useEffect} from 'react';
import { Route, Redirect } from 'react-router-dom';

require('dotenv').config();

const AuthRouter = ({component: Component, ...props})=>{

    let is_authenticated = false;

    useEffect(() => {
        is_authenticated = sessionStorage.getItem(process.env.REACT_APP_IS_AUTHENTICATED);
        console.log('is_authentication', is_authenticated);
    }, [is_authenticated]);

    return ( 
        <Route { ...props } render={ props => !is_authenticated ?  (
            <Redirect to="/" />
        )  : (
            <Component {...props} />
        ) } />

     );
}

export default AuthRouter;