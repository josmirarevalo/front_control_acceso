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

const initialState = {
    users: [],
    userList: [],
    user: {},
    isAuthenticated: false,
    loading: false,
    error: false
}

export default function(state = initialState, action){
    switch(action.type){
        case USER_LIST:
            return {
                ...state,
                loading: true,
                user: {}
            }
        case USER_LIST_SUCCESS:
            return {
                ...state,
                users: action.payload,
                loading: false,
                error: false,
                user: {}
            }
        case USER_LIST_ERROR:
            return {
                ...state,
                users: [],
                loading: false,
                error: true,
                user: {}
            }
        case USER_GET:
            return {
                ...state,
                loading: true
            }
        case USER_GET_SUCCESS:
            return {
                ...state,
                user: action.payload,
                loading: false,
                error: false
            }
        case USER_GET_ERROR:
            return {
                ...state,
                error: true,
                user: {}
            }
        case USER_NEW:
            return {
                ...state
            }
        case USER_NEW_SUCCESS:
            return {
                ...state,
                users: [...state.users, action.payload],
                user: {},
                error: false
            }
        case USER_NEW_ERROR:
            return {
                ...state,
                error: true
            }
        case USER_NEW_RECORD:
            return {
                ...state,
                user: {},
                error: false
            }
        case USER_EDIT:
            return {
                ...state
            }
        case USER_EDIT_SUCCESS:
            return {
                ...state,
                error: false,
                user: action.payload,
                users: state.users.map(user => user.id === action.payload.id ? user = action.payload : user),
            }
        case USER_EDIT_ERROR:
            return {
                ...state,
                error: false
            }
        case USER_VALID_PASSWORD:
            return {
                ...state,
                isAuthenticated: false,
                uservalid: '',
                userrole: '',
                userid: ''
            }
        case USER_VALID_PASSWORD_SUCCESS:
            return {
                ...state,
                error: false,
                isAuthenticated: true,
                users: []
            }
        case USER_VALID_PASSWORD_ERROR:
            return {
                ...state,
                isAuthenticated: false,
                error: true,
                users: []
            }
        case USER_DELETE:
            return {
                ...state
            }       
        case USER_DELETE_SUCCESS:
            return {
                ...state,
                users: state.users.filter(users=>users.id !== users.payload),                
                error: false
            }
        case USER_DELETE_ERROR:
            return {
                ...state,
                error: true
            }

        default:
            return state;
    }
}
