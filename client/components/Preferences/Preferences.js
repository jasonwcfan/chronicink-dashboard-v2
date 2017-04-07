import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import {Tabs, Tab} from 'material-ui/Tabs';
import Artist from '../../../imports/Artist/artist';
import App from '../app';
import ArtistStyleGuide from './ArtistStyleGuide';

const style = {
    tabs: {
        width: '100%'
    },
    container: {
        margin: 5
    }

};

class Preferences extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    render() {
        return (
            <App appName='Preferences'>
                <Tabs style={style.tabs}>
                    <Tab label='Application'>
                        <div style={style.container}>
                            UNDER CONSTRUCTION
                        </div>
                    </Tab>
                    <Tab label='Style Guide'>
                        <div style={style.container}>
                            <ArtistStyleGuide />
                        </div>
                    </Tab>
                </Tabs>
            </App>
        );
    }
}


Preferences.propTypes = {

};

export default Preferences = createContainer(({ match }) => {
    const artistSubscription = Meteor.subscribe('artist');

    return {
        subReady: artistSubscription.ready(),
        artists: Artist.find().fetch()
    }
}, Preferences);
