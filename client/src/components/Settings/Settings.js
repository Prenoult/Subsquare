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
                                ? <Well bsSize="small"><b>Nom :</b> {this.state.lastname}</Well>
                                : <form>
                                    <FormGroup controlId="lastname">
                                        <InputGroup>
                                            <InputGroup.Addon>Nom</InputGroup.Addon>
                                            <FormControl
                                                type="text"
                                                value={this.state.lastname}
                                                onChange={this.handleChange}
                                                placeholder="Nom"/>
                                        </InputGroup>
                                    </FormGroup>
                                </form>
                            }
                            {this.state.isModifying === false
                                ? <Well bsSize="small"><b>Prénom :</b> {this.state.firstname}</Well>
                                : <form>
                                    <FormGroup controlId="firstname">
                                        <InputGroup>
                                            <InputGroup.Addon>Prénom</InputGroup.Addon>
                                            <FormControl
                                                type="text"
                                                value={this.state.firstname}
                                                onChange={this.handleChange}
                                                placeholder="Prénom"/>
                                        </InputGroup>
                                    </FormGroup>
                                </form>
                            }
                            {/** <Well bsSize="small"><b>Date de naissance :</b></Well> */}
                            {/** this.state.isModifying === false
                             ? <Well bsSize="small"><b>Genre :</b></Well>
                             : <FormGroup>
                             <ControlLabel>Genre :</ControlLabel>{' '}
                             <Radio name="radioGroup" value="Man" checked={this.state.gender === "Man"} inline>
                             Homme
                             </Radio>{' '}
                             <Radio name="radioGroup" value="Woman" checked={this.state.gender === "Woman"} inline>
                             Femme
                             </Radio>{' '}
                             <Radio name="radioGroup" value="Other" checked={this.state.gender === "Other"} inline>
                             Autre
                             </Radio>
                             </FormGroup> */}
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
                        <Row className="centrer">
                            <Link to={"/settings/apply"}>
                                Passer en compte entreprise
                            </Link>
                        </Row>
                    </Col>
                </Row>
            </Grid>
        )
    }
}