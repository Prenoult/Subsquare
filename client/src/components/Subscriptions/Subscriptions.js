import React from 'react';
import {Container, Row, Col, ListGroup, Button} from "react-bootstrap";
import API from '../../utils/API';
import {Link} from 'react-router-dom';
import {Menu} from '../Menu/Menu.js';
import {Header} from '../Header/Header.js';

export class Subscriptions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            subscription: [],
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
                subscription: data.data.dd
            }, () => console.log(that.state.subscription[0]));
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

    /** CompanyAccount(props) {
        return (
            <Link to={"/Company/add"}>Ajouter un abonnement</Link>
        )
    }

     UserAccount(props) {
        return <Link to={"/user/add"}>Ajouter un abonnement</Link>
    }

     Account(props) {
        if (window.localStorage.getItem("account")) {
            if (window.localStorage.getItem("account") == "true") {
                return <CompanyAccount />;
            } else {
                return <UserAccount />;
            }
        } else {
            console.log("Pas censée arriver");
            //return <UserAccount />;
        }


    }*/


    //https://reactjs.org/docs/conditional-rendering.html


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
                                ? <Link to={"/Company/add"}>Créer un abonnement</Link>
                                : <Link to={"/user/add"}>Ajouter un abonnement</Link>}
                        </Row>
                        <Row>
                            <Col>
                                <ListGroup className="list">
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