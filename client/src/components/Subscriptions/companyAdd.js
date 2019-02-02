import React from 'react';
import {Button, Form, Container, Row, Col} from "react-bootstrap";
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
            <Container fluid>
                <Row>
                    <Col md={{ span: 2, offset: 0 }}>
                        <Menu/>
                    </Col>
                    <Col md={{ span: 8, offset: 1 }}>
                        <Header page="ABONNEMENTS"/>
                        <Row>
                            <h3>Créer un Abonnement</h3>
                            <Col md={6} className= "colonne-centree">
                                <Form>
                                    <Row>
                                        <Col className= "colonne-centree">
                                            <Form.Group controlId="name" size="lg">
                                                <Form.Control
                                                    autoFocus type="text"
                                                    value={this.state.name}
                                                    onChange={this.handleChange}
                                                    placeholder= "Nom de l'abonnement"
                                                    />
                                            </Form.Group>
                                            <Form.Group controlId="descri" size="lg">
                                                <Form.Control
                                                    value={this.state.descri}
                                                    onChange={this.handleChange}
                                                    type="text"
                                                    placeholder= "Description de l'abonnement"
                                                    />
                                            </Form.Group>
                                            <Form.Group controlId="category" size="lg">
                                                <Form.Control
                                                    as="select"
                                                    value={this.state.category}
                                                    onChange={this.handleChange}
                                                    type="text"
                                                    >
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
                                                </Form.Control>
                                            </Form.Group>
                                            <Form.Group controlId="price" size="lg">
                                                <Form.Control
                                                    value={this.state.price}
                                                    onChange={this.handleChange}
                                                    type="number"
                                                    placeholder= "Prix de l'abonnement"
                                                    />
                                            </Form.Group>
                                            <Form.Group controlId="mensu" size="lg">
                                                <Form.Control 
                                                    as="select" 
                                                    value={this.state.mensu}
                                                    onChange={this.handleChange}
                                                    type="text"
                                                    >
                                                        <option value="ren">Renouvellement...</option>
                                                        <option value="hebdo">Hebdomadaire</option>
                                                        <option value="mensuel">Mensuel</option>
                                                        <option value="trimestriel">Trimestriel</option>
                                                        <option value="semestriel">Semestriel</option>
                                                        <option value="annuel">Annuel</option>
                                                </Form.Control>
                                            </Form.Group>
                                            <Form.Group controlId="engage" size="lg">
                                                <Form.Control
                                                    value={this.state.engage}
                                                    onChange={this.handleChange}
                                                    type="number"
                                                    placeholder= "Période d'engagement en mois"
                                                    />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={3} className= "colonne-centree">
                                            <Button
                                                onClick={this.send}
                                                block
                                                size="lg"
                                                variant="primary"
                                                type="submit"
                                                className="buttonEnv"
                                            >
                                                CREER
                                            </Button>   
                                        </Col>
                                    </Row>
                                </Form>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        )
    }
}

