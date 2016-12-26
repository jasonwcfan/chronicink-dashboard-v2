import React, { Component, PropTypes } from 'react';
import Paper from 'material-ui/Paper';
import Colors from 'material-ui/styles/colors';
import Divider from 'material-ui/Divider';
import { List, ListItem } from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import EditIcon from 'material-ui/svg-icons/content/create';
import LinkWrapper from '../../UI/LinkWrapper';
import { startConsultation } from '../../../actions/Dashboard/Widgets/IntakeList';
import { createContainer } from 'meteor/react-meteor-data';
import Artist from '../../../../imports/Artist/artist';

const style = {
    intakeListContainer: {
        width: 300,
        height: 600,
        margin: 20,
        borderStyle: 'solid',
        borderColor: Colors.grey600,
    },
    header: {
        margin: 10
    },
    listItemContainer: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%'
    },
    listItemLabel: {
        display: 'inline'
    },
    listItemIconButton: {
        position: 'absolute',
        padding: 0,
        height: 24,
        width: 24,
        right: 10,
        bottom: 12
    }
};

class ArtistStats extends Component {
    constructor(props) {
        super(props);
    }

    _handleClickArtist() {
        Meteor.call('artist.getBookedHours', 'TestArtist', 90, function(err, res) {
            if (err) {
                console.log(err);
                return;
            }
            console.log(res);
        });
    }

    _renderArtistStats() {
        if (this.props.subReady) {
            return this.props.artists.map((artist) => (
                <ListItem key={artist._id}>
                    <div style={style.listItemContainer} onClick={this._handleClickArtist}>
                        <div style={style.listItemLabel}>{artist.name}</div>
                    </div>
                </ListItem>
            ));
        }
        return null;
    }

    render() {
        return (
            <Paper style={style.intakeListContainer} zDepth={3}>
                <h3 style={style.header} >Artist Stats</h3>
                <Divider />
                <List>
                    {this._renderArtistStats()}
                </List>
            </Paper>
        )
    }
}

export default ArtistStats = createContainer(({ params }) => {
    const subscription = Meteor.subscribe('artist');

    return {
        subReady: subscription.ready(),
        artists: Artist.find({}, {limit: 5}).fetch()
    }
}, ArtistStats);