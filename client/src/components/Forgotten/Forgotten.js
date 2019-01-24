/**
 * Created by Charles on 05/01/2019.
 */
/**
 * Created by Charles on 03/01/2019.
 */
import React from 'react';
import {Button, FormGroup, FormControl, ControlLabel, Grid, Row, Col} from "react-bootstrap";
import API from '../../utils/API';
import {Link} from 'react-router-dom';
import {EnteteLogo} from '../EnteteLogo/EnteteLogo.js'

export class Forgotten extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange.bind(this);
        this.send.bind(this);
        this.state = {
            email: ""
        };
    }

    send = event => {
        event.preventDefault();
        if (this.state.email.length === 0) {
            return;
        }
        var _send = {
            email: this.state.email
        };
        console.log(_send);
        API.resetPassword(_send).then(function (data) {
            console.log(data.data);
            console.log("password reset");
            //window.location = "/dashboard"
        }, function (error) {
            console.log(error);
            return;
        })
        window.location = "/dashboard"


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
                        <Col md={7} className= "colonne-centree">
                            <FormGroup controlId="email" bsSize="large">
                                <ControlLabel className="label">Réinitialiser votre mot de passe</ControlLabel>
                                <FormControl 
                                    autoFocus 
                                    type="email" 
                                    value={this.state.email} 
                                    onChange={this.handleChange}
                                    placeholder= "Entrez votre adresse mail ici"
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
                                VALIDER
                            </Button>
                        </Col>
                    </Row>
                    </form>
                </Row>
            </Grid>
        )
    }
}