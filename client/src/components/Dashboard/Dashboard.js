import React from 'react';
import {Container, Row, Col, Image} from "react-bootstrap";
import {Menu} from '../Menu/Menu.js';
import {Header} from '../Header/Header.js';

export class Dashboard extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Container className="Dashboard" fluid>
                <Row>
                    <Col xs={2}>
                        <Menu/>
                    </Col>
                    <Col xs={{span: 6, offset: 1}} sm={{span: 7, offset: 1}} md={{span: 8, offset: 1}}
                         lg={{span: 8, offset: 1}}>
                        <Header page="ACCUEIL"/>
                        <Row>
                            <Image src={require('../../img/accueilPhoto.PNG')}
                                   className="photoAccueil"/>
                        </Row>
                    </Col>
                </Row>
            </Container>
        )
    }
}