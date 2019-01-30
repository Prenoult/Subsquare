import React from 'react';
import {Button, FormGroup, FormControl, ControlLabel, Container, Row, Col, Image} from "react-bootstrap";

export class EnteteLogo extends React.Component {
    render() {
        return (
            <Container>
                <Col md={{span: 6, offset: 3}}>
                    <Row className="LogoLog">
                        <Image src={require('../../img/logotest.png')}/>
                    </Row>
                    <Row>
                        <h2>GESTION CENTRALISÉE DE VOS ABONNEMENTS</h2>
                    </Row>
                </Col>
            </Container>
        )
    }
}