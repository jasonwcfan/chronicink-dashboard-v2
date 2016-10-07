import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

class FollowersButton extends Component {
    onFollowersButtonClick() {
        const token = this.props.location.hash.split('=')[1];
        Meteor.call('fetchFollowers', token);
    }

    render() {
        return (
            <button
                className="btn btn-primary"
                onClick={this.onFollowersButtonClick.bind(this)}>
                Get Followers
            </button>
        );
    }
}

export default FollowersButton;