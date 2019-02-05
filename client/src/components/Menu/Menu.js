import React from 'react';
import {Link} from 'react-router-dom';
import {Button, Row, Col, Image} from "react-bootstrap";

export class Menu extends React.Component {
    render() {
        return (
            <Col sm={2} xs={1} className="montagne">
                <Row>
                    <Image src={require('../../img/Logo.png')}
                           style={{
                               width: 280,
                               height: 150,
                               marginLeft: -20,
                               marginBottom: 70
                           }}/>
                </Row>
                <Row>
                    <Link to={"/dashboard"}>
                        <Button
                            block
                            size="lg"
                            variant="primary"
                            type="submit"
                            className="buttonMenu"
                        >
                            <Image src={require('../../img/Accueil.png')}
                                   style={{
                                       width: 30,
                                       height: 30,
                                       marginBottom: 2,
                                       marginRight: 10
                                   }}/>
                            ACCUEIL
                        </Button>
                    </Link>
                </Row>
                <Row>
                    <Link to={"/subscriptions"}>
                        <Button
                            block
                            size="lg"
                            variant="primary"
                            type="submit"
                            className="buttonMenu"
                        >
                            <Image src={require('../../img/abonnements.png')}
                                   style={{
                                       width: 30,
                                       height: 30,
                                       marginBottom: 2,
                                       marginRight: 10
                                   }}/>
                            ABONNEMENTS
                        </Button>
                    </Link>
                </Row>
                <Row>
                    <Button
                        block
                        size="lg"
                        variant="primary"
                        type="submit"
                        className="buttonMenu"
                    >
                        <Image src={require('../../img/recherche.png')}
                               style={{
                                   width: 30,
                                   height: 30,
                                   marginBottom: 2,
                                   marginRight: 10
                               }}/>
                        EXPLORER
                    </Button>
                </Row>
                <Row>
                    <Button
                        block
                        size="lg"
                        variant="primary"
                        type="submit"
                        className="buttonMenu"
                    >
                        <Image src={require('../../img/finance.png')}
                               style={{
                                   width: 30,
                                   height: 30,
                                   marginBottom: 2,
                                   marginRight: 10
                               }}/>
                        MES FINANCES
                    </Button>
                </Row>
            </Col>
        )
    }
}