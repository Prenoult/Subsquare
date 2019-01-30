import React from 'react';
import {Link} from 'react-router-dom';
import {Button, Form, FormGroup, FormControl, ControlLabel, Container, Row, Col} from "react-bootstrap";
import {EnteteLogo} from '../EnteteLogo/EnteteLogo.js'
import API from '../../utils/API';
import {Footer} from '../Footer/Footer.js';

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
            localStorage.setItem("account",data.data.company);
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
            <Container className="Form">
                <EnteteLogo/>
                <Row className="Form">
                    <form onSubmit={this.send}>
                        <Row>
                            <Col className= "colonne-centree">
                                <FormGroup controlId="email" bsSize="large" validationState={this.state.error}>
                                    {this.state.error === 'error' &&
                                    <Form.Control.Feedback type="invalid">Le nom d'utilisateur et le mot de passe que vous avez entrés ne correspondent pas à ceux présents dans nos fichiers. Veuillez vérifier et réessayer</Form.Control.Feedback>}
                                    <FormControl
                                        autoFocus type="email"
                                        value={this.state.email}
                                        onChange={this.handleChange}
                                        placeholder= "Email"
                                        />
                                    </FormGroup>
                                <FormGroup controlId="password" bsSize="large" validationState={this.state.error}>
                                    <FormControl
                                        value={this.state.password}
                                        onChange={this.handleChange}
                                        type="password"
                                        placeholder= "Mot de passe"
                                        />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="colonne-centree">
                                <Button
                                    block
                                    bsSize="large"
                                    variant="primary"
                                    type="submit"
                                    className="buttonEnv"
                                >
                                    CONNEXION
                                </Button>
                                <Link to={"/signup"} >Vous ne possedez pas de compte ?</Link>
                                <br/>
                                <Link to={"/forgotten"}>Mot de passe oublié ?</Link>
                                <br/>
                            </Col>
                        </Row>
                    </form>
                    <Row className= "centrer">

                    </Row>
                </Row>
                <Footer page="LOGIN"/>
            </Container>
        )
    }
}