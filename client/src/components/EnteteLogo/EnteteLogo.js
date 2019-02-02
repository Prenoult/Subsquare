import React from 'react';
import {Container, Row, Col, Image} from "react-bootstrap";

export class EnteteLogo extends React.Component {
    render() {
        return (
                <Col md={6} className="colonne-centree">
                    <Row className="LogoLog">
                        <Image src={require('../../img/logotest.png')}/>
                    </Row>
                    <Row>
                        <h2>GESTION CENTRALISÉE DE VOS ABONNEMENTS</h2>
                    </Row>
                </Col>
        )
    }
}