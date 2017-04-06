import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import Paper from 'material-ui/Paper';
import Colors from 'material-ui/styles/colors';
import Divider from 'material-ui/Divider';
import { List, ListItem } from 'material-ui/List';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import CircularProgress from 'material-ui/CircularProgress';
import { startConsultation } from '../../../actions/Dashboard/Widgets/IntakeList';
import Artist from '../../../../imports/Artist/artist';

const style = {
    widgetContainer: {
        width: 300,
        maxHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        margin: 20,
        borderStyle: 'solid',
        borderColor: Colors.grey600
    },
    headerContainer: {
        display: 'flex',
        minHeight: 50,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    header: {
        marginLeft: 10
    },
    menuIcon: {
        display: 'inline'
    },
    list: {
        overflow: 'auto',
        overflowX: 'hidden'
    },
    listItemContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'space-between',
        justifyContent: 'space-between'
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
        this._handleRefreshArtistStats(props.artists, 30);
    }

    _handleReceiveArtistStats(artist, artistIndex, err, hoursBooked) {
        const nextArtistStats = this.state.artistStats.slice();
        nextArtistStats[artistIndex] = {
            calendarID: artist.calendarID,
            name: artist.name,
            status: err,
            hoursBooked: hoursBooked,
            loading: false
        };

        this.setState({
            artistStats: nextArtistStats
        })
    }


    _handleRefreshArtistStats(artists, timeFrame) {
        const nextArtistStats = this.state.artistStats.slice();

        artists.forEach((artist, idx) => {
            nextArtistStats[idx] = {
                calendarID: artist.calendarID,
                name: artist.name,
                status: null,
                hoursBooked: null,
                loading: true
            };

            Meteor.call('artist.getHoursBooked', artist.calendarID, timeFrame, (err, res) => {
                this._handleReceiveArtistStats(artist, idx, err, res);
            });
        });

        this.setState({
            artistStats: nextArtistStats
        });
    }

    _handleChangeTimeFrame(newTimeFrame) {
        this.setState({
            timeFrame: newTimeFrame
        });

        this._handleRefreshArtistStats(this.props.artists, newTimeFrame);
    }

    _renderArtistStats() {
        if (this.props.subReady) {
            return this.state.artistStats.map((artistStat) => {
                const message = artistStat.status ? 'Error' : artistStat.hoursBooked + ' hours booked';
                return (
                    <ListItem key={artistStat.calendarID} primaryText={artistStat.name}>
                        <div style={style.listItemContainer} >
                            <div style={style.listItemRightLabel}>{artistStat.loading ?
                                <CircularProgress
                                    size={16}
                                />
                                : message }</div>
                        </div>
                    </ListItem>
                )
            });
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
                <List style={style.list}>
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
        artists: Artist.find({}, ).fetch()
    }
}, ArtistStats);