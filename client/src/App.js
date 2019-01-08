import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import {Dashboard} from './components/Dashboard/Dashboard.js';
import {Login} from './components/Login/Login.js';
import {Signup} from './components/Signup/Signup.js';
import {Settings} from './components/Settings/Settings.js';
import {SettingsMail} from './components/Settings/SettingsMail.js';
import {SettingsPassword} from './components/Settings/SettingsPassword.js';
import {Forgotten} from './components/Forgotten/Forgotten.js';
import {Subscriptions} from './components/Subscriptions/Subscriptions.js';
import {PrivateRoute} from './components/PrivateRoute.js';
import './App.css';

class App extends Component {
    render() {
        return (
            <div className="App">
                <div className="App-content">
                    <Switch>
                        <Route exact path="/" component={Login}/>
                        <Route exact path="/signup" component={Signup}/>
                        <Route exact path="/forgotten" component={Forgotten}/>
                        <PrivateRoute path='/dashboard' component={Dashboard}/>
                        <PrivateRoute exact path="/settings" component={Settings}/>
                        <PrivateRoute exact path="/settings/mail" component={SettingsMail}/>
                        <PrivateRoute exact path="/settings/password" component={SettingsPassword}/>
                        <PrivateRoute exact path="/subscriptions" component={Subscriptions}/>
                    </Switch>
                </div>
            </div>
        );
    }
}

export default App;