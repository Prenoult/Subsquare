import React from 'react';
import {Link} from 'react-router-dom';
import {Button, Form, Container, Row, Col} from "react-bootstrap";
import {EnteteLogo} from '../EnteteLogo/EnteteLogo.js'
import API from '../../utils/API';

export class Login extends React.Component {
    constructor(props) {
        super(props);
        //console.log(window.location);
        //this.signup = window.location.origin+"/signup";
        this.state = {
            email: "",
            password: "",
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
        if (this.state.password.length === 0) {
            return;
        }
        let that = this;
        API.login(this.state.email, this.state.password).then(function (data) {
            localStorage.setItem('token', data.data.token);
            localStorage.setItem('id', data.data.id);
            localStorage.setItem('firstname', data.data.firstname);
            localStorage.setItem('nomC', data.data.nomC);
            localStorage.setItem("account", data.data.company);
            window.location = "/dashboard"
        }, function (error) {
            that.setState({
                error: "error"
            });
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
                    <Col xs={7} sm={6} md={4} lg={3} className="colonne-centree">
                        <Form onSubmit={this.send}>
                            <Row>
                                <Col>
                                    <Form.Group controlId="email" size="lg">
                                        <Form.Control
                                            autoFocus type="email"
                                            value={this.state.email}
                                            onChange={this.handleChange}
                                            placeholder="Email"
                                            isInvalid={this.state.error == 'error'}
                                        />
                                        <Form.Control.Feedback type="invalid">Le nom d'utilisateur et le mot de passe
                                            que
                                            vous avez entrés ne correspondent pas à ceux présents dans nos fichiers.
                                            Veuillez vérifier et réessayer</Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group controlId="password" size="lg">
                                        <Form.Control
                                            value={this.state.password}
                                            onChange={this.handleChange}
                                            type="password"
                                            placeholder="Mot de passe"
                                            isInvalid={this.state.error == 'error'}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={8} className="colonne-centree">
                                    <Button
                                        block
                                        size="md"
                                        type="submit"
                                        className="buttonEnv"
                                    >
                                        CONNEXION
                                    </Button>
                                </Col>
                            </Row>
                            <Row>
                                <Col className="colonne-centree">
                                    <Link to={"/signup"}>Vous ne possedez pas de compte ?</Link>
                                    <br/>
                                    <Link to={"/forgotten"}>Mot de passe oublié ?</Link>
                                    <br/>
                                </Col>
                            </Row>
                        </Form>
                    </Col>
                </Row>
            </Container>
        )
    }
}