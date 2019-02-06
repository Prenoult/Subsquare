import React from 'react';
import {Row, Col, Image} from "react-bootstrap";

export class EnteteLogo extends React.Component {
    render() {
        return (
            <Row>
                <Col xs={8} md={5} className="colonne-centree">
                    <Row>
                        <Image src={require('../../img/logotest.png')} className="LogoLog"/>
                    </Row>
                    <Row>
                        <h2>GESTION CENTRALISÉE DE VOS ABONNEMENTS</h2>
                    </Row>
                </Col>
            </Row>

        )
    }
}