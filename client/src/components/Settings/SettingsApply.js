import React from 'react';
import {Button, Grid, Row, Col, Carousel, FormGroup, FormControl} from "react-bootstrap";
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
            <Grid>
                <Row>
                    <Menu/>
                    <Col md={8} mdOffset={1}>
                        <Header page="PROFIL"/>
                        <Row>
                            <h3>Veuillez remplir ce formulaire afin de demander un compte entreprise</h3>
                            <form onSubmit={this.send}>
                                <Row>
                                    <Col md={6} className= "colonne-centree">
                                        <FormGroup controlId="nom" bsSize="large">
                                            <FormControl 
                                                autoFocus 
                                                value={this.state.nom} 
                                                onChange={this.handleChange}
                                                placeholder= "NOM DE L'ENTREPRISE"
                                                className="FormContLog"/>
                                        </FormGroup>
                                        <FormGroup controlId="numSiret" bsSize="large">
                                            <FormControl 
                                                value={this.state.numSiret} 
                                                onChange={this.handleChange} 
                                                placeholder= "NUMERO DE SIRET"
                                                className="FormContLog"/>
                                        </FormGroup>
                                        <FormGroup controlId="numTel" bsSize="large">
                                            <FormControl 
                                                type="tel"
                                                value={this.state.numTel} 
                                                onChange={this.handleChange} 
                                                placeholder= "NUMERO DE TELEPHONE"
                                                className="FormContLog"/>
                                        </FormGroup>
                                        <FormGroup controlId="adresse" bsSize="large">
                                            <FormControl 
                                                value={this.state.adresse} 
                                                onChange={this.handleChange} 
                                                placeholder= "ADRESSE"
                                                className="FormContLog"/>
                                        </FormGroup>
                                        <FormGroup controlId="codePostal" bsSize="large">
                                            <FormControl 
                                                value={this.state.codePostal} 
                                                onChange={this.handleChange} 
                                                placeholder= "CODE POSTAL"
                                                className="FormContLog"/>
                                        </FormGroup>
                                        <FormGroup controlId="ville" bsSize="large">
                                            <FormControl 
                                                value={this.state.ville} 
                                                onChange={this.handleChange} 
                                                placeholder= "VILLE"
                                                className="FormContLog"/>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={3} className= "colonne-centree">
                                        <Button
                                            block
                                            bsSize="large"
                                            bsStyle="primary"
                                            type="submit"
                                            className="buttonEnv"
                                        >
                                            VALIDER
                                        </Button>
                                    </Col>
                                </Row>
                            </form>
                        </Row>
                    </Col>
                </Row>
            </Grid>
        )
    }
}