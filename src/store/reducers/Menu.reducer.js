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

const initialState = {
    menues: [], 
    menues_config: [],
    menuList: [],
    menu:{},   
    loading: false,
    error: false
}

export default function(state = initialState, action){
    switch(action.type){
        case MENU_LIST:
            return {
                ...state,
                loading: true,
                menu: {}
            }
        case MENU_LIST_SUCCESS:
            return {
                ...state,
                menues: (action.id===1?action.payload:[...state.menues]),
                menues_config: (action.id===2?action.payload:[...state.menues_config]),
                menuList: (action.id===3?action.payload:[]),
                loading: false,
                error: false,
                menu: {}
            }
        case MENU_LIST_ERROR:
            return {
                ...state,
                menues: [],
                menues_config: [],
                menuList: [],
                loading: false,
                error: true,
                menu: {}
            }
        case MENU_DDLIST:
            return {
                ...state,
                loading: true,
                menu: {}
            }
        case MENU_DDLIST_SUCCESS:
            return {
                ...state,
                menues: action.payload,
                loading: false,
                error: false,
                menu: {}
            }
        case MENU_DDLIST_ERROR:
            return {
                ...state,
                menues: [],
                loading: false,
                error: true,
                menu: {}
            }
        case MENU_GET:
            return {
                ...state,
                loading: true
            }
        case MENU_GET_SUCCESS:
            return {
                ...state,
                menu: action.payload,
                loading: false,
                error: false
            }
        case MENU_GET_ERROR:
            return {
                ...state,
                error: true,
                menu: {}
            }
        case MENU_NEW:
            return {
                ...state
            }
        case MENU_NEW_SUCCESS:
            return {
                ...state,
                menues: [...state.menues, action.payload],
                menu: {},
                error: false
            }
        case MENU_NEW_ERROR:
            return {
                ...state,
                error: true
            }
        case MENU_NEW_RECORD:
            return {
                ...state,
                menu: {},
                error: false
            }
        case MENU_EDIT:
            return {
                ...state
            }
        case MENU_EDIT_SUCCESS:
            return {
                ...state,
                error: false,
                menu: action.payload,
                menues: state.menues.map(menu => menu.id === action.payload.id ? menu = action.payload : menu),
            }
        case MENU_EDIT_ERROR:
            return {
                ...state,
                error: false
            }
        default:
            return state;
    }
}
