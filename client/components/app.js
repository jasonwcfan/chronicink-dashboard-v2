import React, { Component, PropTypes } from 'react';
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
        console.log(props);
        this.state = {
            drawerIsOpen: false
        }
    }

    _toggleDrawer() {
        this.setState({
            drawerIsOpen: !this.state.drawerIsOpen
        })
    }

    _getActiveApp(activeApp) {
        switch (activeApp.id) {
            case 'intakeForm':
                return <IntakeFormContainer />;
            case 'consultationForm':
                return <ConsultationFormContainer />;
            default:
                return <IntakeFormContainer />;
        }
    }

    _handleChangeApp(appName) {
        this.props.onChangeApp(appName);
        this.setState({
            drawerIsOpen: false
        })
    }

    render() {
        return (
            <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
                <div>
                    <AppBar
                        title={this.props.activeApp.label}
                        onLeftIconButtonTouchTap={this._toggleDrawer.bind(this)}
                    />
                    <Drawer
                        docked={false}
                        width={200}
                        open={this.state.drawerIsOpen}
                        onRequestChange={this._toggleDrawer.bind(this)}
                    >
                        <MenuItem name='intakeForm' onTouchTap={() => {this._handleChangeApp('intakeForm')}} >Intake Form</MenuItem>
                        <MenuItem name='consultationForm' onTouchTap={() => this._handleChangeApp('consultationForm')} >Consultation Form</MenuItem>
                    </Drawer>
                    {this._getActiveApp(this.props.activeApp)}
                </div>
            </MuiThemeProvider>
        );
    }
}

App.propTypes = {
    activeApp: PropTypes.shape({
        id: PropTypes.string.isRequired,
        label: PropTypes.string
    }).isRequired
};

export default App;