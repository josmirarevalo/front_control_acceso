import React from 'react';

export default function Footer(){
    const year = new Date().getFullYear()
    return (
        <div className="p-3 text-center">
            <span className="mr-2">&copy;</span>
            <span>{year}</span>
            <span className="mx-2"></span>           
            <br/>
            <span> <b> Control de Acceso </b></span>
        </div>
    )
}