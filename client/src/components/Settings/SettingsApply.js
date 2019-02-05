import React from 'react';
import {Button, Container, Row, Col, Form} from "react-bootstrap";
import {Link} from 'react-router-dom';
import {Menu} from '../Menu/Menu.js';
import {Header} from '../Header/Header.js';

import API from '../../utils/API';

export class SettingsApply extends React.Component {
    constructor(props) {
        super(props);
        //console.log(window.location);
        //this.signup = window.location.origin+"/signup";
        this.state = {
            nom: "",
            numSiret: "",
            numTel:"",
            adresse:"",
            codePostal:"",
            ville:""
        };
        this.handleChange.bind(this);
        this.send.bind(this);
    }

    send = event => {
        event.preventDefault();
        if (this.state.nom.length === 0 || 
                this.state.numSiret.length === 0 ||
                this.state.numTel.length === 0 ||
                this.state.adresse.length === 0 ||
                this.state.codePostal.length === 0 ||
                this.state.ville.length === 0) {
            return;
        }
        var _send = {
            email: localStorage.id,
            nom: this.state.nom,
            numSiret: this.state.numSiret,
            numTel: this.state.numTel,
            adresse: this.state.adresse,
            codePostal: this.state.codePostal,
            ville: this.state.ville
        };
        API.applyCompany(_send).then(function () {
            console.log("email send");
            //window.location = "/dashboard"
        }, function (error) {
            console.log(error);
            return;
        })
    };
    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    };

    render() {
        return (
            <Container fluid>
                <Row>
                    <Col xs={2}>
                        <Menu/>
                    </Col>
                    <Col xs={{ span: 6, offset: 1 }} sm={{ span: 7, offset: 1 }} md={{ span: 8, offset: 1 }} lg={{ span: 8, offset: 1 }}>
                        <Header page="PROFIL"/>
                        <Row>
                            <h3>Veuillez remplir ce formulaire afin de demander un compte entreprise</h3>
                            <Col sm={9} md={8} lg={6} className= "colonne-centree">
                                <Form onSubmit={this.send}>
                                    <Row>
                                        <Col className= "colonne-centree">
                                            <Form.Group controlId="nom" size="lg">
                                                <Form.Control 
                                                    autoFocus 
                                                    value={this.state.nom} 
                                                    onChange={this.handleChange}
                                                    placeholder= "Nom de l'entreprise"
                                                    />
                                            </Form.Group>
                                            <Form.Group controlId="numSiret" size="lg">
                                                <Form.Control 
                                                    value={this.state.numSiret} 
                                                    onChange={this.handleChange} 
                                                    placeholder= "Numéro de SIRET"
                                                    />
                                            </Form.Group>
                                            <Form.Group controlId="numTel" size="lg">
                                                <Form.Control 
                                                    type="tel"
                                                    value={this.state.numTel} 
                                                    onChange={this.handleChange} 
                                                    placeholder= "Numéro de téléphone"
                                                    />
                                            </Form.Group>
                                            <Form.Group controlId="adresse" size="lg">
                                                <Form.Control 
                                                    value={this.state.adresse} 
                                                    onChange={this.handleChange} 
                                                    placeholder= "Adresse postale"
                                                    />
                                            </Form.Group>
                                            <Form.Group controlId="codePostal" size="lg">
                                                <Form.Control 
                                                    value={this.state.codePostal} 
                                                    onChange={this.handleChange} 
                                                    placeholder= "Code postal"
                                                    />
                                            </Form.Group>
                                            <Form.Group controlId="ville" size="lg">
                                                <Form.Control 
                                                    value={this.state.ville} 
                                                    onChange={this.handleChange} 
                                                    placeholder= "Ville"
                                                    />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className= "colonne-centree">
                                            <Button
                                                block
                                                size="md"
                                                variant="primary"
                                                type="submit"
                                                className="buttonEnv"
                                            >
                                                VALIDER
                                            </Button>
                                        </Col>
                                    </Row>
                                </Form>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        )
    }
}