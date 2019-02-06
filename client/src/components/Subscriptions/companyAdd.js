import React from 'react';
import {Button, Form, Container, Row, Col} from "react-bootstrap";
import API from '../../utils/API';
import {Menu} from '../Menu/Menu.js';
import {Header} from '../Header/Header.js';

export class companyAdd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            price: "",
            category: "",
            mensu: "",
            engage: "",
            descri: "",
            error: ""
        };
        this.handleChange.bind(this);
        this.send.bind(this);
    }

    send = event => {
        event.preventDefault();
        if (this.state.name.length === 0) {
            return;
        }
        if (this.state.price.length === 0) {
            return;
        }
        if (this.state.category.length === 0 || this.state.category === "cat") {
            this.setState({
                category: "cat"
            });
            return;
        }
        if (this.state.descri.length === 0) {
            return;
        }
        if (this.state.mensu.length === 0 || this.state.mensu === "ren") {
            this.setState({
                mensu: "ren"
            });
            return;
        }
        if (this.state.engage.length === 0) {
            return;
        }
        let that = this;

        let _send = {
            name: this.state.name,
            descri: this.state.descri,
            category: this.state.category,
            price: this.state.price,
            mensu: this.state.mensu,
            engage: this.state.engage,
            user: localStorage.getItem("id")
        };
        API.createSub(_send).then(function (data) {
            if (data.status === 200) {
                console.log("abonnement ajouté");
                console.log(data);
                console.log(data.data.id);
                that.setState({
                    error: "send"
                });
            } else {
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

    render() {

        return (
            <Container fluid>
                <Row>
                    <Col xs={2}>
                        <Menu/>
                    </Col>
                    <Col xs={{span: 6, offset: 1}} sm={{span: 7, offset: 1}} md={{span: 8, offset: 1}}
                         lg={{span: 8, offset: 1}}>
                        <Header page="ABONNEMENTS"/>
                        <Row>
                            <Col xs={12}>
                                <h3>Créer un Abonnement</h3>
                            </Col>
                            <Col sm={9} md={8} lg={6} className="colonne-centree">
                                <Form onSubmit={this.send}>
                                    <Row>
                                        {this.state.error === 'send' &&
                                        <Col xs={12} style={{color: "green"}}>Votre abonnement a bien été ajouté</Col>}
                                        <Col className="colonne-centree">
                                            <Form.Group controlId="name" size="lg">
                                                <Form.Control
                                                    autoFocus type="text"
                                                    value={this.state.name}
                                                    onChange={this.handleChange}
                                                    placeholder="Nom de l'abonnement"
                                                />
                                            </Form.Group>
                                            <Form.Group controlId="descri" size="lg">
                                                <Form.Control
                                                    value={this.state.descri}
                                                    onChange={this.handleChange}
                                                    type="text"
                                                    placeholder="Description de l'abonnement"
                                                />
                                            </Form.Group>
                                            <Form.Group controlId="category" size="lg">
                                                <Form.Control
                                                    as="select"
                                                    value={this.state.category}
                                                    onChange={this.handleChange}
                                                    type="text"
                                                    isInvalid={this.state.category === "cat"}
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
                                                <Form.Control.Feedback type="invalid">Veuillez séléctionner une
                                                    catégorie</Form.Control.Feedback>
                                            </Form.Group>
                                            <Form.Group controlId="price" size="lg">
                                                <Form.Control
                                                    value={this.state.price}
                                                    onChange={this.handleChange}
                                                    type="number"
                                                    placeholder="Prix de l'abonnement"
                                                />
                                            </Form.Group>
                                            <Form.Group controlId="mensu" size="lg">
                                                <Form.Control
                                                    as="select"
                                                    value={this.state.mensu}
                                                    onChange={this.handleChange}
                                                    type="text"
                                                    isInvalid={this.state.mensu === 'ren'}
                                                >
                                                    <option value="ren">Renouvellement...</option>
                                                    <option value="hebdo">Hebdomadaire</option>
                                                    <option value="mensuel">Mensuel</option>
                                                    <option value="trimestriel">Trimestriel</option>
                                                    <option value="semestriel">Semestriel</option>
                                                    <option value="annuel">Annuel</option>
                                                </Form.Control>
                                                <Form.Control.Feedback type="invalid">Veuillez séléctionner une
                                                    période</Form.Control.Feedback>
                                            </Form.Group>
                                            <Form.Group controlId="engage" size="lg">
                                                <Form.Control
                                                    value={this.state.engage}
                                                    onChange={this.handleChange}
                                                    type="number"
                                                    placeholder="Période d'engagement en mois"
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={8} className="colonne-centree">
                                            <Button
                                                block
                                                variant="primary"
                                                type="submit"
                                                className="buttonEnv"
                                            >
                                                CRÉER
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

