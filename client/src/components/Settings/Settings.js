/**
 * Created by Charles on 03/01/2019.
 */
import React from 'react';
import {Button, FormGroup, FormControl, ControlLabel, Grid, Row, Col} from "react-bootstrap";
import API from '../../utils/API';
import {Link} from 'react-router-dom';
import {Menu} from '../Menu/Menu.js';
import {Header} from '../Header/Header.js';

export class Settings extends React.Component {
    constructor(props) {
        super(props);

    }


    render() {
        return (
            <Grid className="Form">
                <Row>
                    <Menu/>
                    <Col md={8} mdOffset={1}>
                        <Header page="PROFIL"/>
                        <Row>
                            <h2>Informations</h2>
                            <span>Mail :</span>
                            <br/>
                            <span>{localStorage.id}</span>
                            <br/>
                            <Link to={"/settings/mail"}>Modifier votre adresse mail</Link>
                            <br/>
                            <Link to={"/settings/password"}>Modifier votre mot de passe</Link>
                        </Row>
                        <Row>
                            <Link to={"/settings/apply"}>
                                Passer en compte entreprise
                            </Link>
                        </Row>
                    </Col>
                </Row>
            </Grid>
        )
    }
}