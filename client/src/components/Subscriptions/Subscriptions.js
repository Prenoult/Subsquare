/**
 * Created by Charles on 08/01/2019.
 */
import React from 'react';
import {Button, FormGroup, FormControl, ControlLabel, Grid, Row, Col} from "react-bootstrap";
import API from '../../utils/API';
import {Link} from 'react-router-dom';
import {Menu} from '../Menu/Menu.js';
import {Header} from '../Header/Header.js';

export class Subscriptions extends React.Component {
    constructor(props) {
        super(props);
        var _send = {
            email: localStorage.getItem("id")
        }
        API.getSub(_send).then(function (data) {
            console.log(data.data);
        }, function (error) {
            console.log(error);
            return;
        })
    }



    //https://reactjs.org/docs/conditional-rendering.html

    render() {

        return (
            <Grid className="Form">
                <Row>
                    <Menu/>
                    <Col md={8} mdOffset={1}>
                        <Header page="ABONNEMENTS"/>
                        <Row>
                            <h2>Abonnements</h2>
                            <Account company />
                        </Row>
                    </Col>
                </Row>
            </Grid>
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