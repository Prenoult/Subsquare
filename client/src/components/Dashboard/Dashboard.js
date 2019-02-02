import React from 'react';
import {Container, Row, Col} from "react-bootstrap";
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
                    <Col md={{ span: 2, offset: 0 }}>
                        <Menu/>
                    </Col>
                    <Col md={{ span: 8, offset: 1 }}>
                        <Header page="ACCUEIL"/>
                        <Row>
                        </Row>
                    </Col>
                </Row>
            </Container>
        )
    }
}