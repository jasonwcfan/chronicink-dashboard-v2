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

injectTapEventPlugin();

const style = {
    app: {
        display: 'flex'
    },
    sideNavBar: {
        width: 200
    }
};

class App extends Component {
    constructor(props) {
        super(props);
        console.log(props);
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

    render() {
        return (
            <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
                <div style={style.app}>
                    <SideNavBar style={style.sideNavBar} onChangeApp={this.props.onChangeApp} />
                    <Paper zDepth={4}>
                        <AppBar
                            title={this.props.activeApp.label}
                        />
                        {this._getActiveApp(this.props.activeApp)}
                    </Paper>
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