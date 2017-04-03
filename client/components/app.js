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