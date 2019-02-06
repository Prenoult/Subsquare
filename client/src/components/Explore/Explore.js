import React from 'react';
import {Container, Row, Col, ListGroup, Button} from "react-bootstrap";
import API from '../../utils/API';
import {Link} from 'react-router-dom';
import {Menu} from '../Menu/Menu.js';
import {Header} from '../Header/Header.js';

export class Explore extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            subscriptionIn: [],
            subscriptionNin: []
        };
    }

    componentDidMount() {
        this.getSubscriptions();
    }

    getSubscriptions() {
        let that = this;
        let _send = {
            email: localStorage.getItem("id")
        };
        API.allSubscriptions(_send).then(function (data) {
            console.log(data.data);
            that.setState({
                subscriptionIn: data.data.SubIn,
                subscriptionNin: data.data.SubNin
            });
        })
    }

    addSubscription(id) {
        let that = this;
        let _s = {
            id: id,
            email: localStorage.getItem("id")
        };
        API.addSubscription(_s).then(function (data) {
            if (data.status === 200) {
                console.log("succès");
                that.getSubscriptions()
            } else {
                console.log("erreur");
            }

        }, function (error) {
            console.log(error);
            return;
        })
    };

    render() {
        const listSubNin = this.state.subscriptionNin.map((item) => <ListGroup.Item
            key={item._id}>
            <Row>
                <Col md={10}>{item.name} {item.company} {item.price}€
                    {
                        item.mensu === 'hebdo'
                            ? '/semaine'
                            : item.mensu === 'mensuel'
                            ? '/mois'
                            : item.mensu === 'trismestriel'
                                ? '/trismestre'
                                : item.mensu === 'semestriel'
                                    ? '/semestre' : item.mensu === 'annuel'
                                        ? 'année'
                                        : ''
                    } {item.name}
                    {
                        item.category === 'musique'
                            ? ' Musique'
                            : item.category === 'actu'
                            ? ' Actualité'
                            : item.category === 'assurance'
                                ? ' Assurance'
                                : item.category === 'photo'
                                    ? ' Photo'
                                    : item.category === 'prod'
                                        ? ' Productivité'
                                        : item.category === 'vidéo'
                                            ? ' Vidéo'
                                            : item.category === 'shopping'
                                                ? ' Shopping'
                                                : item.category === 'stock'
                                                    ? ' Stockage'
                                                    : item.category === 'util'
                                                        ? ' Utilitaire'
                                                        : ' '
                    } {item.descri} {item.engage}</Col>
                <Col md={2}>
                    <Button variant="success" onClick={this.addSubscription.bind(this, item._id)}>Ajouter</Button>
                </Col>
            </Row>
        </ListGroup.Item>);
        const listSubIn = this.state.subscriptionIn.map((item) => <ListGroup.Item
            key={item._id}>
            <Row>
                <Col md={10}>{item.name} {item.company} {item.price}€
                    {
                        item.mensu === 'hebdo'
                            ? '/semaine'
                            : item.mensu === 'mensuel'
                            ? '/mois'
                            : item.mensu === 'trismestriel'
                                ? '/trismestre'
                                : item.mensu === 'semestriel'
                                    ? '/semestre' : item.mensu === 'annuel'
                                        ? 'année'
                                        : ''
                    } {item.name}
                    {
                        item.category === 'musique'
                            ? ' Musique'
                            : item.category === 'actu'
                            ? ' Actualité'
                            : item.category === 'assurance'
                                ? ' Assurance'
                                : item.category === 'photo'
                                    ? ' Photo'
                                    : item.category === 'prod'
                                        ? ' Productivité'
                                        : item.category === 'vidéo'
                                            ? ' Vidéo'
                                            : item.category === 'shopping'
                                                ? ' Shopping'
                                                : item.category === 'stock'
                                                    ? ' Stockage'
                                                    : item.category === 'util'
                                                        ? ' Utilitaire'
                                                        : ' '
                    } {item.descri} {item.engage}</Col>
                <Col md={2}>
                    <Button variant="secondary" onClick={this.addSubscription.bind(this, item._id)}
                            disabled>Ajouté</Button>
                </Col>
            </Row>
        </ListGroup.Item>);
        return (
            <Container className="Form" fluid>
                <Row>
                    <Col xs={2}>
                        <Menu/>
                    </Col>
                    <Col xs={{span: 6, offset: 1}} sm={{span: 7, offset: 1}} md={{span: 8, offset: 1}}
                         lg={{span: 8, offset: 1}}>
                        <Header page="EXPLORER"/>
                        <Row>
                            <Col>
                                <ListGroup>
                                    {listSubIn}
                                </ListGroup>
                                <ListGroup>
                                    {listSubNin}
                                </ListGroup>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        )
    }
}

