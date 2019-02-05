import React from 'react';
import {Container, Row} from "react-bootstrap";

export class Footer extends React.Component {
	constructor(props) {
        super(props);
    }

	render() {
		return (
			<Container className="Accueil-footer" fluid>
    			<Row className="pied">
					<h3>Pourquoi Subsquare ?</h3>
				</Row>
			</Container>
		)
	}
}