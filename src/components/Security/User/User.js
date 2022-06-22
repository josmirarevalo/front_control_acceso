import React from 'react';
import ContentWrapper from '../../Layout/ContentWrapper';
import { Row, Col } from 'reactstrap';

function User(){

    return (
        <ContentWrapper>
            <div className="content-heading">
                <div>Usuarios Registrados
                    <small>Configuración de Usuarios</small>
                </div>
            </div>
            <Row>
                <Col xs={12} className="text-center">
                    <h2 className="text-thin">Usuarios Registrados</h2>
                </Col>
            </Row>
        </ContentWrapper>
    )

}

export default User;