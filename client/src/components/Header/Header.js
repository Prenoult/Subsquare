import React from 'react';
import {Link} from 'react-router-dom';
import {Button, FormGroup, FormControl, ControlLabel, Grid, Row, Col, Image} from "react-bootstrap";
import API from '../../utils/API';

export class Header extends React.Component {
	constructor(props) {
        super(props);
        this.disconnect.bind(this);
        this.page= props.page;
    }

	disconnect = event => {
        API.logout();
        window.location = "/";
    };

	render() {
		return (
			<Row className="entete">
				<Col md={2} style={{fontSize:30}}>
					{this.page}
				</Col>
				<Col md={4} mdOffset={6} style={{fontSize:20, marginTop:10, color:'grey'}}>
					{localStorage.id}
					<Link to={"/Settings"}>
						<Image src={require('../../img/reglage.png')}  
	                		style={{ width: 30,
								height: 30,
								marginLeft: 10,
								marginBottom: 5}}/>
					</Link>
					<Image src={require('../../img/shutdown.png')}  
                		style={{ width: 25,
							height: 25,
							marginLeft: 10,
							marginBottom: 3}}
						onClick={this.disconnect}/>
				</Col>
			</Row>
		)
	}
}