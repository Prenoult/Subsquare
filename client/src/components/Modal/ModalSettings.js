import React from 'react';
import {Button, Form, Modal} from "react-bootstrap";


export class ModalSettings extends React.Component {
    render() {
        return (
            <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-lg">Modification des informations du profil</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="password">
                        <Form.Label>Veuillez confirmer la modification à l'aide votre mot de passe</Form.Label>
                        <Form.Control autoFocus type="password" placeholder="Mot de passe" value={this.props.value} onChange={this.props.onChange}/>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.props.onSubmit} variant="success">Confirmer</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}