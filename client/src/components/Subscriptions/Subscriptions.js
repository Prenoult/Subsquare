import React from 'react';
import {Container, Row, Col, ListGroup, Button, Image} from "react-bootstrap";
import API from '../../utils/API';
import {Link} from 'react-router-dom';
import {Menu} from '../Menu/Menu.js';
import {Header} from '../Header/Header.js';

export class Subscriptions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            subscriptions: [],
            isCompany: localStorage.getItem('account')
        };
    }

    componentDidMount() {
        this.getSubscription();
        console.log(this.state.isCompany)
    }

    getSubscription() {
        let that = this;
        let _send = {
            email: localStorage.getItem("id")
        };
        API.getSub(_send).then(function (data) {
            //console.log(data.data.dd);
            that.setState({
                subscriptions: data.data.dd
            }, () => console.log(that.state.subscriptions[0]));
        })
    }

    delSubscription(id) {
        let _s = {
            id: id,
            email: localStorage.getItem("id")
        };
        API.deleteSubscription(_s).then(function (data) {
            if (data.status === 200) {
                console.log("succès");
                window.location = "/subscriptions";
            } else {
                console.log("erreur");
            }

        }, function (error) {
            console.log(error);
            return;
        })
    };

    render() {
        const listItems = this.state.subscriptions.map((item) => <ListGroup.Item
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
                                        ? '/année'
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
                    {this.state.isCompany === 'false' &&
                    <Button variant="danger" onClick={this.delSubscription.bind(this, item._id)}>Supprimer</Button>

                    }
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
                        <Header page="ABONNEMENTS"/>
                        <Row className="headerRight">
                            {this.state.isCompany === 'true'
                                ? 
                                <Link to={"/Company/add"}>
                                    <Button
                                        block
                                        size="lg"
                                        variant="primary"
                                        type="submit"
                                        className="buttonAjout"
                                    >
                                        Créer un abonnement
                                    </Button>
                                </Link>
                                : <Link to={"/user/add"}>
                                    <Button
                                            block
                                            size="lg"
                                            variant="primary"
                                            type="submit"
                                            className="buttonAjout"
                                        >
                                            Ajouter un abonnement
                                    </Button>
                                
                                </Link>}
                        </Row>
                        <Row> {this.state.subscriptions.length > 0
                            ? <Col>
                                <ListGroup className="list">
                                    {listItems}
                                </ListGroup>
                            </Col>
                            : <Col md={{span: 6, offset: 4}}>Oups! Votre liste d'abonnement semble être vide…</Col>}
                        </Row>
                    </Col>
                </Row>
            </Container>
        )
    }
}