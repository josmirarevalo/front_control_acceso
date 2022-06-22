import React, {useEffect }  from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Row, Col,
         FormGroup, Input} from 'reactstrap';
import {messageSuccess, messageError} from '../../Utils/Utils';

import '../Common/fileinput.css';

// Redux Dispatch, Selector, y acciones.
import { useDispatch, useSelector } from 'react-redux';
import { UserGetAction, UserSaveAction} from '../../store/actions/Usuario.actions';

// Validaciones con Formik y Yup
import { withFormik, ErrorMessage, Field } from 'formik';
import * as Yup from "yup";

//import { comparePassword } from '../../../../back/server/utils/otherutils';
require('dotenv').config();

export default function UsuarioModal(props) {
  
   // let toggleModal = props.toggleModal;
       
    const initialState = {
        id: 0,       
        actived: true
    }   

    let active;
    
    if(props.isNew){
        active = true;
    } 
    
    // Variable de Formulario
    const dispatch = useDispatch();

    const saveData = (record)=>{ 
        dispatch (UserSaveAction(record, props.isNew));
        // Muestra mensaje al usuario.
        if(!error){
            messageSuccess(process.env.REACT_APP_MESSAGE_USER, (props.isNew?'C':'U'));
            props.toggleModal();
        }else{
            messageError(process.env.REACT_APP_MESSAGE_USER, (props.isNew?'C':'U'));
        }
    };

    const buscarImagen = ()=>{
        //Falta Programación....
    }; 

    useEffect( () => {
        //Llama el Action obtener la Información del Usuario      
        if (props.userName !=='')  {           
            dispatch( UserGetAction(props.userName));
        }
    }, [dispatch]);

    // Trae el objeto de Usuario
    let dataForm = useSelector( (state) => state.Usuario.user);    
    const error = useSelector(state=>state.Usuario.error);

    // Si el userName de Usuario es vacio es porque el usuario no ha seleccionado un registro de usuario
    if(props.userName ==='') dataForm = initialState;

    // Validación con Yup y Formik
    const formikValidation = withFormik({
        validationSchema: Yup.object().shape({
            username: Yup.string()               
                .required("Nombre de Usuario es Requerido")
                .max(20, 'Longitud maxima es 20 caracteres'),
            firstname: Yup.string()                
                .required("Nombres es Requerido")
                .max(100, 'Longitud maxima es 100 caracteres'),
            lastname: Yup.string()               
                .required("Apellidos es Requerido")
                .max(100, 'Longitud maxima es 100 caracteres'),
            email: Yup.string()                 
                .max(200, "Debe tener máximo 200 caracteres")                
                .email('Debe tener formato de correo'),
            password: Yup.string()               
                .required("Password es Requerido")
                .min(8,   'Longitud mínima es 8 caracteres')
                .max(100, 'Longitud maxima es 10 caracteres'),
        }),
        mapPropsToValues: propiedades => ({
          id:         dataForm.id,          
          username:   dataForm.username,
          firstname:  dataForm.firstname,
          lastname:   dataForm.lastname,
          email:      dataForm.email,
          password:   dataForm.password,
          active:     dataForm.active
        }),
        handleSubmit: (values, { setSubmitting }) => {
          const payload = {
            ...values
          };
          setTimeout(() => {

            let active     = payload.active == undefined ? false: true;

            saveData({
                id:         payload.id,
                username:   payload.username,
                firstname : payload.firstname,
                lastname :  payload.lastname,
                email :     payload.email,
                password :  payload.password,
                active :    active
            });
            setSubmitting(false);
          }, 1000);

        },
        displayName: "UsuarioForm"
    });

    const formData = propiedades => {
        const {
          values,
          touched,
          //dirty,
          errors,
          handleChange,
          handleBlur,
          handleSubmit,
          //handleReset,
          setFieldValue,
          setFieldTouched,
          //isSubmitting
        } = propiedades;
        return (
            <form
                className="form-horizontal"
                name="form"
                encType="multipart/form-data"
                onSubmit={handleSubmit}
            >
                <ModalBody>
                    <Row>
                        <Col sm="12">
                            <img width="175 rem" src="https://thumbs.dreamstime.com/z/avatar-an%C3%B3nimo-del-perfil-hombre-de-negocios-dise%C3%B1o-gr%C3%A1fico-aislado-ejemplo-vector-143627091.jpg"/>
                        </Col>
                        <Col sm="12">
                            <Button color="primary" onClick={buscarImagen()} size="lg">
                                Seleccionar Imagen
                            </Button>
                        </Col>
                    </Row>
                    <br></br>
                    <Row>
                        <Col sm="12">
                            <FormGroup>
                                <label className="text-bold">Nombre de Usuario(*)</label>
                                <Field
                                    type="text"
                                    className="form-control"
                                    name="username"
                                    placeholder="Nombre de Usuario"
                                    value={values.username}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {!!errors.username && touched.username && (
                                    <div style={{ color: 'red', marginTop: '.5rem' }}>
                                        <ErrorMessage name="username" />
                                    </div>
                                )}
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm="12">
                            <FormGroup>
                                <label className="text-bold">Password(*)</label>
                                <Field
                                    type="password"
                                    className="form-control"
                                    name="password"
                                    placeholder="Password"
                                    value={values.password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {!!errors.password && touched.password && (
                                    <div style={{ color: 'red', marginTop: '.5rem' }}>
                                        <ErrorMessage name="password" />
                                    </div>
                                )}
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm="12">
                            <FormGroup>
                                <label className="text-bold">Nombres(*)</label>
                                <Field
                                    type="text"
                                    className="form-control"
                                    name="firstname"
                                    placeholder="Nombres"
                                    value={values.firstname}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {!!errors.firstname && touched.firstname && (
                                    <div style={{ color: 'red', marginTop: '.5rem' }}>
                                        <ErrorMessage name="firstname"/>
                                    </div>
                                )}
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm="12">
                            <FormGroup>
                                <label className="text-bold">Apellidos(*)</label>
                                <Field
                                    type="text"
                                    className="form-control"
                                    name="lastname"
                                    placeholder="Apellidos"
                                    value={values.lastname}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {!!errors.lastname && touched.lastname && (
                                    <div style={{ color: 'red', marginTop: '.5rem' }}>
                                        <ErrorMessage name="lastname" />
                                    </div>
                                )}
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm="12">
                            <FormGroup>
                                <label className="text-bold">Correo Electrónico(*) </label>
                                <Field
                                    type="email"
                                    className="form-control"
                                    name="email"
                                    placeholder="Correo Electrónico"
                                    value={values.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {!!errors.email && touched.email && (
                                    <div style={{ color: 'red', marginTop: '.5rem' }}>
                                        <ErrorMessage name="email" />
                                    </div>
                                )}
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm="12">
                            <FormGroup>
                                <label className="text-bold">Activo</label>
                                <label className="switch">
                                    <Input
                                        type="checkbox"
                                        name="active"
                                        //value={values.active}
                                        value = {active}
                                        //defaultChecked={values.airplane_status}
                                        checked={values.active}
                                        onChange={handleChange}
                                        //onBlur={handleBlur}
                                    />
                                    <span></span>
                                </label>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm="12">
                            <p className="text-bold text-danger">(*) Campos requeridos</p>
                        </Col>
                    </Row>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" type="submit">
                        Guardar
                    </Button>{' '}
                    <Button color="primary" onClick={props.toggleModal}>
                        Cancelar
                    </Button>
                </ModalFooter>
            </form>
        );
    };

    const Form = formikValidation(formData);

    return (
        <Modal isOpen={props.modal} toggle={props.toggleModal} size="lg">           
            <ModalHeader toggle={props.toggleModal} className="bg-primary" >
                <div className="text-bold">{props.modalTitle}</div>
            </ModalHeader>
            {(props.id!==0 && dataForm)? <Form /> : null}
        </Modal>
    )
}