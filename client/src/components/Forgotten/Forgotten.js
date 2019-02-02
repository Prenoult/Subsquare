import React from 'react';
import {Button, Form, Container, Row, Col} from "react-bootstrap";
import API from '../../utils/API';
import {Link} from 'react-router-dom';
import {EnteteLogo} from '../EnteteLogo/EnteteLogo.js';

export class Forgotten extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange.bind(this);
        this.send.bind(this);
        this.state = {
            email: "",
            er: null
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
            <Container className="Form" fluid>
                <EnteteLogo/>
                <Row className="Form">
                    <Col md={4} className="colonne-centree">
                        <Form onSubmit={this.send}>
                            <Row>
                                <Col>
                                    <Form.Group controlId="email" size="lg" className="colonne-centree label">
                                        <Form.Label>Réinitialiser votre mot de passe</Form.Label>
                                        <Form.Control
                                            autoFocus
                                            type="email"
                                            value={this.state.email}
                                            onChange={this.handleChange}
                                            placeholder="Veuillez saisir votre adresse email"
                                            isInvalid={this.state.er=='error'}
                                            isValid={this.state.er=='success'}
                                        />
                                        <Form.Control.Feedback type="invalid">L'adresse email que vous avez entré n'est pas présente
                                            dans nos fichiers. Veuillez vérifier et réessayer</Form.Control.Feedback>
                                        <Form.Control.Feedback type= "valid">Votre mot de passe a été réinitialisé et il vous a été
                                            envoyé par mail</Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col className="colonne-centree">
                                    <Button
                                        block
                                        size="md"
                                        variant="primary"
                                        type="submit"
                                        className="buttonEnv"
                                    >
                                        VALIDER
                                    </Button>
                                    <Link to={"/"}>Retour à la connexion</Link>
                                </Col>
                            </Row>
                        </Form>
                    </Col>
                </Row>
            </Container>
        )
    }
}