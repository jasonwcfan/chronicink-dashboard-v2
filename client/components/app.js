import React, { Component, PropTypes } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Paper from 'material-ui/Paper';
import AppBar from 'material-ui/AppBar';
import SideNavBar from './SideNavBar';
import Menu from './Menu';

injectTapEventPlugin();

const style = {
    window: {
        display: 'flex'
    },
    appContainer: {
        width: '100%'
    }
};

class App extends Component {
    constructor(props) {
        super(props);
    }

    // Eventually move app routing elsewhere...
    // _getActiveApp() {
    //     const activeApp = this.props.params.appname;
    //     if (activeApp) {
    //         switch (activeApp.toLowerCase()) {
    //             case 'booking':
    //                 return <BookingForm clientID={this.props.location.query.clientID} />;
    //             case 'dashboard':
    //                 return <DashboardContainer />;
    //             default:
    //                 return <DashboardContainer />;
    //         }
    //     } else {
    //         return <DashboardContainer />
    //     }
    // }

    render() {
        return (
            <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
                <div style={style.window} className='appContainer'>
                    <SideNavBar onChangeApp={this.props.onChangeApp} />
                    <Paper style={style.appContainer} zDepth={4}>
                        <AppBar
                            title={this.props.appName}
                            iconElementRight={<Menu />}
                        />
                        {this.props.children}
                    </Paper>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default App;