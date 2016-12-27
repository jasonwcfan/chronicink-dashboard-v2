import React, { Component, PropTypes } from 'react';
import Paper from 'material-ui/Paper';
import Colors from 'material-ui/styles/colors';
import Divider from 'material-ui/Divider';
import { List, ListItem } from 'material-ui/List';
import IconMenu from 'material-ui/IconMenu';
import CircularProgress from 'material-ui/CircularProgress';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
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
        alignItems: 'space-between',
        justifyContent: 'space-between'
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
            artistStats: [],
            timeFrame: 30
        };

        this._handleChangeTimeFrame = this._handleChangeTimeFrame.bind(this);
        this._handleRefreshArtistStats = this._handleRefreshArtistStats.bind(this);
    }

    componentWillReceiveProps(props) {
        props.artists.forEach((artist, idx) => {
            const nextArtistStats = this.state.artistStats.slice();
            nextArtistStats[idx] = {
                calendarID: artist.calendarID,
                name: artist.name,
                hoursBooked: null,
                loading: true
            };

            this.setState({
                artistStats: nextArtistStats
            });

            Meteor.call('artist.getHoursBooked', artist.calendarID, this.state.timeFrame, (err, res) => {
                if (err) {
                    console.log(err);
                    return;
                }
                console.log(res);
                this._handleReceiveArtistStats(artist, idx, res);
            });
        })
    }

    _handleReceiveArtistStats(artist, artistIndex, hoursBooked) {
        const nextArtistStats = this.state.artistStats.slice();
        nextArtistStats[artistIndex] = {
            calendarID: artist.calendarID,
            name: artist.name,
            hoursBooked: hoursBooked,
            loading: false
        };

        this.setState({
            artistStats: nextArtistStats
        })
    }


    _handleRefreshArtistStats(timeFrame) {
        this.props.artists.forEach((artist, idx) => {
            const nextArtistStats = this.state.artistStats.slice();
            nextArtistStats[idx] = {
                calendarID: artist.calendarID,
                name: artist.name,
                hoursBooked: null,
                loading: true
            };

            this.setState({
                artistStats: nextArtistStats
            });

            Meteor.call('artist.getHoursBooked', artist.calendarID, timeFrame, (err, res) => {
                if (err) {
                    console.log(err);
                    return;
                }
                console.log(res);
                this._handleReceiveArtistStats(artist, idx, res);
            });
        })
    }

    _handleChangeTimeFrame(newTimeFrame) {
        this.setState({
            timeFrame: newTimeFrame
        });

        this._handleRefreshArtistStats(newTimeFrame);
    }

    _renderArtistStats() {
        if (this.props.subReady) {
            return this.state.artistStats.map((artistStat) => (
                <ListItem key={artistStat.calendarID}>
                    <div style={style.listItemContainer} >
                        <div style={style.listItemLabel}>{artistStat.name}</div>
                        <div style={style.listItemRightLabel}>{artistStat.loading ?
                            <CircularProgress
                                size={16}
                            />
                            : artistStat.hoursBooked + ' hours booked'}</div>
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
                        anchorOrigin={{horizontal: 'left', vertical: 'top'}}
                        targetOrigin={{horizontal: 'left', vertical: 'top'}}
                    >
                        <MenuItem
                            primaryText='7 days'
                            insetChildren={true}
                            checked={this.state.timeFrame == 7}
                            onTouchTap={this._handleChangeTimeFrame.bind(this, 7)}
                        />
                        <MenuItem
                            primaryText='14 days'
                            insetChildren={true}
                            checked={this.state.timeFrame == 14}
                            onTouchTap={this._handleChangeTimeFrame.bind(this, 14)}
                        />
                        <MenuItem
                            primaryText='30 days'
                            insetChildren={true}
                            checked={this.state.timeFrame == 30}
                            onTouchTap={this._handleChangeTimeFrame.bind(this, 30)}
                        />
                        <MenuItem
                            primaryText='60 days'
                            insetChildren={true}
                            checked={this.state.timeFrame == 60}
                            onTouchTap={this._handleChangeTimeFrame.bind(this, 60)}
                        />
                        <MenuItem
                            primaryText='90 days'
                            insetChildren={true}
                            checked={this.state.timeFrame == 90}
                            onTouchTap={this._handleChangeTimeFrame.bind(this, 90)}
                        />
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