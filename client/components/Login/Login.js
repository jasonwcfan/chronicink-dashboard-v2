import React, { Component } from 'react';

class Login extends Component {
    constructor() {
        super();
    }

    _handleLogin() {
        Meteor.loginWithGoogle({
            requestPermissions: ['https://www.googleapis.com/auth/calendar']
        }, (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log('logged in');
                window.location.reload();
            }
        });
    }

    render() {
        return (
            <button onTouchTap={this._handleLogin.bind(this)}>Login</button>
        )
    }
}

export default Login;