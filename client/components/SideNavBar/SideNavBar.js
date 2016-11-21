import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import LinkWrapper from '../UI/LinkWrapper';

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
                    <LinkWrapper to='dashboard'><MenuItem name='dashboard'>Dashboard</MenuItem></LinkWrapper>
                    <LinkWrapper to='intakeform'><MenuItem name='intakeForm' >Intake Form</MenuItem></LinkWrapper>
                    <LinkWrapper to='consultationform'><MenuItem name='consultationForm' >Consultation Form</MenuItem></LinkWrapper>
                    <Divider />
                </Menu>
            </Paper>
        )
    }
}

export default SideNavBar;