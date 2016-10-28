import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import { Tabs, Pane } from '../navigation/Tabs';
import ClientInfoPane from './ClientInfoPane';
import RaisedButton from 'material-ui/RaisedButton';

class IntakeForm extends Component {
    render() {
        return (
            <div>
                <AppBar title="My AppBar" />
                <Tabs selected={0}>
                    <ClientInfoPane label="Client Info" />
                    <Pane label="Booking Info">
                        <div>This is my tab 2 contents!</div>
                        <RaisedButton label="Default" />
                    </Pane>
                    <Pane label="Calendar">
                        <div>This is my tab 3 contents!</div>
                    </Pane>
                    <Pane label="Recommendations">
                        <div>This is my tab 4 contents!</div>
                    </Pane>
                </Tabs>
            </div>
        );
    }
}

export default IntakeForm;