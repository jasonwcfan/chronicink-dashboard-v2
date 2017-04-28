import React, { Component, PropTypes } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Paper from 'material-ui/Paper';
import AppBar from 'material-ui/AppBar';
import SideNavBar from './SideNavBar';
import Menu from './Menu';

injectTapEventPlugin();

const style = {
    appContainer: {
        display: 'flex',
        height: '100vh',
        width: '100%'
    },
    appBar: {
        position: 'fixed',
        right: 0,
        left: 240,
        width: 'initial'

    },
    sideNavBar: {

    },
    contentContainer: {
        display: 'flex',
        width: '100%'
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
            <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
                <Paper style={style.appContainer} zDepth={4}>
                    <SideNavBar style={style.sideNavBar} onChangeApp={this.props.onChangeApp} />
                    <div style={style.contentContainer}>
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