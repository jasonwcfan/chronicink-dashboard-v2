import React, { Component } from 'react';
import { Tabs, Pane } from '../navigation/Tabs';
import ClientInfoPane from './ClientInfoPane';

class IntakeForm extends Component {
    render() {
        return (
            <div>
                <Tabs selected={0}>
                    <ClientInfoPane label="Client Info" />
                    <Pane label="Booking Info">
                        <div>This is my tab 2 contents!</div>
                    </Pane>
                    <Pane label="Calendar">
                        <div>This is my tab 3 contents!</div>
                    </Pane>
                    <Pane label="Recommendations">
                        <div>This is my tab 3 contents!</div>
                    </Pane>
                </Tabs>
            </div>
        );
    }
}

export default IntakeForm;