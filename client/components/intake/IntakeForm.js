import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import {Tabs, Tab} from 'material-ui/Tabs';
import TextField from 'material-ui/TextField';
import Slider from 'material-ui/Slider';
import Paper from 'material-ui/Paper';
import ClientInfoPane from './ClientInfoPane';
import RaisedButton from 'material-ui/RaisedButton';

class IntakeForm extends Component {

    render() {
        return (
            <Paper zDepth={4}>
                <AppBar title="Intake" />
                <Tabs>
                    <Tab label="Client Info">
                        <ClientInfoPane />
                    </Tab>
                    <Tab label="Booking Info">
                        Booking Info Pane
                    </Tab>
                    <Tab label="Calendar">
                        Calendar Pane
                    </Tab>
                    <Tab label="Recommendations">
                        Recommendations Pane
                    </Tab>
                </Tabs>
                {/** <Tabs selected={0}>
                    <ClientInfoPane label="Client Info" />
                    <Pane label="Booking Info">
                        <RaisedButton label="Default" />
                    </Pane>
                    <Pane label="Calendar">
                        <div>This is my tab 3 contents!</div>
                    </Pane>
                    <Pane label="Recommendations">
                        <div>This is my tab 4 contents!</div>
                    </Pane>
                </Tabs> **/}
            </Paper>
        );
    }
}

export default IntakeForm;