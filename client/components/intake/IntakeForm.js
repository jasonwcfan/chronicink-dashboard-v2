import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import {Tabs, Tab} from 'material-ui/Tabs';
import TextField from 'material-ui/TextField';
import Slider from 'material-ui/Slider';
import ClientInfoPane from './ClientInfoPane';
import RaisedButton from 'material-ui/RaisedButton';

class IntakeForm extends Component {
    render() {
        return (
            <div>
                <AppBar title="Intake" />
                <Tabs >
                    <Tab label="Client Info">
                        <div>
                            <TextField hintText="First Name" />
                            <Slider name="slider0" defaultValue={0.5} />
                        </div>
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
            </div>
        );
    }
}

export default IntakeForm;