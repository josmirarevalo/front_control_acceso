import React, {useEffect, useState} from 'react';
import {Tree} from 'primereact/tree';
import { Container, Card, Row, Col} from 'reactstrap';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { MenuListAction } from '../../../store/actions/Menu.actions';
import ContentWrapper from '../../Layout/ContentWrapper';

// Variables de Ambiente
require('dotenv').config();

export default function Menu() {

    const [selectedNodeKey, setSelectedNodeKey] = useState(null);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(MenuListAction(2));
    }, [dispatch]);

    const onSelectionTreeChange = (e)=>{
        setSelectedNodeKey(e.value);
    }

    const onSelectionChange = (e)=>{
        //alert('selection Change funciona');
    }

    const onSelectionBlur = (e)=>{
        //alert('selection Blur funciona');
    }

    let MenuList  = useSelector(state=>state.Menu.menues_config);
    let RolesList = useSelector(state=>state.EntityMd.rolesList);
    const error  = useSelector(state=>state.Menu.error);

    return (
        <ContentWrapper>
            <div className="content-heading">
                   <div>Configuración de Menu
                      <small>Configurar opciones de Menu</small>
                   </div>
            </div>
            <Container className="bg-white">
                <Row> 
                    <Col sm={5}>
                        <Card className="card-default mb-3">
                            <Tree value={MenuList} 
                                selectionMode="single"
                                onSelectionChange={e=>onSelectionTreeChange(e)}       
                            />
                        </Card>
                    </Col> 
                    {/* <Col sm={7}>
                        <Card className="card-default mb-3">
                            <CardHeader><h4>Edición de Menú</h4></CardHeader>
                            <CardBody>
                                 <MenuForm id={selectedNodeKey} />
                            </CardBody>
                        </Card>
                    </Col> */}
                </Row>
            </Container>
        </ContentWrapper>
    )
}
