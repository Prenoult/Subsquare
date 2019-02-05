import React from 'react';
import {Button, Form, Container, Row, Col} from "react-bootstrap";
import API from '../../utils/API';
import {Menu} from '../Menu/Menu.js';
import {Header} from '../Header/Header.js';

export class SettingsPassword extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange.bind(this);
        this.send.bind(this);
        this.state = {
            password: "",
            npassword: "",
            cpassword: ""
        };
    }

    send = event => {
        if (this.state.npassword.length === 0 || this.state.npassword !== this.state.cpassword || this.state.password.length === 0) {
            return;
        }
        var _send = {
            email: localStorage.getItem("id"),
            npassword: this.state.npassword,
            password: this.state.password
        };
        console.log(_send);
        API.changePassword(_send).then(function (data) {
            console.log(data.data);
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
            <Container className="Form" fluid>
                <Row>
                    <Col md={{ span: 2, offset: 0 }}>
                        <Menu/>
                    </Col>
                    <Col md={{ span: 8, offset: 1 }}>
                        <Header page="PROFIL"/>
                        <Row>
                            <h2>
                                MODIFICATION MOT DE PASSE:
                            </h2>
                        </Row>
                        <Form>
                            <Row>
                            <Col md={6} className="colonne-centree">
                            <Form.Group controlId="password" size="lg">
                                <Form.Control 
                                    value={this.state.password} 
                                    onChange={this.handleChange} 
                                    type="password"
                                    placeholder= "Ancien mot de passe"/>
                            </Form.Group>
                            <Form.Group controlId="npassword" bsSize="large">
                                <Form.Control 
                                    value={this.state.npassword} 
                                    onChange={this.handleChange} 
                                    type="password"
                                    placeholder= "Nouveau mot de passe"/>
                            </Form.Group>
                            <Form.Group controlId="cpassword" bsSize="large">    
                                <Form.Control 
                                    value={this.state.cpassword} 
                                    onChange={this.handleChange} 
                                    type="password"
                                    placeholder= "Confirmation du nouveau mot de passe"/>
                            </Form.Group>
                            </Col>
                            </Row>
                            <Row>
                                <Col md={6} className="colonne-centree">
                                <Button
                                    onClick={this.send}
                                    block
                                    size="md"
                                    variant="primary"
                                    type="submit"
                                    className="buttonEnv"
                                >
                                    MODIFIER
                                </Button>
                                </Col>
                            </Row>
                        </Form>
                    </Col>
                </Row>
            </Container>
        )
    }
}