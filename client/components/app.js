import React from 'react';
import Header from './header';
import {Tabs, Pane} from './navigation/Tabs';

export default (props) => {
    return (
        <div>
            <Tabs selected={0}>
                <Pane label="Client Info">
                    <div>This is my tab 1 contents!</div>
                </Pane>
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