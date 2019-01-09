import React from 'react';
import {Button, Grid, Row, Col} from "react-bootstrap";
import {Link} from 'react-router-dom';
import {Menu} from '../Menu/Menu.js';
import {Header} from '../Header/Header.js';

import API from '../../utils/API';

export class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.disconnect.bind(this);
    }

    disconnect = event => {
        API.logout();
        window.location = "/";
    };

    render() {
        return (
            <Grid className="Dashboard">
                <Row>
                    <Menu/>
                    <Col md={8} mdOffset={1}>
                        <Header page="ACCUEIL"/>
                        <Row>
                            <h1>Dashboard</h1>
                            <Link to={"/Settings"}>Paramètres</Link>
                            <Button
                                onClick={this.disconnect}
                                block
                                bsSize="large"
                                type="submit"
                            >
                                Se déconnecter
                            </Button>
                        </Row>
                    </Col>
                </Row>
            </Grid>
        )
    }
}