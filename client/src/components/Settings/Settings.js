/**
 * Created by Charles on 03/01/2019.
 */
import React from 'react';
import {Button, FormGroup, FormControl, ControlLabel} from "react-bootstrap";
import API from '../../utils/API';
import {Link} from 'react-router-dom';

export class Settings extends React.Component {
    constructor(props) {
        super(props);

    }


    render() {
        return (
            <div className="Change">
                <h2>Information</h2>
                <span>Mail :</span>
                <br/>
                <span>{localStorage.id}</span>
                <br/>
                <Link to={"/settings/mail"}>Modifier votre adresse mail</Link>
                <br/>
                        <span>Blablabla</span>
            </div>
    )
    }
    }