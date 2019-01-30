/**
 * Created by Charles on 05/01/2019.
 */
/**
 * Created by Charles on 03/01/2019.
 */
import React from 'react';
import {Button, Form, FormGroup, FormControl, ControlLabel, Container, Row, Col, HelpBlock} from "react-bootstrap";
import API from '../../utils/API';
import {Link} from 'react-router-dom';
import {EnteteLogo} from '../EnteteLogo/EnteteLogo.js';
import {Footer} from '../Footer/Footer.js';

export class Forgotten extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange.bind(this);
        this.send.bind(this);
        this.state = {
            email: "",
            er:null
        };
    }

    send = event => {
        event.preventDefault();
        if (this.state.email.length === 0) {
            return;
        }
        var _send = {
            email: this.state.email
        };
        console.log(_send);
        let that = this;
        API.resetPassword(_send).then(function (data) {
            console.log(data.data);
            console.log("password reset");
            that.setState({
                er: "success"
            });
        }, function (error) {
            console.log(error);
            that.setState({
                er: "error"
            });
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
            <Container className="Form">
                <EnteteLogo/>
                <Row className="Form">
                    <form onSubmit={this.send}>
                    <Row>
                        <Col md={5} className= "colonne-centree">
                            <FormGroup controlId="email" bsSize="large" validationState={this.state.er}>
                                <Form.Label>Réinitialiser votre mot de passe</Form.Label>
                                <FormControl
                                    autoFocus
                                    type="email"
                                    value={this.state.email}
                                    onChange={this.handleChange}
                                    placeholder= "Veuillez saisir votre adresse email"
                                    />
                                    {this.state.er === 'error' &&
                                    <Form.Control.Feedback>L'adresse email que vous avez entré n'est pas présente dans nos fichiers. Veuillez vérifier et réessayer</Form.Control.Feedback>}
                                    {this.state.er === 'success' &&
                                    <Form.Control.Feedback>Votre mot de passe a été réinitialisé et il vous a été envoyé par mail</Form.Control.Feedback>}
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={2} className= "colonne-centree">
                            <Button
                                block
                                bsSize="large"
                                variant="primary"
                                type="submit"
                                className="buttonEnv"
                            >
                                VALIDER
                            </Button>
                        </Col>
                    </Row>
                    </form>
                </Row>
                <Row className= "centrer">
                    <Link to={"/"} >Retour à la connexion</Link>
                </Row>
                <Footer page="LOGIN"/>
            </Container>
        )
    }
}