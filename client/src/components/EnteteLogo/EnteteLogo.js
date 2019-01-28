import React from 'react';
import {Button, FormGroup, FormControl, ControlLabel, Grid, Row, Col, Image} from "react-bootstrap";

export class EnteteLogo extends React.Component {
	render() {
		return (
			<Grid>
				<Row className="LogoLog">
	                <Col className= "colonne-centree">
	                    <Image src={require('../../img/logotest.png')}/>
	                </Col>
	            <h2 >GESTION CENTRALISÉE DE VOS ABONNEMENTS</h2>
	            </Row>
	        </Grid>
		)
	}
}