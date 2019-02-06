import React from 'react';
import {Container, Row, Col, ListGroup, Button, Form} from "react-bootstrap";
import API from '../../utils/API';
import {Menu} from '../Menu/Menu.js';
import {Header} from '../Header/Header.js';

export class Explore extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            subscriptionIn: [],
            subscriptionNin: [],
            isCompany: localStorage.getItem('account')
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
                <Col><Row><Col md={{span: 1, offset: 0}}>{item.name}</Col><Col
                    md={{span: 1, offset: 1}}> {item.company}</Col> <Col md={{span: 1, offset: 1}}> {item.price}€
                    {
                        item.mensu === 'hebdo'
                            ? '/semaine'
                            : item.mensu === 'mensuel'
                            ? '/mois'
                            : item.mensu === 'trismestriel'
                                ? '/trismestre'
                                : item.mensu === 'semestriel'
                                    ? '/semestre' : item.mensu === 'annuel'
                                        ? '/année'
                                        : ''
                    }</Col><Col md={{span: 1, offset: 2}}>
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
                    }</Col><Col md={{span: 2, offset: 2}}> {item.engage} mois</Col></Row></Col>
                <Col md={2}>
                    {this.state.isCompany === 'false' &&
                    <Button variant="success" onClick={this.addSubscription.bind(this, item._id)}>Ajouter</Button>}
                </Col>
            </Row>
        </ListGroup.Item>);
        const listSubIn = this.state.subscriptionIn.map((item) => <ListGroup.Item
            key={item._id}>
            <Row>
                <Col><Row><Col md={{span: 1, offset: 0}}>{item.name}</Col><Col
                    md={{span: 1, offset: 1}}> {item.company}</Col> <Col md={{span: 1, offset: 1}}> {item.price}€
                    {
                        item.mensu === 'hebdo'
                            ? '/semaine'
                            : item.mensu === 'mensuel'
                            ? '/mois'
                            : item.mensu === 'trismestriel'
                                ? '/trismestre'
                                : item.mensu === 'semestriel'
                                    ? '/semestre' : item.mensu === 'annuel'
                                        ? '/année'
                                        : ''
                    }</Col><Col md={{span: 1, offset: 2}}>
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
                    }</Col><Col md={{span: 2, offset: 2}}> {item.engage} mois</Col></Row></Col>
                <Col md={2}>
                    {this.state.isCompany === 'false' &&
                    <Button variant="secondary" onClick={this.addSubscription.bind(this, item._id)}
                            disabled>Ajouté</Button>}
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
                        <Form>
                          <Form.Control type="text" placeholder="Rechercher" className="search" />
                        </Form>
                        <Row>
                            <Col xs={12} className="EnteteAbo">
                                <Row>
                                    <Col md={{span: 1, offset: 0}}>
                                        Abonnement
                                    </Col>
                                    <Col md={{span: 1, offset: 1}}>
                                        Compagnie
                                    </Col>
                                    <Col md={{span: 1, offset: 1}}>
                                        Prix
                                    </Col>
                                    <Col md={{span: 1, offset: 1}}>
                                        Catégorie
                                    </Col>
                                    <Col md={{span: 1, offset: 1}}>
                                        Engagement
                                    </Col>
                                </Row>
                            </Col>
                            <Col>
                                <ListGroup className="list">
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

