import React from 'react';
import {Button, Grid, Row, Col, Carousel} from "react-bootstrap";
import {Link} from 'react-router-dom';
import {Menu} from '../Menu/Menu.js';
import {Header} from '../Header/Header.js';

import API from '../../utils/API';

export class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.disconnect.bind(this);
    }

    disconnect = event => {
        API.logout();
        window.location = "/";
    };

    render() {
        return (
            <Grid className="Dashboard">
                <Row>
                    <Menu/>
                    <Col xs={6} sm={6} md={6} xsOffset={1} smOffset={1} mdOffset={1} lgOffset={1}>
                        <Header page="ACCUEIL"/>
                        <Row>
                        </Row>
                    </Col>
                </Row>
            </Grid>
        )
    }
}