import React from 'react';
import {Link} from 'react-router-dom';
import {Button, Form, Container, Row, Col} from "react-bootstrap";
import {EnteteLogo} from '../EnteteLogo/EnteteLogo.js'
import API from '../../utils/API';

export class Signup extends React.Component {
    constructor(props) {
        super(props);
        //this.login=window.location.origin;
        this.state = {
            email: "",
            password: "",
            cpassword: "",
            vsEmail: null,
            vsPassword: null,
            vsCPassword: null,
            error: null,
        };
        this.handleChange.bind(this);
        this.send.bind(this);
    }

    send = event => {
        event.preventDefault();
        if (this.state.email.length === 0) {
            return;
        }
        if (this.state.password.length === 0 || this.state.password !== this.state.cpassword) {
            return;
        }
        let that = this;
        var _send = {
            email: this.state.email,
            password: this.state.password
        };
        API.signup(_send).then(function (data) {
            if (data.status === 200) {
                localStorage.setItem('token', data.data.token);
                localStorage.setItem('id', data.data.id);
                localStorage.setItem('firstname', data.data.firstname);
                localStorage.setItem('nomC', data.data.nomC);
                localStorage.setItem("account", data.data.company);
                window.location = "/dashboard"
            } else {
                if (data.status === 204) {
                    //erreur adresse mail deja utilisée
                    that.setState({
                        error: "error"
                    });
                    console.log("adresse deja utilisée");
                } else {
                    // Autre erreur
                }
            }

        }, function (error) {
            console.log(error);
            return;
        });
        console.log("45");
    };

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    };

    handleBlurEmail() {
        if (Signup._validateEmail(this.state.email) === false) {
            this.setState({
                vsEmail: "error"
            })
        } else {
            this.setState({
                vsEmail: "success"
            })
        }
    };

    handleBlurPassword() {
        if (Signup._validatePassword(this.state.password) === false) {
            this.setState({
                vsPassword: "error"
            })
        } else {
            this.setState({
                vsPassword: "success"
            })
        }
    }

    handleBlurCPassword() {
        if (Signup._matchPasswords(this.state.password, this.state.cpassword) === false) {
            this.setState({
                vsCPassword: "error"
            })
        } else {
            this.setState({
                vsCPassword: "success"
            })
        }
    }

    static _validateEmail(email) {
        let regExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regExp.test(String(email).toLowerCase());
    }

    static _validatePassword(password) {
        let regExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,10}$/;
        return regExp.test(String(password));
    }

    static _matchPasswords(password1, password2) {
        if (password1 === '') {
            return false
        }
        return password1 === password2
    }

    render() {
        return (
            <Container className="Form" fluid>
                <EnteteLogo/>
                    <Row className="Form">
                        <Col xs={7} sm={6} md={4} lg={3} className="colonne-centree">
                        <Form onSubmit={this.send}>
                            <Row>
                                <Col>
                                    <Form.Group controlId="email" size="lg">
                                        <Form.Control
                                            type="email"
                                            value={this.state.email}
                                            onChange={this.handleChange}
                                            onBlur={this.handleBlurEmail.bind(this)}
                                            placeholder="Email"
                                            isInvalid={this.state.error === 'error'}
                                        />
                                        <Form.Control.Feedback type="invalid">L'adresse mail que vous avez entrée correspond déjà à un
                                            compte. Veuillez
                                            vérifier et réessayer</Form.Control.Feedback>
                                        <Form.Control.Feedback/>
                                    </Form.Group>
                                    <Form.Group controlId="password" size="lg">
                                        <Form.Control
                                            value={this.state.password}
                                            onChange={this.handleChange}
                                            onBlur={this.handleBlurPassword.bind(this)}
                                            type="password"
                                            placeholder="Mot de passe"
                                            isInvalid={this.state.vsPassword === 'error'}
                                        />
                                        <Form.Control.Feedback type="invalid">Votre mot de passe doit contenir au moins 8 caractères
                                            dont 1
                                            majuscule, 1
                                            minuscule, 1 chiffre et 1 caractère spécial</Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group controlId="cpassword" size="lg">
                                        <Form.Control
                                            value={this.state.cpassword}
                                            onChange={this.handleChange}
                                            onBlur={this.handleBlurCPassword.bind(this)}
                                            type="password"
                                            placeholder="Confirmer mot de passe"
                                            isInvalid={this.state.vsCPassword === 'error'}
                                        />
                                        <Form.Control.Feedback type="invalid">Les mots de passe doivent être
                                            identiques</Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={8} className="colonne-centree">
                                    <Button
                                        block
                                        size="md"
                                        variant="primary"
                                        type="submit"
                                        className="buttonEnv"
                                    >
                                        INSCRIPTION
                                    </Button>
                                    <Link to={"/"}>Vous possedez déjà un compte ?</Link>
                                </Col>
                            </Row>
                        </Form>
                        </Col>
                    </Row>
            </Container>
        )
    }
}