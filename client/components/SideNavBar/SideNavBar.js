import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';

class SideNavBar extends Component {
    constructor() {
        super();
    }

    _handleChangeApp(appName) {
        this.props.onChangeApp(appName);
    }

    render() {
        return(
            <Paper style={this.props.style} >
                <Menu>
                    <Divider />
                    <MenuItem name='dashboard' onTouchTap={() => {this._handleChangeApp('dashboard')}} >Dashboard</MenuItem>
                    <MenuItem name='intakeForm' onTouchTap={() => {this._handleChangeApp('intakeForm')}} >Intake Form</MenuItem>
                    <MenuItem name='consultationForm' onTouchTap={() => this._handleChangeApp('consultationForm')} >Consultation Form</MenuItem>
                </Menu>
            </Paper>
        )
    }
}

export default SideNavBar;