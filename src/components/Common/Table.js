import React from 'react';
import MaterialTable from 'material-table';
import Icons from '@material-ui/core/Icon';

export default function Table(props) {

    let filtering = true
    // if (props.applyOptions) {
    //     filtering = props.options.filtering ? true : false
    // }

    let options = {
        //actionsColumnIndex: -1,
        headerStyle: {
            //backgroundColor: '#fad732',
            backgroundColor: '#32dffa',
            color: '#000',           
            position: 'relative',
            zIndex: '0',
            fontSize: '100%',
            textAlign: 'center',
            padding: '10px 10px 10px 10px'
        },
        cellStyle: {
            textAlign: 'center'
        },
        //pageSize: 10,
        pageSize: props.pageSize,
        filtering,
        grouping: false,
        exportButton: false
    };
    
    const localization = {
        pagination: {
            labelDisplayedRows: '{from}-{to} de {count}',
            labelRowsPerPage: 'Registros por página:',
            labelRowsSelect: 'Registros',
            firstAriaLabel: 'Primero',
            firstTooltip: 'Primero',
            previousAriaLabel: 'Anterior',
            previousTooltip: 'Anterior',
            nextAriaLabel: 'Próximo',
            nextTooltip: 'Próximo',
            lastAriaLabel: 'Ultimo',
            lastTooltip: 'Ultimo',
        },
        toolbar: {
            nRowsSelected: '{0} registros(s) seleccionados',
            searchTooltip: 'Buscar',
            searchPlaceholder: 'Buscar'
        },
        header: {
            actions: 'Acciones'
        },
        body: {
            filterRow:{
                filterTooltip: 'Filtro'
            },
            addTooltip: 'Nuevo',
            deleteTooltip: 'Eliminar',
            editTooltip: 'Editar',
            editRow: {
                cancelTooltip: 'Cancelar',
                saveToolTip: 'Guardar',
                deleteText: 'Está seguro de eliminar el registro?'           
            },
            emptyDataSourceMessage: 'No se encontraron registros'
        },
        grouping: {
            placeholder: "Arrastre los encabezados aquí para agrupar por "
        }
    };

    if(props.applyOptions){
        options.exportButton = (props.options.exportButton!==undefined&&props.options.exportButton!==null?props.options.exportButton:true);
        options.grouping = (props.options.grouping!==undefined&&props.options.grouping!==null?props.options.grouping:false);        
        options.selection = (props.options.selection!==undefined&&props.options.selection!==null?props.options.selection:false);
        options.search = (props.options.search!==undefined&&props.options.search!==null?props.options.search:true);
        
        
        if(props.options.fixedColumns!==undefined&&props.options.fixedColumns!==null)
            options.fixedColumns = {
                left: (props.options.fixedColumns.left!==undefined&&props.options.fixedColumns.left!==null?props.options.fixedColumns.left:0),
                right: (props.options.fixedColumns.right!==undefined&&props.options.fixedColumns.right!==null?props.options.fixedColumns.right:0)
            }
    } 

    return (
        <MaterialTable
            Icons={Icons}
            title={props.titleTable}
            columns={props.columns}
            data={props.data}
            editable={props.editable}
            localization={localization}
            options={options}
            actions={props.actions}
            onSelectionChange={props.onSelectionChange}
        />
    )
}