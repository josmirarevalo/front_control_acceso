import Swal from 'sweetalert2'
import AxiosClient from '../config/AxiosClient'

const moment = require('moment');

require('dotenv').config();

// Mensaje de Exito por pantalla estandar para operaciones del Crear, Editar y Eliminar registros
export const messageSuccess = (entityName, typeMessage) => {
    let titleMessage = '';
    let bodyMessage = '';
    switch (typeMessage) {
        case 'C': // Crear registro
            titleMessage = `Crear ${entityName}`;
            bodyMessage = `${entityName} se ha creado correctamente`;
            break;
        case 'U': // Editar registro
            titleMessage = `Editar ${entityName}`;
            bodyMessage = `${entityName} se ha editado correctamente`;
            break;
        case 'D': // Eliminar registro
            titleMessage = `Eliminar ${entityName}`;
            bodyMessage = `${entityName} se ha eliminado correctamente`;
            break;
        default:
            break;
    }
    Swal.fire({
        icon: 'success',
        title: titleMessage,
        text: bodyMessage,
    });
};

// Mensaje de Error por pantalla estandar para operaciones del Crear, Editar y Eliminar registros
export const messageError = (entityName, typeMessage, msg = '') => {
    let titleMessage = '';
    let bodyMessage = '';
    switch (typeMessage) {
        case 'C': // Crear registro
            titleMessage = `Crear Usuario`;
            bodyMessage = `Error al tratar de crear Usuario`;
            break;
        case 'U': // Editar registro
            titleMessage = `Editar Usuario`;
            bodyMessage = `Error al tratar de actualizar Usuario`;
            break;
        case 'D': // Eliminar registro
            titleMessage = `Eliminar Usuario`;
            bodyMessage = `Error al tratar de eliminar Usuario`;
            break;
        case 'CUSTOM':
            titleMessage = `Error:`;
            bodyMessage = `${msg}`;
            break;
        default:
            titleMessage = `Error de Actualización`;
            bodyMessage = `No se pudo actualizar la información`;
            break;
    }
    Swal.fire({
        icon: 'error',
        title: titleMessage,
        text: bodyMessage,
    });
};

// Mensaje con titulo, texto, icono personalizado
export const messageText = (title, message, icon) => {
    Swal.fire({
        icon: icon,
        title: title,
        text: message,
    });
};


// Metodo para refrescar en Material-Table modificando el titulo de la tabla (truco)
export const setTrickyText = (textOrig, textMod) => {
    let text_returned = textOrig;
    if (textMod.substring(textMod.length - 1) !== ' ') text_returned = textMod + ' ';
    return text_returned;
};

// Metodo para formatear la fecha en MAterial Datatable
export const formatDate = (date) => {
    let dateReturn;
    if (date !== undefined && date !== null) {
        dateReturn = moment(date).format('DD-MM-YYYY');
    } else {
        dateReturn = '';
    }
    return dateReturn;
};

// Metodo para formatear la fecha/Hora en MAterial Datatable
export const formatDateTime = (date) => {
    let dateReturn;
    if (date !== undefined && date !== null) {
        dateReturn = moment(date).format('DD-MM-YYYY HH:MM:SS');
    } else {
        dateReturn = '';
    }
    return dateReturn;
};


export const formatTime = (date) => {
    let dateReturn;
    if (date !== undefined && date !== null) {
        dateReturn = moment(date).format('HH:mm:ss');
    } else {
        dateReturn = '';
    }
    return dateReturn;
};


// Metodo para eliminar registros duplicados de un Array
export const cleanArray = (arrayOriginal) => {
    const newArr = [];
    const myObj = {};
    arrayOriginal.forEach((el) => !(el in myObj) && (myObj[el] = true) && newArr.push(el));
    return newArr;
};
