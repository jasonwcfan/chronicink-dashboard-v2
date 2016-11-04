import React from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Header from './header';
import Intake from './Intake';

injectTapEventPlugin();

export default (props) => {
    return (
        <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
            <Intake />
        </MuiThemeProvider>
    );
}