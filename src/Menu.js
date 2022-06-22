const Menu = [
    {
        heading: 'CU',
        //translate: 'sidebar.heading.HEADER'
    },
    {
        name: 'Inicio de Página',
        path: 'singleview',
        icon : 'icon-home',
        //translate: 'sidebar.nav.HOME'
    },
    {
        name: 'Indices KPI',
        path: 'kpi',
        icon : 'icon-chart',
        //translate: 'sidebar.nav.KPI'
    },
    {
        name: 'Configuración',
        icon: 'icon-shield',
        translate: 'sidebar.nav.CONFIGURATION',
        submenu: [{
                name: 'Datos Maestros',
                path: '/masterdata',
                icon: '',
                //translate: 'sidebar.nav.MASTERDATA'
            },
            {
                name: 'Proveedores',
                path: '/partner',
                translate: 'sidebar.nav.PARTNER'
            },
            {
                name: 'Unidades de Medida',
                path: '/uom',
                translate: 'sidebar.nav.UOM'
            },
            {
                name: 'Parámetros de Evaluación de Proveedores',
                path: '/supplierevaluationparam',
                translate: 'sidebar.nav.UOM'
            },
            {
                name: 'Doc. Requeridos por Proceso',
                path: '/attachtype',
                translate: 'sidebar.nav.UOM'
            }
        ]
    },
    {
        name: 'Aeronaves',
        icon : 'icon-plane',
        translate: 'sidebar.nav.AIRPLANE',
        path: '/airplane',
        submenu: undefined
    },
    {
        name: 'Abastecimiento',
        icon : 'icon-shuffle',
        translate: 'sidebar.nav.SUPPLY',
        submenu: [{
            name: 'Almacén',
            path: '/warehouse',
            translate: 'sidebar.nav.WAREHOUSE'
        },
        {
            name: 'Inventario de Articulos',
            translate: 'sidebar.nav.INVENTORY',
            path: '/iteminventory'
        },
        {
            name: 'Solicitudes de Material',
            translate: 'sidebar.nav.MATERIAL_REQUEST',
            path: '/materialrequest'
        },
        {
            name: 'Pre-Incoming',
            translate: 'sidebar.nav.PREINCOMING',
            path: '/preincoming'
        },
        {
            name: 'Incoming',
            path: '/incoming',
            translate: 'sidebar.nav.INCOMMING',
            submenu: [{
                name: 'Test',
                path: '/test',
                translate: 'sidebar.nav.test'
            }]
        },
        ]
    },
    {
        name: 'Administración',
        icon : 'icon-layers',
        translate: 'sidebar.nav.SUPPLY',
        submenu: [{
            name: 'Aprobación de Pagos',
            path: '/warehouse',
            translate: 'sidebar.nav.WAREHOUSE'
        },
        {
            name: 'Emitir pagos',
            translate: 'sidebar.nav.INVENTORY',
            path: '/iteminventory'
        }]
    },
    {
        name: 'Compras',
        icon : 'icon-wallet',
        translate: 'sidebar.nav.PURCHASE',
        submenu: [{
                name: 'Requisiciones Compra',
                path: '/purchase_requirement',
                translate: 'sidebar.nav.PURCHASE_REQUIREMENT'
            },
            {
                name: 'Cotizaciones Proveedores',
                path: '/purchase_quotation',
                translate: 'sidebar.nav.PURCHASE_QUOTATION'
            },
            {
                name: 'Ordenes de Compra',
                path: '/purchase_order',
                translate: 'sidebar.nav.PURCHASE_ORDER'
            },
            {
                name: 'Aprobaciones OC',
                path: '/purchase_order',
                translate: 'sidebar.nav.PURCHASE_ORDER'
            },
            {
                name: 'Garantias y devoluciones',
                path: '/purchase_order',
                translate: 'sidebar.nav.PURCHASE_ORDER'
            },
            {
                name: 'Prestamos e Intercambios',
                path: '/purchase_order',
                translate: 'sidebar.nav.PURCHASE_ORDER'
            }
        ]
    },
    {
        name: 'Ingeniería',
        icon : 'icon-magnet',
        translate: 'sidebar.nav.ENGINEERING',
        path: 'engineering',
        submenu: [{
            name: 'Planificación',
            //icon : 'icon-calendar',
            translate: 'sidebar.nav.PLANNING',
            path: 'planning'
        },
        {
            name: 'Articulos',
            translate: 'sidebar.nav.COMPONENTS',
            path: '/itemmaster'
        },
        {
            name: 'Detalle de Articulos',
            translate: 'sidebar.nav.COMPONENTS',
            path: '/itemdetails'
        }]     
    },
    {
        name: 'Mantenimiento',
        icon : 'icon-wrench',
        translate: 'sidebar.nav.MAINTENANCE',
        submenu: [
            {
            name: 'Producción',
            translate: 'sidebar.nav.PRODUCTION',
            path: '/production'
        },]  
    },
    {
        name: 'Operaciones',
        icon : 'icon-globe',
        translate: 'sidebar.nav.OPERATIONS',
        submenu: [{
            name: 'Inspecciones',
            translate: 'sidebar.nav.INSPECTION',
            path: '/inspection'
        }, {
            name: 'Vuelos',
            translate: 'sidebar.nav.FLIGHT',
            path: '/flight'
        }]          
    },
    {
        name: 'Capital Humano',
        icon : 'icon-people',
        translate: 'sidebar.nav.PEOPLE',
        submenu: [
            {   
            name: 'Cargos',
            translate: 'sidebar.nav.CHARGE',
            path: '/charge'
            },
            {   
            name: 'Departamentos',
            translate: 'sidebar.nav.DEPARTMENT',
            path: '/department'
            },
            {
            name: 'Empleados',
            translate: 'sidebar.nav.EMPLOYEE',
            path: '/employee'
        }, {
            name: 'Venc. Licencias Personal',
            translate: 'sidebar.nav.PEOPLE_LICENSE',
            path: '/people_licence'
        }]        
    },
    {
        name: 'Seguridad',
        icon: 'icon-lock',
        translate: 'sidebar.nav.SECURITY',
        submenu: [{
                name: 'Resetear Contraseña',
                path: '/recover',
                translate: 'sidebar.nav.RESET_PASSWORD'
            },
            {
                name: 'Usuarios registrados',
                path: '/user',
                translate: 'sidebar.nav.USERS'
            }
        ]
    },
    {
        name: 'Reportes',
        icon: 'icon-docs',
        translate: 'sidebar.nav.REPORTS',
        submenu: [
            {
                name: 'Material en Almacén',
                path: '/report',
                translate: 'sidebar.nav.REPORT_INVENTORY'
            },
            {
                name: 'Material Despachado',
                path: '/report',
                translate: 'sidebar.nav.REPORT_INVENTORY'
            },
            {
                name: 'Inv. vencerse/vencido',
                path: '/report',
                translate: 'sidebar.nav.REPORT_INVENTORY'
            },
            {
                name: 'Inv. Valorizado',
                path: '/report',
                translate: 'sidebar.nav.REPORT_INVENTORY'
            },
            {
                name: 'Inv. Descartado',
                path: '/report',
                translate: 'sidebar.nav.REPORT_INVENTORY'
            },
            {
                name: 'Inv. Reparable',
                path: '/report',
                translate: 'sidebar.nav.REPORT_INVENTORY'
            },
        ]
    }
];

export default Menu;
