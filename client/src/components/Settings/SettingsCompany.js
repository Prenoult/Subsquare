import React from 'react';
import {Button, ButtonToolbar, InputGroup,Form, Radio, Card, Container, Row, Col} from "react-bootstrap";
import API from '../../utils/API';
import {Link} from 'react-router-dom';
import {Menu} from '../Menu/Menu.js';
import {Header} from '../Header/Header.js';
import {ModalSettings} from '../Modal/ModalSettings';

export class SettingsCompany extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            nom: "",
            numSiret: "",
            numTel:"",
            adresse:"",
            codePostal:"",
            ville:"",
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
        API.getProfileCompany(_send).then(function (profile) {
            that.setState({
                email: profile.data.email,
                nom: profile.data.nom,
              //  numSiret: profile.data.numSiret,
                numTel: profile.data.numTel,
                numSiret: profile.data.numSiret,
                adresse: profile.data.adresse,
                codePostal: profile.data.codePostal,
                ville: profile.data.ville
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
            password: this.state.password,
            nom: this.state.nom,
           // numSiret: this.state.numSiret,
            numTel: this.state.numTel,
            numSiret: this.state.numSiret,
            adresse: this.state.adresse,
            codePostal: this.state.codePostal,
            ville: this.state.ville
        };
        //console.log(_send);
        API.changeProfileCompany(_send).then(function (data) {
            console.log(data.data.id);
            localStorage.setItem("id", data.data.id);
            localStorage.setItem("nomC", data.data.nomC);
            window.location = "/settings/company";
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
                    <Col xs={2}>
                        <Menu/>
                    </Col>
                    <Col xs={{ span: 6, offset: 1 }} sm={{ span: 7, offset: 1 }} md={{ span: 8, offset: 1 }} lg={{ span: 8, offset: 1 }}>
                        <Header page="PROFIL"/>
                        <Row>
                            <Col sm={9} md={8} lg={6} className= "colonne-centree">
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
                                ? <Card className="card"><Card.Body><b>Nom :</b> {this.state.nom}</Card.Body></Card>
                                : <Form>
                                    <Form.Group controlId="nom">
                                        <InputGroup>
                                            <InputGroup.Prepend>
                                                <InputGroup.Text>Nom</InputGroup.Text>
                                            </InputGroup.Prepend>
                                            <Form.Control
                                                type="text"
                                                value={this.state.nom}
                                                onChange={this.handleChange}
                                                placeholder="Nom"/>
                                        </InputGroup>
                                    </Form.Group>
                                </Form>
                            }
                            {this.state.isModifying === false
                                ? <Card className="card"><Card.Body><b>Numéro de Siret :</b> {this.state.numSiret}</Card.Body></Card>
                                : <Form>
                                    <Form.Group controlId="numSiret">
                                        <InputGroup>
                                            <InputGroup.Prepend>
                                                <InputGroup.Text>Numéro de Siret</InputGroup.Text>
                                            </InputGroup.Prepend>
                                            <Form.Control
                                                type="text"
                                                value={this.state.numSiret}
                                                onChange={this.handleChange}
                                                placeholder="Numéro de Siret"/>
                                        </InputGroup>
                                    </Form.Group>
                                </Form>
                            }
                            {this.state.isModifying === false
                                ? <Card className="card"><Card.Body><b>Numéro de Téléphone :</b> {this.state.numTel}</Card.Body></Card>
                                : <Form>
                                    <Form.Group controlId="numTel">
                                        <InputGroup>
                                            <InputGroup.Prepend>
                                                <InputGroup.Text>Numéro de Téléphone</InputGroup.Text>
                                            </InputGroup.Prepend>
                                            <Form.Control
                                                type="text"
                                                value={this.state.numTel}
                                                onChange={this.handleChange}
                                                placeholder="Numéro de Téléphone"/>
                                        </InputGroup>
                                    </Form.Group>
                                </Form>
                            }
                            {this.state.isModifying === false
                                ? <Card className="card"><Card.Body><b>Adresse :</b> {this.state.adresse}</Card.Body></Card>
                                : <Form>
                                    <Form.Group controlId="adresse">
                                        <InputGroup>
                                            <InputGroup.Prepend>
                                                <InputGroup.Text>Adresse</InputGroup.Text>
                                            </InputGroup.Prepend>
                                            <Form.Control
                                                type="text"
                                                value={this.state.adresse}
                                                onChange={this.handleChange}
                                                placeholder="Adresse"/>
                                        </InputGroup>
                                    </Form.Group>
                                </Form>
                            }
                            {this.state.isModifying === false
                                ? <Card className="card"><Card.Body><b>Code Postal :</b> {this.state.codePostal}</Card.Body></Card>
                                : <Form>
                                    <Form.Group controlId="codePostal">
                                        <InputGroup>
                                            <InputGroup.Prepend>
                                                <InputGroup.Text>Code Postal</InputGroup.Text>
                                            </InputGroup.Prepend>
                                            <Form.Control
                                                type="text"
                                                value={this.state.codePostal}
                                                onChange={this.handleChange}
                                                placeholder="Code Postal"/>
                                        </InputGroup>
                                    </Form.Group>
                                </Form>
                            }
                            {this.state.isModifying === false
                                ? <Card className="card"><Card.Body><b>Ville :</b> {this.state.ville}</Card.Body></Card>
                                : <Form>
                                    <Form.Group controlId="ville">
                                        <InputGroup>
                                            <InputGroup.Prepend>
                                                <InputGroup.Text>Ville</InputGroup.Text>
                                            </InputGroup.Prepend>
                                            <Form.Control
                                                type="text"
                                                value={this.state.ville}
                                                onChange={this.handleChange}
                                                placeholder="Ville"/>
                                        </InputGroup>
                                    </Form.Group>
                                </Form>
                            }
                            {/** <Link to={"/settings/mail"}>Modifier votre adresse email </Link>*/}
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={9} md={8} lg={6} className= "colonne-centree" style={{marginTop: 15}}>
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
                    </Col>
                </Row>
            </Container>
        )
    }
}