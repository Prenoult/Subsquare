import React from 'react';
import {Button, FormControl, FormGroup, ControlLabel, Modal} from "react-bootstrap";


export class ModalSettings extends React.Component {
    render() {
        return (
            <Modal
                {...this.props}
                bsSize="large"
                aria-labelledby="contained-modal-title-lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-lg">Modification des informations du profil</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormGroup controlId="password" validationState={null}>
                        <ControlLabel>Veuillez confirmer la modification à l'aide votre mot de passe</ControlLabel>
                        <FormControl autoFocus type="password" placeholder="Mot de passe" value={this.props.value} onChange={this.props.onChange}/>
                    </FormGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.props.onSubmit} bsStyle="success">Confirmer</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}