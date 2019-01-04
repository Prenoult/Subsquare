import React from 'react';
import {Button} from "react-bootstrap";
import {Link} from 'react-router-dom';

import API from '../../utils/API';

export class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.disconnect.bind(this);
    }

    disconnect = event => {
        API.logout();
        window.location = "/";
    };

    render() {
        return (
            <div className="Dashboard">
                <h1>Dashboard</h1>
                <Link to={"/Settings"}>Parametre</Link>
                <Button
                    onClick={this.disconnect}
                    block
                    bsSize="large"
                    type="submit"
                >
                    Se déconnecter
                </Button>
            </div>
        )
    }
}