import React from 'react';
import {Button, ButtonToolbar, InputGroup, Form, Radio, Card, Container, Row, Col} from "react-bootstrap";
import API from '../../utils/API';
import {Link} from 'react-router-dom';
import {Menu} from '../Menu/Menu.js';
import {Header} from '../Header/Header.js';
import {ModalSettings} from '../Modal/ModalSettings';

export class Settings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            lastname: "",
            firstname: "",
            gender: "",
            isModifying: false,
            modalShow: false,
        };
        this.handleChange.bind(this);
    }

    componentDidMount() {
        this.getProfile()
    }

    getProfile() {
        let that = this;
        let _send = {
            email: localStorage.getItem("id")
        };
        API.getProfile(_send).then(function (profile) {
            that.setState({
                email: profile.data.email,
                lastname: profile.data.lastname,
                firstname: profile.data.firstname,
            });
        })
    }

    modify() {
        this.setState({
            isModifying: !this.state.isModifying
        })
    }


    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    };

    triggerModal() {
        this.setState({
            modalShow: !this.state.modalShow
        });
    }

    onSubmit() {
        let _send = {
            id: localStorage.getItem("id"),
            email: this.state.email,
            lastname: this.state.lastname,
            firstname: this.state.firstname,
            password: this.state.password,
        };
        //console.log(_send);
        API.changeProfile(_send).then(function (data) {
            console.log(data.data.id);
            localStorage.setItem("id", data.data.id);
            localStorage.setItem("firstname", data.data.firstname);
            window.location = "/settings";
        }, function (error) {
            console.log('Mal passé');
            console.error(error);
            console.log(error);
            return;
        })
    }

    render() {
        return (
            <Container className="Form" fluid>
                <Row>
                    <Col md={{ span: 2, offset: 0 }}>
                        <Menu/>
                    </Col>
                    <Col md={{ span: 8, offset: 1 }}>
                        <Header page="PROFIL"/>
                        <Row>
                            <Col md={6} className= "colonne-centree">
                            <br/>
                            {this.state.isModifying === false
                                ? <Card className="card"><Card.Body><b>Email :</b> {this.state.email}</Card.Body></Card>
                                : <Form>
                                    <Form.Group controlId="email">
                                        <InputGroup>
                                            <InputGroup.Prepend>
                                                <InputGroup.Text>Email</InputGroup.Text>
                                            </InputGroup.Prepend>
                                            <Form.Control
                                                type="text"
                                                value={this.state.email}
                                                onChange={this.handleChange}
                                                placeholder="Adresse email"/>
                                        </InputGroup>
                                    </Form.Group>
                                </Form>
                            }
                            {this.state.isModifying === false
                                ? <Card className="card"><Card.Body><b>Nom :</b> {this.state.lastname}</Card.Body></Card>
                                : <Form>
                                    <Form.Group controlId="lastname">
                                        <InputGroup>
                                            <InputGroup.Prepend>
                                                <InputGroup.Text>Nom</InputGroup.Text>
                                            </InputGroup.Prepend>
                                            <Form.Control
                                                type="text"
                                                value={this.state.lastname}
                                                onChange={this.handleChange}
                                                placeholder="Nom"/>
                                        </InputGroup>
                                    </Form.Group>
                                </Form>
                            }
                            {this.state.isModifying === false
                                ? <Card className="card"><Card.Body><b>Prénom :</b> {this.state.firstname}</Card.Body></Card>
                                : <Form>
                                    <Form.Group controlId="firstname">
                                        <InputGroup>
                                            <InputGroup.Prepend>
                                                <InputGroup.Text>Prénom</InputGroup.Text>
                                            </InputGroup.Prepend>
                                            <Form.Control
                                                type="text"
                                                value={this.state.firstname}
                                                onChange={this.handleChange}
                                                placeholder="Prénom"/>
                                        </InputGroup>
                                    </Form.Group>
                                </Form>
                            }
                            {/** <Well size="sm"><b>Date de naissance :</b></Well> */}
                            {/** this.state.isModifying === false
                             ? <Well size="sm"><b>Genre :</b></Well>
                             : <Form.Group>
                             <Control.Label>Genre :</Control.Label>{' '}
                             <Radio name="radioGroup" value="Man" checked={this.state.gender === "Man"} inline>
                             Homme
                             </Radio>{' '}
                             <Radio name="radioGroup" value="Woman" checked={this.state.gender === "Woman"} inline>
                             Femme
                             </Radio>{' '}
                             <Radio name="radioGroup" value="Other" checked={this.state.gender === "Other"} inline>
                             Autre
                             </Radio>
                             </Form.Group> */}
                            {/** <Link to={"/settings/mail"}>Modifier votre adresse email </Link>*/}
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6} className= "colonne-centree" style={{marginTop: 15}}>
                            {this.state.isModifying === false ?
                                <Button onClick={this.modify.bind(this)} variant='light' block>MODIFIER VOS INFORMATIONS</Button>
                                : <div><Button onClick={this.modify.bind(this)}
                                               variant="light"
                                               block>Annuler</Button>
                                    <Button onClick={this.triggerModal.bind(this)}
                                            variant="success"
                                            block>Valider</Button>
                                </div>
                            }
                            {this.state.isModifying === false &&
                            <Link to={"/Settings/password"} className='linkButton'>
                                <Button variant="danger" block style={{marginTop:10}}>
                                    MODIFIER VOTRE MOT DE PASSE
                                </Button>
                            </Link>}
                            <ButtonToolbar>
                                <ModalSettings show={this.state.modalShow} onHide={this.triggerModal.bind(this)}
                                               onSubmit={this.onSubmit.bind(this)} value={this.state.password}
                                               onChange={this.handleChange}/>
                            </ButtonToolbar>
                            </Col>
                        </Row>
                        <Row>
                            <Link to={"/settings/apply"} style={{margin: 'auto'}}>
                                Passer en compte entreprise
                            </Link>
                        </Row>
                    </Col>
                </Row>
            </Container>
        )
    }
}