/**
 * Created by Charles on 08/01/2019.
 */
import React from 'react';
import {Button, FormGroup, FormControl, ControlLabel} from "react-bootstrap";
import API from '../../utils/API';
import {Link} from 'react-router-dom';

export class Subscriptions extends React.Component {
    constructor(props) {
        super(props);

    }


    render() {
        return (
            <div className="Form">
                <h2>Abonnements</h2>
                <Link to={"/Subscriptions"}>Ajouter un abonnement</Link>
            </div>
        )
    }
}