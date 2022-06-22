const JWT_TOKEN = 'jwtToken';

export const setToken = (tokenObj) => {
  sessionStorage.setItem(JWT_TOKEN, tokenObj);
  //sessionStorage.setItem("refresh_token", tokenObj.refresh_token);
}
export const getAccessToken = () =>{
    return sessionStorage.getItem(JWT_TOKEN);
}
export const getRefreshToken = () =>{
    return sessionStorage.getItem("refresh_token");
}
export const clearToken = () =>{
  sessionStorage.removeItem(JWT_TOKEN);
  //sessionStorage.removeItem("refresh_token");
}


