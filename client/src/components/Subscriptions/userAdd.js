import React from 'react';
import {Container, Row, Col} from "react-bootstrap";
import API from '../../utils/API';
import {Link} from 'react-router-dom';
import {Menu} from '../Menu/Menu.js';
import {Header} from '../Header/Header.js';

export class userAdd extends React.Component {
    constructor(props) {
        super(props);
        var _send = {
            email: localStorage.getItem("id")
        }
        API.allSubscriptions(_send).then(function (data) {
            console.log(data.data);
        }, function (error) {
            console.log(error);
            return;
        })


    }



    //https://reactjs.org/docs/conditional-rendering.html

    render() {

        return (
            <Container className="Form" fluid>
                <Row>
                    <Col md={{ span: 2, offset: 0 }}>
                        <Menu/>
                    </Col>
                    <Col md={{ span: 8, offset: 1 }}>
                        <Header page="ABONNEMENTS"/>
                        <Row>
                            <h2>ajouter Abonnements</h2>
                        </Row>
                    </Col>
                </Row>
            </Container>
        )
    }
}

