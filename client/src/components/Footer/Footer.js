import React from 'react';
import {Link} from 'react-router-dom';
import {Button, FormGroup, FormControl, ControlLabel, Grid, Row, Col, Image} from "react-bootstrap";
import API from '../../utils/API';

export class Footer extends React.Component {
	constructor(props) {
        super(props);
        this.page=props.page;
    }

	render() {
		return (
			<Grid className="Accueil-footer">
    			<Row className="pied">
					<h3>Pourquoi Subsquare ?</h3>
				</Row>
			</Grid>	
		)
	}
}