import React from 'react';
import {Link} from 'react-router-dom';
import {Button, FormGroup, FormControl, ControlLabel} from "react-bootstrap";
import API from '../../utils/API';

export class Login extends React.Component {
    constructor(props) {
        super(props);
        //console.log(window.location);
        //this.signup = window.location.origin+"/signup";
        this.state = {
            email: "",
            password: ""
        };
        this.handleChange.bind(this);
        this.send.bind(this);
    }

    send = event => {
        if (this.state.email.length === 0) {
            return;
        }
        if (this.state.password.length === 0) {
            return;
        }
        API.login(this.state.email, this.state.password).then(function (data) {
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
            <div className="Form">
                <FormGroup controlId="email" bsSize="large">
                    <ControlLabel>Email</ControlLabel>
                    <FormControl autoFocus type="email" value={this.state.email} onChange={this.handleChange}/>
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
                    Connexion
                </Button>
                <Link to={"/signup"}>Vous ne possedez pas de compte ?</Link>
                <br/>
                <Link to={"/forgotten"}>Mot de passe oublié ?</Link>
            </div>
        )
    }
}