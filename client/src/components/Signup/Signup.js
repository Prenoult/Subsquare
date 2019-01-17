import React from 'react';
import {Link} from 'react-router-dom';
import {Button, FormGroup, FormControl, ControlLabel, Grid, Row, Col} from "react-bootstrap";
import {EnteteLogo} from '../EnteteLogo/EnteteLogo.js'
import API from '../../utils/API';

export class Signup extends React.Component {
    constructor(props) {
        super(props);
        //this.login=window.location.origin;
        this.state = {
            email: "",
            password: "",
            cpassword: ""
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

    render() {
        return (
            <Grid className="Form">
                <EnteteLogo/>
                <Row>
                <form onSubmit={this.send}>
                    <Row>
                        <Col md={6} className= "colonne-centree">
                            <FormGroup controlId="email" bsSize="large">
                                <FormControl 
                                    autoFocus 
                                    type="email" 
                                    value={this.state.email} 
                                    onChange={this.handleChange}
                                    placeholder= "ADRESSE MAIL"
                                    className="FormContLog"/>
                            </FormGroup>
                            <FormGroup controlId="password" bsSize="large">
                                <FormControl
                                    value={this.state.password} 
                                    onChange={this.handleChange} 
                                    type="password"
                                    placeholder= "MOT DE PASSE"
                                    className="FormContLog"/>
                            </FormGroup>
                            <FormGroup controlId="cpassword" bsSize="large">
                                <FormControl 
                                    value={this.state.cpassword} 
                                    onChange={this.handleChange} 
                                    type="password"
                                    placeholder= "CONFIRMER MOT DE PASSE"
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