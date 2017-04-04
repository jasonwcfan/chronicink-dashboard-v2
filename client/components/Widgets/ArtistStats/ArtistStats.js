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
        maxHeight: '70vh',
        minHeight: 600,
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
            timeFrame: 'sixtyDays'
        };

        this._handleChangeTimeFrame = this._handleChangeTimeFrame.bind(this);
        this._handleRefreshArtistStats = this._handleRefreshArtistStats.bind(this);
    }

    componentWillReceiveProps(props) {
        this._handleRefreshArtistStats(props.artists, this.state.timeFrame);
    }

    _handleRefreshArtistStats(artists, timeFrame) {
        artists.forEach((artist) => {
            Meteor.call('artist.getHoursBooked', artist.calendarID, timeFrame);
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
            return this.props.artists.map((artist) => {
                const hoursBooked = artist.hoursBooked[this.state.timeFrame];
                console.log(hoursBooked);
                const message = hoursBooked != null ? hoursBooked + ' hours booked' : 'Error';
                return (
                    <ListItem key={artist.calendarID} primaryText={artist.name}>
                        <div style={style.listItemContainer} >
                            <div style={style.listItemRightLabel}>
                                {message}
                            </div>
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
                            checked={this.state.timeFrame == 'sevenDays'}
                            onTouchTap={this._handleChangeTimeFrame.bind(this, 'sevenDays')}
                        />
                        <MenuItem
                            primaryText='14 days'
                            insetChildren={true}
                            checked={this.state.timeFrame == 'fourteenDays'}
                            onTouchTap={this._handleChangeTimeFrame.bind(this, 'fourteenDays')}
                        />
                        <MenuItem
                            primaryText='30 days'
                            insetChildren={true}
                            checked={this.state.timeFrame == 'thirtyDays'}
                            onTouchTap={this._handleChangeTimeFrame.bind(this, 'thirtyDays')}
                        />
                        <MenuItem
                            primaryText='60 days'
                            insetChildren={true}
                            checked={this.state.timeFrame == 'sixtyDays'}
                            onTouchTap={this._handleChangeTimeFrame.bind(this, 'sixtyDays')}
                        />
                        <MenuItem
                            primaryText='90 days'
                            insetChildren={true}
                            checked={this.state.timeFrame == 'ninetyDays'}
                            onTouchTap={this._handleChangeTimeFrame.bind(this, 'ninetyDays')}
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
        artists: Artist.find({}).fetch()
    }
}, ArtistStats);