import React from 'react';
import API from '../utils/API.js';
import {Route, Redirect} from 'react-router-dom';

export const PrivateRoute = ({component: Component, ...rest}) => (
    <Route {...rest} render={(props) => {
        var path = props.location.pathname;
        if (API.isAuth() === false ) {
            return (<Redirect to='/'/>);
        } else {
            var _send = {
                token: localStorage.getItem("token")
            }

            let bool = API.tokenValid(_send).then(function (data) {
                if (data.data.response =="true"){
                    bool = true;
                }else {
                    bool = false;
                }
                return bool;
            }, function (error) {
                bool = false;
                console.log("caca crotte");
                return bool;
            });

            console.log(bool);
            console.log("bool" + bool);
            if (bool){
                return (<Component {...props} />)
            }else{
                API.logout();
                return (<Redirect to='/'/>);
            }

            let tokenvalided = function(data) {
                return API.tokenValid(data).then(token => { return token } )
            }

            //let userToken = await tokenvalided(_send)
            //console.log(userToken) // your data

        }
    }}/>
);