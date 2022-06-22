import {
    MENU_LIST,
    MENU_LIST_SUCCESS,
    MENU_LIST_ERROR,
    MENU_DDLIST,
    MENU_DDLIST_SUCCESS,
    MENU_DDLIST_ERROR,
    MENU_GET,
    MENU_GET_SUCCESS,
    MENU_GET_ERROR,
    MENU_NEW,
    MENU_NEW_SUCCESS,
    MENU_NEW_ERROR,
    MENU_NEW_RECORD,
    MENU_EDIT,
    MENU_EDIT_SUCCESS,
    MENU_EDIT_ERROR
} from '../types';

//const axios = require('axios');
import AxiosClient from '../../config/AxiosClient';

require('dotenv').config();

// Función Principal para obtener lista de Menues
export function MenuListAction(id){

    return (dispatch =>{
        dispatch(MenuList());
        AxiosClient.get(`${process.env.REACT_APP_MENU}/list/${id}`)        
            .then((response)=> {
                dispatch( MenuListSuccess(id, response.data.result));
            })
            .catch(error=> {
                dispatch( MenuListError(error.response) );
            });
    });
}

export const MenuList = () => ({
    type: MENU_LIST
});

export const MenuListSuccess = (id, records) => ({
    type: MENU_LIST_SUCCESS,
    payload: records,
    id: id
});

export const MenuListError = (error) => ({
    type: MENU_LIST_ERROR,
    payload: error
});

// Función Principal para obtener los Menues en forma de DropDown
export function MenuDDListAction(){
    return (dispatch =>{
        dispatch(MenuDDList());
        AxiosClient.get(`${process.env.REACT_APP_MENU}/ddlist`)
            .then((response)=> {
                dispatch( MenuDDListSuccess(response.data.result));
            })
            .catch(error=> {
                dispatch( MenuDDListError(error) );
            });
    });
}
export const MenuDDList = () => ({
    type: MENU_DDLIST
});

export const MenuDDListSuccess = (records) => ({
    type: MENU_DDLIST_SUCCESS,
    payload: records        
});

export const MenuDDListError = (error) => ({
    type: MENU_DDLIST_ERROR,
    payload: error
});

// Función Principal para obtener un Menu
export function MenuGetAction(id){
    return (dispatch =>{
        dispatch(MenuGet());
        AxiosClient.get(`${process.env.REACT_APP_MENU}/${id}`)
            .then((response)=> {
                dispatch( MenuGetSuccess(response.data.result));
            })
            .catch(error=> {
                dispatch( MenuEditError(error) );
            });
    });
}

export const MenuGet = () => ({
    type: MENU_GET
});

export const MenuGetSuccess = (record) => ({
    type: MENU_GET_SUCCESS,
    payload: record
});

export const MenuMdGetError = (error) => ({
    type: MENU_GET_ERROR,
    payload: error
});

//Función Principal para setear objeto de Menu cuando se va crear un registro nuevo
export function MenuNewAction(){
    return (dispatch =>{
            dispatch(MenuNewRecord());
    });
}

export const MenuNewRecord = () => ({
    type: MENU_NEW_RECORD
});

// Función Principal para crear y editar registros de Menues
export function MenuSaveAction(record, isNew){
    return (dispatch =>{
        if(!isNew) {
            dispatch(MenuEdit());
        } else{
            dispatch(MenuNew());
        }
        if(isNew){
            AxiosClient.post(`${process.env.REACT_APP_MENU}`, record)
                .then((response)=> {
                    record.id = response.data.result.id;
                    dispatch( MenuNewSuccess(record));
                })
                .catch(error=> {
                    dispatch( MenuNewError(error) );
                });
        }else{
            AxiosClient.put(`${process.env.REACT_APP_MENU}/${record.id}`, record)
                .then((response)=> {
                    dispatch( MenuEditSuccess(record));
                })
                .catch(error=> {
                    dispatch( MenuEditError(true) );
                });
        }
    });
}

export const MenuNew = () => ({
    type: MENU_NEW
});

export const MenuNewSuccess = (record) => ({
    type: MENU_NEW_SUCCESS,
    payload: record
});

export const MenuNewError = (error) => ({
    type: MENU_NEW_ERROR,
    payload: error
});

export const MenuEdit = () => ({
    type: MENU_EDIT
});

export const MenuEditSuccess = (record) => ({
    type: MENU_EDIT_SUCCESS,
    payload: record
});

export const MenuEditError = (error) => ({
    type: MENU_EDIT_ERROR,
    payload: error
});