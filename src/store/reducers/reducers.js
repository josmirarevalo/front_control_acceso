import { combineReducers } from 'redux';

import settingsReducer from './settings.reducer';
import themesReducer from './themes.reducers';
import UsuarioReducer from './Usuario.reducer';
import MenuReducer from './Menu.reducer';


export default combineReducers({
    settings: settingsReducer,
    theme: themesReducer,
    Usuario: UsuarioReducer,
    Menu: MenuReducer,
});
