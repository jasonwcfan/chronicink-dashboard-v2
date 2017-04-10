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
    appContainer: {
        display: 'flex',
        height: '100vh'
    },
    appBar: {
        position: 'fixed'
    },
    sideNavBar: {

    },
    content: {
        display: 'flex',
        width: '100%',
        marginTop: 64,
        overflow: 'auto'
    }
};

/**
 * High level wrapper for all dashboard components, setting the Material UI theme and attaching the sidebar and appbar
 */
class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
                <Paper style={style.appContainer} zDepth={4}>
                    <SideNavBar style={style.sideNavBar} onChangeApp={this.props.onChangeApp} />
                    <div style={{width: '100%', display: 'flex'}}>
                        <AppBar
                            style={style.appBar}
                            title={this.props.appName}
                            iconElementRight={<Menu />}
                        />
                        <div style={style.content}>
                            {this.props.children}
                        </div>
                    </div>
                </Paper>
            </MuiThemeProvider>
        );
    }
}

export default App;