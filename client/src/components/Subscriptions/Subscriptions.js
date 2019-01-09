/**
 * Created by Charles on 08/01/2019.
 */
import React from 'react';
import {Button, FormGroup, FormControl, ControlLabel, Grid, Row, Col} from "react-bootstrap";
import API from '../../utils/API';
import {Link} from 'react-router-dom';
import {Menu} from '../Menu/Menu.js';
import {Header} from '../Header/Header.js';

export class Subscriptions extends React.Component {
    constructor(props) {
        super(props);

    }


    render() {
        return (
            <Grid className="Form">
                <Row>
                    <Menu/>
                    <Col md={8} mdOffset={1}>
                        <Header page="ABONNEMENTS"/>
                        <Row>
                            <h2>Abonnements</h2>
                            <Link to={"/Subscriptions"}>Ajouter un abonnement</Link>
                        </Row>
                    </Col>
                </Row>
            </Grid>
        )
    }
}