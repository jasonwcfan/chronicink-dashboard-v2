import React, { Component, PropTypes } from 'react';
import Paper from 'material-ui/Paper';
import Colors from 'material-ui/styles/colors';
import Divider from 'material-ui/Divider';
import { List, ListItem } from 'material-ui/List';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import { startConsultation } from '../../../actions/Dashboard/Widgets/IntakeList';
import { createContainer } from 'meteor/react-meteor-data';
import Artist from '../../../../imports/Artist/artist';

const style = {
    widgetContainer: {
        width: 300,
        height: 600,
        margin: 20,
        borderStyle: 'solid',
        borderColor: Colors.grey600,
    },
    headerContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    header: {
        marginLeft: 10
    },
    menuIcon: {
        display: 'inline'
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
            <Paper style={style.widgetContainer} zDepth={3}>
                <div style={style.headerContainer}>
                    <h3 style={style.header} >Artist Stats</h3>
                    <IconMenu
                        style={style.menuIcon}
                        iconButtonElement={<IconButton><MenuIcon /></IconButton>}
                        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                        targetOrigin={{horizontal: 'right', vertical: 'top'}}
                    >
                        <MenuItem primaryText='7 days' />
                        <MenuItem primaryText='14 days' />
                        <MenuItem primaryText='30 days' />
                        <MenuItem primaryText='60 days' />
                        <MenuItem primaryText='90 days' />
                    </IconMenu>
                </div>
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