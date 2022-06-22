import { createStore, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';
import reducers from './reducers/reducers';
import middlewares from './middlewares/middlewares';

import { updateTheme } from './middlewares/themes.middleware.js';

import { persistedState, saveState } from './persisted.store.js';

export default function configureStore() {

    // Permite optimizar la carga de Redux en el browser
    const actionSanitizer = (action) => (
        action.type === 'FILE_DOWNLOAD_SUCCESS' && action.data ?
        { ...action, data: '<<LONG_BLOB>>' } : action
    );

    const composeEnhancers = composeWithDevTools({
        actionSanitizer,
        stateSanitizer: (state) => state.data ? { ...state, data: '<<LONG_BLOB>>' } : state
    });

    const store = createStore(reducers, persistedState, composeEnhancers(
        applyMiddleware(...middlewares),
        // other store enhancers if any
    ));

    // Permite no usar Devtools en Producción
    // const devTools = 
    //     process.env.NODE_ENV !== "production" ?
    //     applyMiddleware(...middlewares)
    //     : composeWithDevTools(applyMiddleware(...middlewares));

        

    // const store = createStore(
    //     reducers, 
    //     persistedState, 
        //composeEnhancers(devTools)
        //compose(applyMiddleware(...middleware), 
        // compose(devTools,
        //         window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__({
        //             actionSanitizer, 
        //             stateSanitizer: (state) => state.data ? { ...state, data: '<<LONG_BLOB>>' } : state
        //         })) 
    //);

    // const store = createStore(
    //     reducers,
    //     persistedState, // second argument overrides the initial state
    //     compose(applyMiddleware(...middlewares, thunk),
    //                             window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
    // );

    // add a listener that will be invoked on any state change
    store.subscribe(() => {
        saveState(store.getState());
    });

    // Update the initial theme
    updateTheme(store.getState())

    return store;

}