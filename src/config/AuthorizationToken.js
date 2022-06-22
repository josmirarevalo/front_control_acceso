import AxiosClient from './AxiosClient';

const AuthorizationToken = jwtToken => {
    if(jwtToken) {
        AxiosClient.defaults.headers.common['authorization'] = `Bearer ${jwtToken}`;
    } else {
        delete AxiosClient.defaults.headers.common['authorization'];
    }
}

export default AuthorizationToken;