/**
 * Created by Charles on 08/01/2019.
 */
import React from 'react';
import {Button, FormGroup, FormControl, ControlLabel, Grid, Row, Col} from "react-bootstrap";
import API from '../../utils/API';
import {Link} from 'react-router-dom';
import {Menu} from '../Menu/Menu.js';
import {Header} from '../Header/Header.js';

export class companyAdd extends React.Component {
    constructor(props) {
        super(props);
        //this.login=window.location.origin;
        this.state = {
            name: "",
            price: "",
            mensu: "",
            engage: "",
            descri: ""
        };
        this.handleChange.bind(this);
        this.send.bind(this);
    }

    send = event => {
        if (this.state.name.length === 0) {
            return;
        }
        if (this.state.price.length === 0) {
            return;
        }
        if (this.state.descri.length === 0) {
            return;
        }
        if (this.state.mensu.length === 0) {
            return;
        }
        if (this.state.engage.length === 0) {
            return;
        }

        var _send = {
            name: this.state.name,
            descri: this.state.descri,
            price: this.state.price,
            mensu: this.state.mensu,
            engage: this.state.engage

        };
        console.log(_send);
        API.createSub(_send).then(function (data) {
            console.log("abonnement ajouté");
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



    //https://reactjs.org/docs/conditional-rendering.html

    render() {

        return (
            <Grid className="Form">
                <Row>
                    <Menu/>
                    <Col md={8} mdOffset={1}>
                        <Header page="ABONNEMENTS"/>
                        <Row>
                            <h2>creer Abonnements</h2>
                            <FormGroup controlId="name" bsSize="large">
                                <FormControl
                                    autoFocus type="text"
                                    value={this.state.name}
                                    onChange={this.handleChange}
                                    placeholder= "Nom de l'abonnement"
                                    className="FormContLog"/>
                            </FormGroup>
                            <FormGroup controlId="descri" bsSize="large">
                                <FormControl
                                    value={this.state.descri}
                                    onChange={this.handleChange}
                                    type="text"
                                    placeholder= "Description de l'abonnement"
                                    className="FormContLog"/>
                            </FormGroup>
                            <FormGroup controlId="price" bsSize="large">
                                <FormControl
                                    value={this.state.price}
                                    onChange={this.handleChange}
                                    type="text"
                                    placeholder= "Prix de l'abonnement"
                                    className="FormContLog"/>
                            </FormGroup>
                            <FormGroup controlId="mensu" bsSize="large">
                                <FormControl
                                    value={this.state.mensu}
                                    onChange={this.handleChange}
                                    type="text"
                                    placeholder= "Période de renouvellement"
                                    className="FormContLog"/>
                            </FormGroup>
                            <FormGroup controlId="engage" bsSize="large">
                                <FormControl
                                    value={this.state.engage}
                                    onChange={this.handleChange}
                                    type="text"
                                    placeholder= "Période d'engagement"
                                    className="FormContLog"/>
                            </FormGroup>
                            <Button
                                onClick={this.send}
                                block
                                bsSize="large"
                                bsStyle="primary"
                                type="submit"
                                className="buttonEnv"
                            >
                                Créer l'abonnement
                            </Button>
                        </Row>
                    </Col>
                </Row>
            </Grid>
        )
    }
}

