import React from 'react';
import {
    Button,
    ButtonToolbar,
    InputGroup,
    ControlLabel,
    FormGroup,
    FormControl,
    Radio,
    Well,
    Grid,
    Row,
    Col
} from "react-bootstrap";
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
                numSiret: profile.data.numSiret,
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
            numSiret: this.state.numSiret,
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
            <Grid className="Form">
                <Row>
                    <Menu/>
                    <Col md={8} mdOffset={1}>
                        <Header page="PROFIL"/>
                        <Row>
                            <Col md={6} className= "colonne-centree">
                            <br/>
                            {this.state.isModifying === false
                                ? <Well bsSize="small"><b>Email :</b> {this.state.email}</Well>
                                : <form>
                                    <FormGroup controlId="email">
                                        <InputGroup>
                                            <InputGroup.Addon>Email</InputGroup.Addon>
                                            <FormControl
                                                type="text"
                                                value={this.state.email}
                                                onChange={this.handleChange}
                                                placeholder="Adresse email"/>
                                        </InputGroup>
                                    </FormGroup>
                                </form>
                            }
                            {this.state.isModifying === false
                                ? <Well bsSize="small"><b>Nom :</b> {this.state.nom}</Well>
                                : <form>
                                    <FormGroup controlId="nom">
                                        <InputGroup>
                                            <InputGroup.Addon>Nom</InputGroup.Addon>
                                            <FormControl
                                                type="text"
                                                value={this.state.nom}
                                                onChange={this.handleChange}
                                                placeholder="Nom"/>
                                        </InputGroup>
                                    </FormGroup>
                                </form>
                            }
                            {this.state.isModifying === false
                                ? <Well bsSize="small"><b>Numéro de Siret :</b> {this.state.numSiret}</Well>
                                : <form>
                                    <FormGroup controlId="numSiret">
                                        <InputGroup>
                                            <InputGroup.Addon>Numéro de Siret</InputGroup.Addon>
                                            <FormControl
                                                type="text"
                                                value={this.state.numSiret}
                                                onChange={this.handleChange}
                                                placeholder="Numéro de Siret"/>
                                        </InputGroup>
                                    </FormGroup>
                                </form>
                            }
                            {this.state.isModifying === false
                                ? <Well bsSize="small"><b>Numéro de Téléphone :</b> {this.state.numTel}</Well>
                                : <form>
                                    <FormGroup controlId="numTel">
                                        <InputGroup>
                                            <InputGroup.Addon>Numéro de Téléphone</InputGroup.Addon>
                                            <FormControl
                                                type="text"
                                                value={this.state.numTel}
                                                onChange={this.handleChange}
                                                placeholder="Numéro de Téléphone"/>
                                        </InputGroup>
                                    </FormGroup>
                                </form>
                            }
                            {this.state.isModifying === false
                                ? <Well bsSize="small"><b>Adresse :</b> {this.state.adresse}</Well>
                                : <form>
                                    <FormGroup controlId="adresse">
                                        <InputGroup>
                                            <InputGroup.Addon>Adresse</InputGroup.Addon>
                                            <FormControl
                                                type="text"
                                                value={this.state.adresse}
                                                onChange={this.handleChange}
                                                placeholder="Adresse"/>
                                        </InputGroup>
                                    </FormGroup>
                                </form>
                            }
                            {this.state.isModifying === false
                                ? <Well bsSize="small"><b>Code Postal :</b> {this.state.codePostal}</Well>
                                : <form>
                                    <FormGroup controlId="codePostal">
                                        <InputGroup>
                                            <InputGroup.Addon>Code Postal</InputGroup.Addon>
                                            <FormControl
                                                type="text"
                                                value={this.state.codePostal}
                                                onChange={this.handleChange}
                                                placeholder="Code Postal"/>
                                        </InputGroup>
                                    </FormGroup>
                                </form>
                            }
                            {this.state.isModifying === false
                                ? <Well bsSize="small"><b>Ville :</b> {this.state.ville}</Well>
                                : <form>
                                    <FormGroup controlId="ville">
                                        <InputGroup>
                                            <InputGroup.Addon>Ville</InputGroup.Addon>
                                            <FormControl
                                                type="text"
                                                value={this.state.ville}
                                                onChange={this.handleChange}
                                                placeholder="Ville"/>
                                        </InputGroup>
                                    </FormGroup>
                                </form>
                            }
                            {/** <Link to={"/settings/mail"}>Modifier votre adresse email </Link>*/}
                            </Col>
                        </Row>
                        <Row>
                            <Col md={4} className= "colonne-centree">
                            {this.state.isModifying === false ?
                                <Button onClick={this.modify.bind(this)} block>Modifier vos informations</Button>
                                : <div><Button onClick={this.modify.bind(this)}
                                               block>Annuler</Button>
                                    <Button onClick={this.triggerModal.bind(this)}
                                            bsStyle="success"
                                            block>Valider</Button>
                                </div>
                            }
                            {this.state.isModifying === false &&
                            <Button bsStyle="danger" block>
                                <Link to={"/settings/password"} className='linkButton'>
                                    Modifier votre mot de passe</Link>
                            </Button>}
                            <ButtonToolbar>
                                <ModalSettings show={this.state.modalShow} onHide={this.triggerModal.bind(this)}
                                               onSubmit={this.onSubmit.bind(this)} value={this.state.password}
                                               onChange={this.handleChange}/>
                            </ButtonToolbar>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Grid>
        )
    }
}