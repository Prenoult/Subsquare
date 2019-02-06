import React from 'react';
import {Container, Row, Col, ListGroup, Button} from "react-bootstrap";
import API from '../../utils/API';
import {Link} from 'react-router-dom';
import {Menu} from '../Menu/Menu.js';
import {Header} from '../Header/Header.js';

export class userAdd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            subscription: []
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
            that.setState({
                subscription: data.data.sub
            }, () => console.log(that.state.subscription[0]));
        })
    }

    addSubscription(id) {
        let _s = {
            id: id,
            email:localStorage.getItem("id")
        };
        API.addSubscription(_s).then(function (data) {
            if(data.status == 200){
               console.log("succes");
               //console.log(data.data);
                window.location = "/subscriptions";
            }else{
                console.log("erreur");
            }

        }, function (error) {
            console.log(error);
            return;
        })
    };

    render() {
        const listItems = this.state.subscription.map((item) => <ListGroup.Item
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
                    } {item.name} {item.category} {item.descri} {item.engage}</Col>
                <Col md={2}>
                    <Button variant="success" onClick={this.addSubscription.bind(this, item._id)}>Ajouter</Button>
                </Col>
            </Row>
        </ListGroup.Item>);
        return (
            <Container className="Form" fluid>
                <Row>
                    <Col xs={2}>
                        <Menu/>
                    </Col>
                    <Col xs={{ span: 6, offset: 1 }} sm={{ span: 7, offset: 1 }} md={{ span: 8, offset: 1 }} lg={{ span: 8, offset: 1 }}>
                        <Header page="ABONNEMENTS"/>
                        <Row>
                            <h2>Ajouter un Abonnement</h2>
                        </Row>
                        <Row>
                            <Col>
                                <ListGroup>
                                    {listItems}
                                </ListGroup>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        )
    }
}

