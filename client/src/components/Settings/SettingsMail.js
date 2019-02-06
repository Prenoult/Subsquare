import React from 'react';
import {Button, Form, Control, Container, Row, Col, Image} from "react-bootstrap";
import API from '../../utils/API';
import {Menu} from '../Menu/Menu.js';
import {Header} from '../Header/Header.js';

export class SettingsMail extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange.bind(this);
        this.send.bind(this);
        this.state = {
            email: "",
            nemail: "",
            password: ""
        };
    }

    send = event => {
        if (this.state.nemail.length === 0) {
            return;
        }
        var _send = {
            email: localStorage.getItem("id"),
            nemail: this.state.nemail,
            password: this.state.password
        };
        console.log(_send);
        API.changeEmail(_send).then(function (data) {
            console.log(data.data.id);
            localStorage.setItem("id", data.data.id);
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
                        <Col md={6}>
                            <Row>
                                <Col md={6} className="label">
                                    MODIFICATION D'ADRESSE MAIL:
                                </Col>
                            </Row>
                            <Row>
                                <Form.Group controlId="nemail" size="lg">
                                    <Form.Control
                                        autoFocus 
                                        type="email" 
                                        value={this.state.nemail}
                                        onChange={this.handleChange}
                                        placeholder= "NOUVELLE ADRESSE MAIL"/>
                                </Form.Group>
                                <Form.Group controlId="password" bsSize="large">
                                    <Form.Control 
                                        value={this.state.password} 
                                        onChange={this.handleChange} 
                                        type="password"
                                        placeholder= "MOT DE PASSE"/>
                                </Form.Group>
                                <Col md={3} className= "colonne-centree">
                                    <Button
                                        onClick={this.send}
                                        block
                                        size="lg"
                                        variant="primary"
                                        type="submit"
                                        className="buttonEnv"
                                    >
                                        MODIFIER
                                    </Button>
                                </Col>
                            </Row>
                        </Col>
                    </Col>
                </Row>
            </Container>
        )
    }
}