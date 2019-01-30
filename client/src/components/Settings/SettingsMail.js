/**
 * Created by Charles on 03/01/2019.
 */
import React from 'react';
import {Button, FormGroup, FormControl, ControlLabel, Container, Row, Col, Image} from "react-bootstrap";
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
            <Container className="Form">
                <Row>
                    <Menu/>
                    <Col md={8} mdOffset={1}>
                        <Header page="PROFIL"/>
                        <Col md={6}>
                            <Row>
                                <Col md={6} className="label">
                                    MODIFICATION D'ADRESSE MAIL:
                                </Col>
                            </Row>
                            <Row>
                                <FormGroup controlId="nemail" bsSize="large">
                                    <FormControl
                                        autoFocus 
                                        type="email" 
                                        value={this.state.nemail}
                                        onChange={this.handleChange}
                                        placeholder= "NOUVELLE ADRESSE MAIL"/>
                                </FormGroup>
                                <FormGroup controlId="password" bsSize="large">
                                    <FormControl 
                                        value={this.state.password} 
                                        onChange={this.handleChange} 
                                        type="password"
                                        placeholder= "MOT DE PASSE"/>
                                </FormGroup>
                                <Col md={3} className= "colonne-centree">
                                    <Button
                                        onClick={this.send}
                                        block
                                        bsSize="large"
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