/**
 * Created by Charles on 03/01/2019.
 */
import React from 'react';
import {Button, FormGroup, FormControl, ControlLabel} from "react-bootstrap";
import API from '../../utils/API';

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
            <div className="Form">
                <FormGroup controlId="password" bsSize="large">
                    <ControlLabel>Votre password</ControlLabel>
                    <FormControl value={this.state.password} onChange={this.handleChange} type="password"/>
                </FormGroup>
                <FormGroup controlId="npassword" bsSize="large">
                    <ControlLabel>Votre nouveau password</ControlLabel>
                    <FormControl value={this.state.npassword} onChange={this.handleChange} type="password"/>
                </FormGroup>
                <FormGroup controlId="cpassword" bsSize="large">
                    <ControlLabel>Confirmer le nouveau Password</ControlLabel>
                    <FormControl value={this.state.cpassword} onChange={this.handleChange} type="password"/>
                </FormGroup>
                <Button
                    onClick={this.send}
                    block
                    bsSize="large"
                    type="submit"
                >
                    Modifier
                </Button>
            </div>
        )
    }
}