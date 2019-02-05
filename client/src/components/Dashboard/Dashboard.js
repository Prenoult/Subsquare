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
                    <Col xs={2} sm={2} md={2} lg={2}>
                        <Menu/>
                    </Col>
                    <Col xs={5} sm={6} md={7} lg={8}>
                        <Header page="ACCUEIL"/>
                        <Row>
                        </Row>
                    </Col>
                </Row>
            </Container>
        )
    }
}