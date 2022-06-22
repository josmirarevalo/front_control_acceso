import AuthToken from '../config/AuthorizationToken';
import AxiosClient from '../config/AxiosClient';
import jwtDecode from 'jwt-decode';

require('dotenv').config();

export var AuthLogin = {
    login,
    logout
}

export var login = async(data)=>{
        
    const response   = await AxiosClient.post(`${process.env.REACT_APP_LOGIN}/validarusuario`, data);
    let   userDecode = {};

    if(response){
        const jwtToken = response.data.result.token;

        userDecode = JSON.stringify(jwtDecode(jwtToken));

        sessionStorage.setItem(process.env.REACT_APP_IS_AUTHENTICATED, true);
        sessionStorage.setItem(process.env.REACT_APP_VAR_USER, userDecode);
        sessionStorage.setItem(process.env.REACT_APP_VAR_TOKEN, jwtToken);

        // Autentica el token
        if(jwtToken) AuthToken(jwtToken);

    }else{

    }
    return userDecode;
}

export var logout = () =>{
    sessionStorage.clear();
    window.location.href = '/login';
}
