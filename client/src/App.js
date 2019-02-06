import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import {Dashboard} from './components/Dashboard/Dashboard';
import {Login} from './components/Login/Login';
import {Signup} from './components/Signup/Signup';
import {Settings} from './components/Settings/Settings';
import {SettingsCompany} from './components/Settings/SettingsCompany';
import {SettingsMail} from './components/Settings/SettingsMail';
import {SettingsPassword} from './components/Settings/SettingsPassword';
import {Forgotten} from './components/Forgotten/Forgotten';
import {Subscriptions} from './components/Subscriptions/Subscriptions';
import {companyAdd} from './components/Subscriptions/companyAdd';
import {Explore} from './components/Explore/Explore'
import {SettingsApply} from './components/Settings/SettingsApply';
import {PrivateRoute} from './components/PrivateRoute';
import './App.css';
import {MyFinances} from "./components/Finances/MyFinances";

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
                        <PrivateRoute exact path="/settings/company" component={SettingsCompany}/>
                        <PrivateRoute exact path="/settings/mail" component={SettingsMail}/>
                        <PrivateRoute exact path="/settings/password" component={SettingsPassword}/>
                        <PrivateRoute exact path="/subscriptions" component={Subscriptions}/>
                        <PrivateRoute exact path="/company/add" component={companyAdd}/>
                        <PrivateRoute exact path="/explore" component={Explore}/>
                        <PrivateRoute exact path="/finances" component={MyFinances}/>
                        <PrivateRoute exact path="/settings/apply" component={SettingsApply}/>
                    </Switch>
                </div>
            </div>
        );
    }
}

export default App;