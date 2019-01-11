/**
 * Created by Charles on 03/01/2019.
 */
import React from 'react';
import {Button, FormGroup, FormControl, ControlLabel, Grid, Row, Col, Image} from "react-bootstrap";
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
            <Grid className="Form">
                <Row>
                    <Menu/>
                    <Col md={8} mdOffset={1}>
                        <Header page="PROFIL"/>
                        <Col md={6}>
                            <Row>
                                <Col md={6} className="label">
                                    MODIFICATION MOT DE PASSE:
                                </Col>
                            </Row>
                            <Row>
                                <FormGroup controlId="password" bsSize="large">
                                    <FormControl 
                                        value={this.state.password} 
                                        onChange={this.handleChange} 
                                        type="password"
                                        placeholder= "ANCIEN MOT DE PASSE"/>
                                </FormGroup>
                                <FormGroup controlId="npassword" bsSize="large">
                                    <FormControl 
                                        value={this.state.npassword} 
                                        onChange={this.handleChange} 
                                        type="password"
                                        placeholder= "NOUVEAU MOT DE PASSE"/>
                                </FormGroup>
                                <FormGroup controlId="cpassword" bsSize="large">    
                                    <FormControl 
                                        value={this.state.cpassword} 
                                        onChange={this.handleChange} 
                                        type="password"
                                        placeholder= "CONFIRMATION NOUVEAU MOT DE PASSE"/>
                                </FormGroup>
                                <Col md={3} className= "colonne-centree">
                                    <Button
                                        onClick={this.send}
                                        block
                                        bsSize="large"
                                        bsStyle="primary"
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
            </Grid>
        )
    }
}