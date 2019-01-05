/**
 * Created by Charles on 03/01/2019.
 */
import React from 'react';
import {Button, FormGroup, FormControl, ControlLabel} from "react-bootstrap";
import API from '../../utils/API';

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
            <div className="Form">
                <FormGroup controlId="nemail" bsSize="large">
                    <ControlLabel>Nouvelle adresse email</ControlLabel>
                    <FormControl autoFocus type="email" value={this.state.nemail} onChange={this.handleChange}/>
                </FormGroup>
                <FormGroup controlId="password" bsSize="large">
                    <ControlLabel>Password</ControlLabel>
                    <FormControl value={this.state.password} onChange={this.handleChange} type="password"/>
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