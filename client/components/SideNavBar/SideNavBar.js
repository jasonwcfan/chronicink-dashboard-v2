import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import { Link } from 'react-router';

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
                    <Link to='/'><MenuItem name='dashboard' >Dashboard</MenuItem></Link>
                    <Link to='intakeform'><MenuItem name='intakeForm' >Intake Form</MenuItem></Link>
                    <Link to='consultationform'><MenuItem name='consultationForm' >Consultation Form</MenuItem></Link>
                    <Divider />
                </Menu>
            </Paper>
        )
    }
}

export default SideNavBar;