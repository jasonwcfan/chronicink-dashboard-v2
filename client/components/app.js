import React from 'react';
import Header from './header';
import FollowersButton from './instagram/followers_button';
import {Tabs, Pane} from './navigation';

export default (props) => {
    return (
        <div>
            <Tabs selected={0}>
                <Pane label="Tab 1">
                    <div>This is my tab 1 contents!</div>
                </Pane>
                <Pane label="Tab 2">
                    <div>This is my tab 2 contents!</div>
                </Pane>
                <Pane label="Tab 3">
                    <div>This is my tab 3 contents!</div>
                </Pane>
            </Tabs>
        </div>
    );
}