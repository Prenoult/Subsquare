import React from 'react';
import {Link} from 'react-router-dom';
import {Button, FormGroup, FormControl, ControlLabel, Grid, Row, Col, Image} from "react-bootstrap";

export class Menu extends React.Component {

	render() {
		return (
			<Col sm={2} xs={1} className="montagne">
				<Row>
					<Image src={require('../../img/Logo.png')}  
                		style={{ width: 280,
							height: 150,
							marginLeft: 0,
							marginBottom: 70}}/>
				</Row>
				<Row>
					<Link to={"/dashboard"}>
						<Button
		                    block
		                    bsSize="large"
		                    bsStyle="primary"
		                    type="submit"
		                    className="buttonMenu"
		                >
		                	<Image src={require('../../img/Accueil.png')}  
		                		style={{ width: 30,
	    							height: 30,
	    							marginLeft: -50,
	    							marginBottom: 3,
	    							marginRight: 10}}/>
		                    ACCUEIL
		                </Button>
		            </Link>
	            </Row>
	            <Row>
	            	<Link to={"/subscriptions"}>
						<Button
		                    block
		                    bsSize="large"
		                    bsStyle="primary"
		                    type="submit"
		                    className="buttonMenu"
		                >
		                	<Image src={require('../../img/abonnements.png')} 
		                		style={{ width: 30,
	    							height: 35,
	    							marginLeft: -7,
	    							marginTop: -4,
	    							marginRight: 5}}/>
		                    ABONNEMENTS
		                </Button>
		            </Link>
	            </Row>
	            <Row>
					<Button
	                    block
	                    bsSize="large"
	                    bsStyle="primary"
	                    type="submit"
	                    className="buttonMenu"
	                >
	                	<Image src={require('../../img/recherche.png')}  
	                		style={{ width: 25,
    							height: 25,
    							marginLeft: -45,
    							marginBottom: 3,
    							marginRight: 10}}/>
	                    EXPLORER
	                </Button>
	            </Row>
	            <Row>
					<Button
	                    block
	                    bsSize="large"
	                    bsStyle="primary"
	                    type="submit"
	                    className="buttonMenu"
	                >
	                	<Image src={require('../../img/finance.png')}  
	                		style={{ width: 30,
    							height: 30,
    							marginLeft: -10,
    							marginBottom: 3,
    							marginRight: 10}}/>
	                    MES FINANCES
	                </Button>
	            </Row>
			</Col>
		)
	}
}