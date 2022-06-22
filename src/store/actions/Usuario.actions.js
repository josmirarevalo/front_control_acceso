import {
    USER_LIST,
    USER_LIST_SUCCESS,
    USER_LIST_ERROR,    
    USER_GET,
    USER_GET_SUCCESS,
    USER_GET_ERROR,
    USER_NEW,
    USER_NEW_SUCCESS,
    USER_NEW_ERROR,
    USER_NEW_RECORD,
    USER_EDIT,
    USER_EDIT_SUCCESS,
    USER_EDIT_ERROR,   
    USER_VALID_PASSWORD,
    USER_VALID_PASSWORD_SUCCESS,
    USER_VALID_PASSWORD_ERROR,
    USER_DELETE,
    USER_DELETE_SUCCESS,
    USER_DELETE_ERROR
} from '../types';

import AuthToken from '../../config/AuthorizationToken';
import jwtDecode from 'jwt-decode';

import AxiosClient from '../../config/AxiosClient';

require('dotenv').config();

// Función Principal para obtener lista de Usuarios
export function UserListAction(){
    
    return (dispatch =>{
        dispatch(UserList());
        AxiosClient.get(`${process.env.REACT_APP_USER}`)
            .then((response)=> {                
                dispatch( UserListSuccess(response.data.result));
            })
            .catch(error=> {
                dispatch( UserListError(error) );
            });
    });
}

export const UserList = () => ({
    type: USER_LIST
});

export const UserListSuccess = (records) => ({
    type: USER_LIST_SUCCESS,
    payload: records
});

export const UserListError = (error) => ({
    type: USER_LIST_ERROR,
    payload: error
});

// Función Principal para obtener un User
export function UserGetAction(username){
    return (dispatch =>{
        dispatch(UserGet());
        AxiosClient.get(`${process.env.REACT_APP_USER}/${username}`)
            .then((response)=> {
                dispatch( UserGetSuccess(response.data.result));
            })
            .catch(error=> {
                dispatch( UserGetError(error) );
            });
    });
}

export const UserGet = () => ({
    type: USER_GET
});

export const UserGetSuccess = (record) => ({
    type: USER_GET_SUCCESS,
    payload: record
});

export const UserGetError = (error) => ({
    type: USER_GET_ERROR,
    payload: error
});

//Función Principal para setear objeto de User cuando se va crear un registro nuevo
export function UserNewAction(){
    return (dispatch =>{
            dispatch(UserNewRecord());
    });
}

export const UserNewRecord = () => ({
    type: USER_NEW_RECORD
});

// Función Principal para crear y editar registros de User
export function UserSaveAction(record, isNew){
    return (dispatch =>{
        if(!isNew) {
            dispatch(UserEdit());
        } else{
            dispatch(UserNew());
        }
        if(isNew){
            AxiosClient.post(`${process.env.REACT_APP_USER}`, record)
                .then((response)=> {
                    record.id = response.data.result.id;
                    dispatch( UserNewSuccess(record));
                })
                .catch(error=> {
                    dispatch( UserNewError(error) );
                });
        }else{
            AxiosClient.put(`${process.env.REACT_APP_USER}/${record.id}`, record)
                .then((response)=> {
                    dispatch( UserEditSuccess(record));
                })
                .catch(error=> {
                    dispatch( UserEditError(true) );
                });
        }
    });
}

export const UserNew = () => ({
    type: USER_NEW
});

export const UserNewSuccess = (record) => ({
    type: USER_NEW_SUCCESS,
    payload: record
});

export const UserNewError = (error) => ({
    type: USER_NEW_ERROR,
    payload: error
});

export const UserEdit = () => ({
    type: USER_EDIT
});

export const UserEditSuccess = (record) => ({
    type: USER_EDIT_SUCCESS,
    payload: record
});

export const UserEditError = (error) => ({
    type: USER_EDIT_ERROR,
    payload: error
});

// Función Principal para validar el usuario y password
export const UserValidPasswordAction = (user, history)=>{
    return (dispatch =>{
        dispatch(UserValidPassword());        
        AxiosClient.post(`${process.env.REACT_APP_LOGIN}/validarusuario`, user)
            .then((response)=> {
                const userDecode = jwtDecode(response.data.result.token);
                if(userDecode.uservalid==="YES"){                  
                    sessionStorage.setItem(process.env.REACT_APP_IS_AUTHENTICATED, true);                   
                    sessionStorage.setItem(process.env.REACT_APP_VAR_TOKEN, response.data.result.token);
                    sessionStorage.setItem(process.env.REACT_APP_VAR_USER_VALID, userDecode.uservalid);

                    const token = sessionStorage.getItem(process.env.REACT_APP_VAR_TOKEN);

                    // Autentica el token
                    if(token) AuthToken(token);                  
                    dispatch( UserValidPasswordSuccess(userDecode));
                }else{
                    dispatch( UserValidPasswordError(response.data.result));
                }
            })
            .catch(error=> {
                dispatch( UserValidPasswordError(error) );
            });
    });
}

export const UserValidPassword = () => ({
    type: USER_VALID_PASSWORD
});

export const UserValidPasswordSuccess = (record) => ({
    type: USER_VALID_PASSWORD_SUCCESS,
    payload: record
});

export const UserValidPasswordError = (error) => ({
    type: USER_VALID_PASSWORD_ERROR,
    payload: error
});


// Función Principal para Eliminar un Usuario por su ID.
export function UserDeleteAction(id){
    return (dispatch =>{
        dispatch(UserDelete());
        AxiosClient.delete(`${process.env.REACT_APP_USER}/${id}`)
            .then((response)=> {
                dispatch( UserDeleteSuccess(id));
            })
            .catch(error=> {
                dispatch( UserDeleteError(error) );
            });
    });
}

export const UserDelete = () => ({
    type: USER_DELETE
});

export const UserDeleteSuccess = (id) => ({
    type: USER_DELETE_SUCCESS,
    payload: id
});

export const UserDeleteError = (error) => ({
    type: USER_DELETE_ERROR,
    payload: error
});

