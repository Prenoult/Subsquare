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
            category: "",
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
        if (this.state.category.length === 0 || this.state.category=="cat") {
            return;
        }
        if (this.state.descri.length === 0) {
            return;
        }
        if (this.state.mensu.length === 0 || this.state.mensu=="ren") {
            return;
        }
        if (this.state.engage.length === 0) {
            return;
        }

        var _send = {
            name: this.state.name,
            descri: this.state.descri,
            category: this.state.category,
            price: this.state.price,
            mensu: this.state.mensu,
            engage: this.state.engage,
            user: localStorage.getItem("id")
        };
        console.log(_send);
        API.createSub(_send).then(function (data) {
           if(data.status == 200){
               console.log("abonnement ajouté");
               console.log(data);
               console.log(data.data.id);
               //window.location = "/subscriptions"
           }else{
               console.log(data);
               console.log("une erreur est survenue");
           }

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
                            <h2>Créer un Abonnement</h2>
                            <Col md={6} className= "colonne-centree">
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
                                <FormGroup controlId="category" bsSize="large">
                                    <FormControl
                                        componentClass="select"
                                        value={this.state.category}
                                        onChange={this.handleChange}
                                        type="text"
                                        className="FormContLog">
                                            <option value="cat">Catégorie...</option>
                                            <option value="musique">Musique</option>
                                            <option value="actu">Actualité</option>
                                            <option value="assurance">Assurance</option>
                                            <option value="photo">Photo</option>
                                            <option value="prod">Productivité</option>
                                            <option value="vidéo">Vidéo</option>
                                            <option value="shopping">Shopping</option>
                                            <option value="stock">Stockage</option>
                                            <option value="util">Utilitaire</option>
                                    </FormControl>
                                </FormGroup>
                                <FormGroup controlId="price" bsSize="large">
                                    <FormControl
                                        value={this.state.price}
                                        onChange={this.handleChange}
                                        type="number"
                                        placeholder= "Prix de l'abonnement"
                                        className="FormContLog"/>
                                </FormGroup>
                                <FormGroup controlId="mensu" bsSize="large">
                                    <FormControl 
                                        componentClass="select" 
                                        value={this.state.mensu}
                                        onChange={this.handleChange}
                                        type="text"
                                        className="FormContLog">
                                            <option value="ren">Renouvellement...</option>
                                            <option value="mensuel">Mensuel</option>
                                            <option value="trimestriel">Trimestriel</option>
                                            <option value="semestriel">Semestriel</option>
                                            <option value="annuel">Annuel</option>
                                    </FormControl>
                                </FormGroup>
                                <FormGroup controlId="engage" bsSize="large">
                                    <FormControl
                                        value={this.state.engage}
                                        onChange={this.handleChange}
                                        type="number"
                                        placeholder= "Période d'engagement en mois"
                                        className="FormContLog"/>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={3} className= "colonne-centree">
                                <Button
                                    onClick={this.send}
                                    block
                                    bsSize="large"
                                    bsStyle="primary"
                                    type="submit"
                                    className="buttonEnv"
                                >
                                    CREER
                                </Button>   
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Grid>
        )
    }
}

