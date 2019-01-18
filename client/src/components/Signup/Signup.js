import React from 'react';
import {Link} from 'react-router-dom';
import {Button, FormGroup, FormControl, ControlLabel, HelpBlock, Grid, Row, Col} from "react-bootstrap";
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
        var _send = {
            email: this.state.email,
            password: this.state.password
        };
        API.signup(_send).then(function (data) {
            localStorage.setItem('token', data.data.token);
            localStorage.setItem('id', data.data.id);
            window.location = "/dashboard"
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
            <Grid className="Form">
                <EnteteLogo/>
                <Row>
                <form onSubmit={this.send}>
                    <Row>
                        <Col md={6} className="colonne-centree">
                            <FormGroup controlId="email" bsSize="large" validationState={this.state.vsEmail}>
                                <FormControl
                                    type="email"
                                    value={this.state.email}
                                    onChange={this.handleChange}
                                    onBlur={this.handleBlurEmail.bind(this)}
                                    placeholder="ADRESSE EMAIL"
                                    className="FormContLog"/>
                                {this.state.vsEmail === 'error' &&
                                <HelpBlock>Veuillez saisir une adresse email valide</HelpBlock>}
                                <FormControl.Feedback/>
                            </FormGroup>
                            <FormGroup controlId="password" bsSize="large" validationState={this.state.vsPassword}>
                                <FormControl
                                    value={this.state.password}
                                    onChange={this.handleChange}
                                    onBlur={this.handleBlurPassword.bind(this)}
                                    type="password"
                                    placeholder="MOT DE PASSE"
                                    className="FormContLog"/>
                                {this.state.vsPassword === 'error' &&
                                <HelpBlock>Votre mot de passe doit contenir au moins 8 caractères dont 1 majuscule, 1
                                    minuscule, 1 chiffre et 1 caractère spécial</HelpBlock>}
                                <FormControl.Feedback/>
                            </FormGroup>
                            <FormGroup controlId="cpassword" bsSize="large" validationState={this.state.vsCPassword}>
                                <FormControl
                                    value={this.state.cpassword}
                                    onChange={this.handleChange}
                                    onBlur={this.handleBlurCPassword.bind(this)}
                                    type="password"
                                    placeholder="CONFIRMER MOT DE PASSE"
                                    className="FormContLog"/>
                                {this.state.vsCPassword === 'error' &&
                                <HelpBlock>Les mots de passe doivent être identiques</HelpBlock>}
                                <FormControl.Feedback/>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={3} className="colonne-centree">
                            <Button
                                block
                                bsSize="large"
                                bsStyle="primary"
                                type="submit"
                                className="buttonEnv"
                            >
                                INSCRIPTION
                            </Button>
                        </Col>
                    </Row>
                </form>
                </Row>
                <Link to={"/"}>Vous possedez déjà un compte ?</Link>
            </Grid>
        )
    }
}