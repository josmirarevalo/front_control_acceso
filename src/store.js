// import { createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
// import rootReducer from './reducers';

// const initialState = {};

// const middleware = [thunk];

// Permite no usar Devtools en Producción
// const devTools = applyMiddleware(...middleware);
//   process.env.NODE_ENV === "production"
//     ? applyMiddleware(...middleware)
//     : composeWithDevTools(applyMiddleware(...middleware));

// Permite optimizar la carga de Redux en el browser
// const actionSanitizer = (action) => (
//     action.type === 'FILE_DOWNLOAD_SUCCESS' && action.data ?
//     { ...action, data: '<<LONG_BLOB>>' } : action
// );

// const store = createStore(
//     rootReducer, 
//     initialState, 
//     //compose(applyMiddleware(...middleware), 
//     compose(devTools,
//             window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__({
//                 actionSanitizer, 
//                 stateSanitizer: (state) => state.data ? { ...state, data: '<<LONG_BLOB>>' } : state
//             })
// ) );

export default store;
