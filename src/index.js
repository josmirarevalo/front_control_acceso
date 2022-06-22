import 'core-js/es/string';
import 'core-js/es/array';
import 'core-js/es/map';
import 'core-js/es/set';
import 'core-js/es/object';
import 'core-js/es/promise';
import 'core-js/es/object';
import 'raf/polyfill';

import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

import React from 'react';
import ReactDOM from 'react-dom';
//import * as Sentry from "@sentry/react";
//import { Integrations } from "@sentry/tracing";
import { Provider } from 'react-redux';
import DateFnsUtils from '@date-io/date-fns';
import esLocale from "date-fns/locale/es";
//import enLocale from "date-fns/locale/en-US";
import { MuiPickersUtilsProvider } from '@material-ui/pickers';

import App from './App';
//import './config/config';

import './i18n';

import configureStore from './store/store';
const store = configureStore();

// Sentry.init({
//   dsn: "https://021b80616fdb4024a16cd2cd43c57d6d@o311842.ingest.sentry.io/5623705",
//   integrations: [new Integrations.BrowserTracing()],

//   // We recommend adjusting this value in production, or using tracesSampler
//   // for finer control
//   tracesSampleRate: 1.0,
// });

// 
// const localeMap = {
//     en: enLocale,
//     es: esLocale,
// };

// const [locale, setLocale] = useState("es");

ReactDOM.render(
    <Provider store={store}>
        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={esLocale}>
            <App />
        </MuiPickersUtilsProvider>
    </Provider>,
    document.getElementById('app')
);
