import React, { Component, PropTypes } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Paper from 'material-ui/Paper';
import AppBar from 'material-ui/AppBar';
import SideNavBar from './SideNavBar';
import IntakeFormContainer from '../containers/IntakeFormContainer';
import ConsultationFormContainer from '../containers/ConsultationFormContainer';
import DashboardContainer from '../containers/DashboardContainer';

injectTapEventPlugin();

const style = {
    window: {
        display: 'flex'
    },
    appContainer: {
        width: '100%'
    },
    sideNavBar: {
        width: 240
    }
};

class App extends Component {
    constructor(props) {
        super(props);
        console.log(props);
    }

    // Eventually move app routing elsewhere...
    _getActiveApp(activeApp) {
        if (activeApp) {
            switch (activeApp.toLowerCase()) {
                case 'intakeform':
                    return <IntakeFormContainer />;
                case 'consultationform':
                    return <ConsultationFormContainer />;
                case 'dashboard':
                    return <DashboardContainer />;
                default:
                    return <DashboardContainer />;
            }
        } else {
            return <DashboardContainer />
        }
    }

    _getAppName(activeApp) {
        if (activeApp) {
            switch (activeApp.toLowerCase()) {
                case 'intakeform':
                    return 'Intake Form';
                case 'consultationform':
                    return 'Consultation Form';
                case 'dashboard':
                    return 'Dashboard';
                default:
                    return 'Dashboard';
            }
        } else {
            return 'Dashboard';
        }
    }

    render() {
        return (
            <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
                <div style={style.window}>
                    <SideNavBar style={style.sideNavBar} onChangeApp={this.props.onChangeApp} />
                    <Paper style={style.appContainer} zDepth={4}>
                        <AppBar
                            title={this._getAppName(this.props.activeApp)}
                        />
                        {this._getActiveApp(this.props.activeApp)}
                    </Paper>
                </div>
            </MuiThemeProvider>
        );
    }
}

App.propTypes = {
    activeApp: PropTypes.string
};

export default App;