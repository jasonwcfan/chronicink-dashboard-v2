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
    listItemRightLabel: {
        position: 'absolute',
        right: 10
    }
};

class ArtistStats extends Component {
    constructor(props) {
        super(props);

        this.state = {
            artistStats: []
        }
    }

    componentWillReceiveProps(props) {
        props.artists.forEach((artist) => {
            this._handleFetchArtistStats(artist);
        })
    }

    _handleFetchArtistStats(artist) {
        Meteor.call('artist.getBookedHours', artist.calendarID, 90, (err, res) => {
            if (err) {
                console.log(err);
                return;
            }
            console.log(res);
            this.setState({
                artistStats: this.state.artistStats.concat({
                    calendarID: artist.calendarID,
                    name: artist.name,
                    bookedHours: res
                })
            })
        });
    }

    _renderArtistStats() {
        if (this.props.subReady) {
            return this.state.artistStats.map((artistStat) => (
                <ListItem key={artistStat.calendarID}>
                    <div style={style.listItemContainer} >
                        <div style={style.listItemLabel}>{artistStat.name}</div>
                        <div style={style.listItemRightLabel}>{artistStat.bookedHours + ' hours booked'}</div>
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
        // Test by only using artists with a test calendar
        artists: Artist.find({'testCalendar': true}, {limit: 5}).fetch()
    }
}, ArtistStats);