import React, { Component } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import AppBar from 'material-ui/AppBar';
import IntakeFormContainer from '../containers/IntakeFormContainer';
import ConsultationFormContainer from '../containers/ConsultationFormContainer';

injectTapEventPlugin();

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        }
    }

    _toggleDrawer() {
        this.setState({
            open: !this.state.open
        })
    }

    _handleChangePane() {
        console.log(this.name);
    }

    render() {
        return (
            <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
                <div>
                    <AppBar
                        title='Intake'
                        onLeftIconButtonTouchTap={this._toggleDrawer.bind(this)}
                    />
                    <Drawer
                        docked={false}
                        width={200}
                        open={this.state.open}
                        onRequestChange={this._toggleDrawer.bind(this)}
                    >
                        <MenuItem name='intakeForm' onTouchTap={this._handleChangePane} >Intake Form</MenuItem>
                        <MenuItem name='consultationForm' onTouchTap={this._handleChangePane} >Consultation Form</MenuItem>
                    </Drawer>
                    {/**<IntakeFormContainer /> **/}
                    <ConsultationFormContainer />
                </div>
            </MuiThemeProvider>
        );
    }
}

export default App;