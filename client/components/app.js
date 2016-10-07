import React from 'react';
import Header from './header';
import FollowersButton from './instagram/followers_button';

export default (props) => {
    return (
        <div>
            {props.children}
        </div>
    );
}