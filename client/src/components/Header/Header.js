import React from 'react';
import {Link} from 'react-router-dom';
import {Row, Col, Image} from "react-bootstrap";
import API from '../../utils/API';

export class Header extends React.Component {
    constructor(props) {
        super(props);
        this.disconnect.bind(this);
        this.page = props.page;
    }

    disconnect = event => {
        API.logout();
    };

    render() {
        return (
            <Row className="entete">
                <Col xs={3} style={{fontSize: 30}}>
                    {this.page}
                </Col>
                <Col xs={9} style={{fontSize: 20, marginTop: 10, color: 'grey'}} className="headerRight">
                    <Nom/>
                    {localStorage.getItem("account") === "false"
                        ? <Link to={"/Settings"}>
                            <Image src={require('../../img/reglage.png')}
                                   style={{
                                       width: 30,
                                       height: 30,
                                       marginLeft: 10,
                                       marginBottom: 5
                                   }}/>
                        </Link>
                        : <Link to={"/Settings/Company"}>
                            <Image src={require('../../img/reglage.png')}
                                   style={{
                                       width: 30,
                                       height: 30,
                                       marginLeft: 10,
                                       marginBottom: 5
                                   }}/>
                        </Link>}
                    <Link to={"/Settings"}>
                        <Image src={require('../../img/shutdown.png')}
                               style={{
                                   width: 25,
                                   height: 25,
                                   marginLeft: 10,
                                   marginBottom: 3
                               }}
                               onClick={this.disconnect}/>
                    </Link>
                </Col>
            </Row>
        )
    }
}

function Nom(props) {
    if (localStorage.firstname === 'undefined' || localStorage.firstname === '' || localStorage.firstname === 'null') {
        if (localStorage.nomC === 'undefined' || localStorage.nomC === '' || localStorage.nomC === 'null') {
            return (localStorage.id)
        } else {
            return (localStorage.nomC)
        }
    } else {
        return (localStorage.firstname)
    }
}