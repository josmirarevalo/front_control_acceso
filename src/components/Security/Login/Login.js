import React from 'react';
import { Link } from 'react-router-dom';
import {Input} from 'reactstrap';
import Swal from 'sweetalert2';
import Footer from '../../Layout/Footer';
import { login } from '../../../config/AuthLogin';

import './login.css';

// Validaciones
import { withFormik, ErrorMessage } from 'formik';
import * as Yup from "yup";

require('dotenv').config();

export default function Login(props) {

    const dataForm = {username: '', passwordU: ''};
    let authenticated = false;

    const verifyLogin = (data)=>{

        const user = login(data);
        user.then(response=>{
            authenticated = sessionStorage.getItem(process.env.REACT_APP_IS_AUTHENTICATED); 
            if(authenticated) 
                props.history.push('/home');
            else               
                Swal.fire({
                    icon:'error',
                    title: 'Error en Login',
                    text: 'El Usuario / Contraseña es incorrecto, vuelva a intentar'
                });
        });
    }

    // Metodo para validar formulario de Login
    const formikValidation = withFormik({
        validationSchema: Yup.object().shape({
            username: Yup.string()
                .required("El usuario es requerido!")
                .max(20, 'Longitud maxima es 20 caracteres'),
            passwordU: Yup.string()
                .required('La contraseña es requerida!'),
        }),
        mapPropsToValues: propiedades => ({
          username: dataForm.username,
          passwordU: dataForm.passwordU
        }),
        handleSubmit: (values, { setSubmitting }) => {
          const payload = {
            ...values
          };
          setTimeout(() => {
             verifyLogin({
                 username:  payload.username,
                 passwordU: payload.passwordU,
             });
            setSubmitting(false);
          }, 1000);
        },
        displayName: "LoginForm"
    });

    const formData = propiedades => {
        const {
          values,
          touched,
          errors,
          handleChange,
          handleBlur,
          handleSubmit,
        } = propiedades;
        return (
            <div className="">
                {/* <div className="block-center mt-2 wd-xl"> */}
                <div className="block-center mt-2 wd-xl">
                    <div className="card card-flat">
                        <div className="card-header text-center">
                            <a href="">
                                <img className="block-center rounded" src="img/logo-base.png" width="80%" height="80%" alt="Logo"/>
                            </a>
                        </div>
                        <div className="card-body">
                            <p className="text-center py-2">Bienvenido al Sistema</p>
                            <form className="mb-3" name="formLogin" onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <div className="input-group with-focus">
                                        <Input type="text"
                                            name="username"
                                            className="border-right-0"
                                            placeholder="Ingrese Usuario"
                                            value={values.username}
                                            onChange={handleChange}
                                            onBlur={handleBlur} />
                                        <div className="input-group-append">
                                            <span className="input-group-text text-muted bg-transparent border-left-0">
                                                <em className="fa fa-envelope"></em>
                                            </span>
                                        </div>
                                        {!!errors.username && touched.username && (
                                            <div style={{ color: "red", marginTop: ".5rem" }}>
                                                <ErrorMessage name="username"/>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="input-group with-focus">
                                        <Input type="password"
                                            name="passwordU"
                                            className="border-right-0"
                                            placeholder="Ingrese Contraseña"
                                            value={values.passwordU}
                                            onChange={handleChange}
                                            onBlur={handleBlur} />
                                        <div className="input-group-append">
                                            <span className="input-group-text text-muted bg-transparent border-left-0">
                                                <em className="fa fa-lock"></em>
                                            </span>
                                        </div>
                                        {!!errors.passwordU && touched.passwordU && (
                                            <div style={{ color: "red", marginTop: ".5rem" }}>
                                                <ErrorMessage name="passwordU"/>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="clearfix">
                                </div>
                                <button className="btn btn-block btn-primary mt-3" type="submit">Entrar</button>
                            </form>
                        </div>
                    </div>
                    <Footer/>
                </div>
            </div>
        );
    };

    const Form = formikValidation(formData);

    return (
        <Form />
    );
}

