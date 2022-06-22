import React, {Fragment, useState, useEffect} from 'react';
import ContentWrapper from '../Layout/ContentWrapper';
import Table from '../Common/Table';
import UsuarioModal from './UsuarioModal';
import useFileHandlers from '../Hooks/useFileHandlers';
import Swal from 'sweetalert2'

// Redux
import { useDispatch, useSelector } from 'react-redux'; 
import { UserListAction, UserDeleteAction} from '../../store/actions/Usuario.actions';

export default function Usuario() {
    const columns = [                        
                        { title: 'Nombres', field: 'firstname'},  
                        { title: 'Apellidos', field: 'lastname'},                 
                        { title: 'Correo Electrónico', field: 'email'},     
                        { title: 'Nombre de Usuario', field: 'username'},                        
                        { title: 'Estatus', field: 'active',
                          render : rowData => rowData.active == true ?
                                                 <div className="badge badge-success">Activo</div>:
                                                 <div className="badge badge-danger">Inactivo</div>
                        }
                        
                                     
                    ];
    const tableTitle = '';

    let tableTitleOrig = 'Detalle del Usuario';

    // Variables para manejo de Tabla
    const [modal, setModal] = useState(false);
    const [isNew, setIsNew] = useState(true);
    const [modalTitle, setModalTitle] = useState('Nuevo Usuario');
    
    // Variables de Usuarios
    const [userName, setUserName] = useState('');

    // Redux
    const dispatch = useDispatch();  

    useEffect( () => {
        // Llama el Action de Listado de Usuarios
        dispatch( UserListAction());       

    }, [dispatch]);
    
    // Obtiene los datos del Reducer
    const data  = useSelector( state => state.Usuario.users);   
    
    const {reInit} = useFileHandlers()
          
    const newData = ()=>{
        setUserName('');
        setModal(true);
        setIsNew(true);
        setModalTitle('Nuevo Usuario');       
    }
    const editData = (data)=>{
        setUserName(data.username);
        setModal(true);
        setIsNew(false);
        setModalTitle('Editar Usuario');        
    }
    const deleteData = (data)=>{
        // Metodo para confirmar la eliminación del Registro de Usuario Seleccionado...,       
        Swal
            .fire({
                title: "Eliminar Usuario: " + data.username,
                text: "¿Esta seguro de Eliminar el Registro Seleccionado?",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: "Eliminar",
                cancelButtonText: "Cancelar",
            })
            .then(resultado => {
                if (resultado.value) {
                    // Llama el Action de Eliminación de Usuario
                    dispatch( UserDeleteAction(data.id));
                    dispatch( UserListAction());    
                    //setRefresh(true);
                } 
                else {
                    // No se eliminará el registro
                    return;
                }
            });
    }
    
    // Método para abrir Modal de Editar o Incluir Registros.
    const toggleModal = () => {
        //reInit(); 
        //if(modal) setUserName('') ;
        setModal(!modal);
    }

    // Setea los valores de las acciones dentro del Datatable
    const actions=[
        {
            icon: 'add_circle',
            iconProps:{
                color: "primary"
            },
            tooltip: 'Nuevo',
            isFreeAction: true,
            onClick: (event) => newData()
        },
        {
            icon: 'edit',
            tooltip: 'Editar',
            onClick: (event, rowData) => editData(rowData)
        }, 
        {
            icon: 'delete',
            tooltip: 'Eliminar',
            onClick: (event, rowData) => deleteData(rowData)
        }   
    ];

    const applyOptions = false;

    return (
        <ContentWrapper>
            <div className="content-heading">
                <div>Usuarios
                    <small>Maestro de Usuarios</small>
                </div>
            </div>
            <Fragment>
                <Table
                    titleTable={tableTitle}
                    columns={columns}
                    data={data}
                    applyOptions={applyOptions}
                    actions={actions}
                    pageSize={5}
                />
                {(modal?
                    <UsuarioModal 
                        modal={modal}
                        toggleModal={toggleModal}
                        modalTitle={modalTitle}
                        isNew={isNew}                                
                        //id={id}
                        userName={userName}
                    />:null
                )}
            </Fragment>
        </ContentWrapper>
    )
}