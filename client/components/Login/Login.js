import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import chronicInkMuiTheme from '../../theme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Dialog from 'material-ui/Dialog';

class Login extends Component {
    constructor() {
        super();

        this.state = {
            dialogOpen: false
        }
    }

    _handleLogin() {
        Meteor.loginWithGoogle({
            requestPermissions: ['https://www.googleapis.com/auth/calendar', 'https://www.googleapis.com/auth/gmail.send'],
            requestOfflineToken: true,
            forceApprovalPrompt: true
        }, (err) => {
            if (err) {
                console.log(err);
                this.setState({
                    dialogOpen: true
                })
            } else {
                console.log('logged in');
                window.location.reload();
            }
        });
    }

    render() {
        const actions = [
            <FlatButton
                label='OK'
                onTouchTap={() => {this.setState({dialogOpen: false})}}
            />
        ];
        return (
            <MuiThemeProvider muiTheme={getMuiTheme(chronicInkMuiTheme)}>
                <div>
                    <RaisedButton primary={true} onTouchTap={this._handleLogin.bind(this)}>Login</RaisedButton>
                    <Dialog
                        open={this.state.dialogOpen}
                        actions={actions}
                    >
                        Only emails with the chronicinktattoo.com domain are permitted to log in
                    </Dialog>
                </div>
            </MuiThemeProvider>
        )
    }
}

export default Login;