import React from 'react';
import {Container, Row, Col, ButtonGroup, Button, Badge} from "react-bootstrap";
import API from '../../utils/API';
import {Menu} from '../Menu/Menu.js';
import {Header} from '../Header/Header.js';

export class MyFinances extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            subscriptions: [],
            isCompany: localStorage.getItem('account'),
            price: 0,
            displayedPrice: 0,
            temp: 2
        };
    }

    componentDidMount() {
        this.getSubscription();
    }

    getSubscription() {
        let that = this;
        let _send = {
            email: localStorage.getItem("id")
        };
        API.getSub(_send).then(function (data) {
            let count = 0;
            data.data.dd.forEach(function (item) {
                switch (item.mensu) {
                    case "hebdo":
                        count += (parseFloat(item.price) * 4.34524);
                        break;
                    case "mensuel":
                        count += parseFloat(item.price);
                        break;
                    case "trimestriel":
                        count += (parseFloat(item.price) / 3);
                        break;
                    case "semestriel":
                        count += (parseFloat(item.price) / 6);
                        break;
                    case "annuel":
                        count += (parseFloat(item.price) / 12);
                        break;
                    default:
                        console.log('pas censé arriver')
                }
            });
            that.setState({
                subscriptions: data.data.dd,
                price: count,
                displayedPrice: count
            });
        })
    }

    getPriceWeek() {
        this.setState({
            temp: 1,
            displayedPrice: this.state.price / 4.34524
        })
    }

    getPriceMonth() {
        this.setState({
            temp: 2,
            displayedPrice: this.state.price
        })
    }

    getPriceTrimester() {
        this.setState({
            temp: 3,
            displayedPrice: this.state.price * 3
        })
    }

    getPriceSemester() {
        this.setState({
            temp: 4,
            displayedPrice: this.state.price * 6
        })
    }

    getPriceYear() {
        this.setState({
            temp: 5,
            displayedPrice: this.state.price * 12
        })
    }


    render() {
        return (
            <Container className="Form" fluid>
                <Row>
                    <Col xs={2}>
                        <Menu/>
                    </Col>
                    <Col xs={{span: 6, offset: 1}} sm={{span: 7, offset: 1}} md={{span: 8, offset: 1}}
                         lg={{span: 8, offset: 1}}>
                        <Header page="MES FINANCES"/>
                        <Row className="headerRight">
                        </Row>
                        <Row>
                            <Col md={{span: 7, offset: 3}}>
                                {this.state.temp === 1
                                    ? <ButtonGroup aria-label="Basic example">
                                        <Button variant="dark" onClick={this.getPriceWeek.bind(this)}>Semaine</Button>
                                        <Button variant="light" onClick={this.getPriceMonth.bind(this)}>Mois</Button>
                                        <Button variant="light"
                                                onClick={this.getPriceTrimester.bind(this)}>Trimestre</Button>
                                        <Button variant="light"
                                                onClick={this.getPriceSemester.bind(this)}>Semestre</Button>
                                        <Button variant="light" onClick={this.getPriceYear.bind(this)}>Annuel</Button>
                                    </ButtonGroup>
                                    : this.state.temp === 2
                                        ? <ButtonGroup aria-label="Basic example">
                                            <Button variant="light"
                                                    onClick={this.getPriceWeek.bind(this)}>Semaine</Button>
                                            <Button variant="dark" onClick={this.getPriceMonth.bind(this)}>Mois</Button>
                                            <Button variant="light"
                                                    onClick={this.getPriceTrimester.bind(this)}>Trimestre</Button>
                                            <Button variant="light"
                                                    onClick={this.getPriceSemester.bind(this)}>Semestre</Button>
                                            <Button variant="light"
                                                    onClick={this.getPriceYear.bind(this)}>Annuel</Button>
                                        </ButtonGroup>
                                        : this.state.temp === 3
                                            ? <ButtonGroup aria-label="Basic example">
                                                <Button variant="light"
                                                        onClick={this.getPriceWeek.bind(this)}>Semaine</Button>
                                                <Button variant="light"
                                                        onClick={this.getPriceMonth.bind(this)}>Mois</Button>
                                                <Button variant="dark"
                                                        onClick={this.getPriceTrimester.bind(this)}>Trimestre</Button>
                                                <Button variant="light"
                                                        onClick={this.getPriceSemester.bind(this)}>Semestre</Button>
                                                <Button variant="light"
                                                        onClick={this.getPriceYear.bind(this)}>Annuel</Button>
                                            </ButtonGroup>
                                            : this.state.temp === 4
                                                ? <ButtonGroup aria-label="Basic example">
                                                    <Button variant="light"
                                                            onClick={this.getPriceWeek.bind(this)}>Semaine</Button>
                                                    <Button variant="light"
                                                            onClick={this.getPriceMonth.bind(this)}>Mois</Button>
                                                    <Button variant="light"
                                                            onClick={this.getPriceTrimester.bind(this)}>Trimestre</Button>
                                                    <Button variant="dark"
                                                            onClick={this.getPriceSemester.bind(this)}>Semestre</Button>
                                                    <Button variant="light"
                                                            onClick={this.getPriceYear.bind(this)}>Annuel</Button>
                                                </ButtonGroup>
                                                : this.state.temp === 5
                                                    ? <ButtonGroup aria-label="Basic example">
                                                        <Button variant="light"
                                                                onClick={this.getPriceWeek.bind(this)}>Semaine</Button>
                                                        <Button variant="light"
                                                                onClick={this.getPriceMonth.bind(this)}>Mois</Button>
                                                        <Button variant="light"
                                                                onClick={this.getPriceTrimester.bind(this)}>Trimestre</Button>
                                                        <Button variant="light"
                                                                onClick={this.getPriceSemester.bind(this)}>Semestre</Button>
                                                        <Button variant="dark"
                                                                onClick={this.getPriceYear.bind(this)}>Annuel</Button>
                                                    </ButtonGroup>
                                                    : <ButtonGroup aria-label="Basic example">
                                                        <Button variant="light"
                                                                onClick={this.getPriceWeek.bind(this)}>Semaine</Button>
                                                        <Button variant="light"
                                                                onClick={this.getPriceMonth.bind(this)}>Mois</Button>
                                                        <Button variant="light"
                                                                onClick={this.getPriceTrimester.bind(this)}>Trimestre</Button>
                                                        <Button variant="light"
                                                                onClick={this.getPriceSemester.bind(this)}>Semestre</Button>
                                                        <Button variant="light"
                                                                onClick={this.getPriceYear.bind(this)}>Annuel</Button>
                                                    </ButtonGroup>}
                            </Col>
                        </Row>
                        {this.state.isCompany === 'false' ? <Row>
                                <Col md={{span: 8, offset: 2}}>
                                    <h1 className="titre">{"Vos dépenses sont de "}
                                        <Badge variant="dark">
                                            {this.state.displayedPrice} €
                                            {
                                                this.state.temp === 1
                                                    ? '/Semaine'
                                                    : this.state.temp === 2
                                                    ? '/Mois'
                                                    : this.state.temp === 3
                                                        ? '/Trimestre'
                                                        : this.state.temp === 4
                                                            ? '/Semestre'
                                                            : this.state.temp === 5
                                                                ? '/An'
                                                                : ''
                                            }
                                        </Badge>
                                    </h1>
                                </Col>
                            </Row>
                            : <Row>
                                <Col md={{span: 8, offset: 2}}>
                                    <h1 className="titre">
                                        <Badge variant="dark">
                                            Bientôt disponible : Visualisation de vos gain
                                        </Badge>
                                    </h1>
                                </Col>
                            </Row>}
                    </Col>
                </Row>
            </Container>
        )
    }
}