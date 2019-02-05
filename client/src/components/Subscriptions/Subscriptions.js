import React from 'react';
import {Container, Row, Col} from "react-bootstrap";
import API from '../../utils/API';
import {Link} from 'react-router-dom';
import {Menu} from '../Menu/Menu.js';
import {Header} from '../Header/Header.js';

export class Subscriptions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            subscription:[]
        };
    }

    componentDidMount() {
        this.getSubscription()
        console.log(this.state)
    }
    getSubscription(){
        let that = this;
        var _send = {
            email: localStorage.getItem("id")
        };
        API.getSub(_send).then(function (data) {
            console.log(data.data.dd);
            that.setState({
                subscription:data.data.dd
            });
        })
    }


    //https://reactjs.org/docs/conditional-rendering.html

    render() {

        return (
            <Container className="Form" fluid>
                <Row>
                    <Col xs={2}>
                        <Menu/>
                    </Col>
                    <Col xs={{ span: 6, offset: 1 }} sm={{ span: 7, offset: 1 }} md={{ span: 8, offset: 1 }} lg={{ span: 8, offset: 1 }}>
                        <Header page="ABONNEMENTS"/>
                        <Row>
                            <h3>Abonnements</h3>
                            <Account company />
                        </Row>
                    </Col>
                </Row>
            </Container>
        )
    }
}


function CompanyAccount(props) {
    return (
    <Link to={"/Company/add"}>Ajouter un abonnement</Link>
    )}

function UserAccount(props) {
    return  <Link to={"/user/add"}>Ajouter un abonnement</Link>
}

function Account(props) {
    if (window.localStorage.getItem("account")){
        if (window.localStorage.getItem("account") == "true") {
            return <CompanyAccount />;
        }else {
            return <UserAccount />;
        }
    }else{
        console.log("Pas censée arriver");
        //return <UserAccount />;
    }


}