import React from 'react';
import {Link} from 'react-router-dom';
import {Button, Row, Col, Image} from "react-bootstrap";

export class Menu extends React.Component {
    render() {
        return (
            <Col className="montagne">
                <Row>
                    <Col>
                        <Image src={require('../../img/Logo.png')}
                               className="logoMenu"/>
                    </Col>
                </Row>
                <Row>
                    <Col className="colonne-centree">
                        <Link to={"/dashboard"}>
                            <Button
                                block
                                size="lg"
                                variant="primary"
                                type="submit"
                                className="buttonMenu"
                            >
                                <Image src={require('../../img/Accueil.png')}
                                       className="imgMenu"/>
                                ACCUEIL
                            </Button>
                        </Link>
                    </Col>
                </Row>
                <Row>
                    <Col className="colonne-centree">
                        <Link to={"/subscriptions"}>
                            <Button
                                block
                                size="lg"
                                variant="primary"
                                type="submit"
                                className="buttonMenu"
                            >
                                <Image src={require('../../img/abonnements.png')}
                                       className="imgMenu"/>
                                ABONNEMENTS
                            </Button>
                        </Link>
                    </Col>
                </Row>
                <Row>
                    <Col className="colonne-centree">
                        <Link to={"/explore"}>
                            <Button
                                block
                                size="lg"
                                variant="primary"
                                type="submit"
                                className="buttonMenu"
                            >
                                <Image src={require('../../img/recherche.png')}
                                       className="imgMenu"/>
                                EXPLORER
                            </Button>
                        </Link>
                    </Col>
                </Row>
                <Row>
                    <Col className="colonne-centree">
                        <Link to={"/finances"}>
                            <Button
                                block
                                size="lg"
                                variant="primary"
                                type="submit"
                                className="buttonMenu"
                            >
                                <Image src={require('../../img/finance.png')}
                                       className="imgMenu"/>
                                MES FINANCES
                            </Button>
                        </Link>
                    </Col>
                </Row>
            </Col>
        )
    }
}