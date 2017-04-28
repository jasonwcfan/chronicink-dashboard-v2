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
import UpdateIcon from 'material-ui/svg-icons/action/update';
import { startConsultation } from '../../../actions/Dashboard/Widgets/IntakeList';
import Artist from '../../../../imports/Artist/artist';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';


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
    table: {
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
            timeFrame: 30,
            artists: [],
        };

        this._handleChangeTimeFrame = this._handleChangeTimeFrame.bind(this);
        this._handleRefreshArtistStats = this._handleRefreshArtistStats.bind(this);

        this._handleRefreshArtistStats(this.state.timeFrame);
    }

    _handleRefreshArtistStats(timeFrame) {
        // Calls back-end method to store artist hours in database
        Meteor.call('artist.getHoursBooked', timeFrame);
        Meteor.call('artist.getEarliestOpening');
    }

    _handleChangeTimeFrame(newTimeFrame) {
        this.setState({
            timeFrame: newTimeFrame
        });

        this._handleRefreshArtistStats(newTimeFrame);
    }

    _renderArtistStats() {
        if (this.props.subReady) {
            // Create key for # of hours in timeFrame
            let key = 'hoursIn' + String(this.state.timeFrame) + 'Days';

            return this.props.artists.map((artist) => {
                const message = artist[key] ?  artist[key] : 'Error';


                return (

                <TableRow key={artist.calendarID}>
                    <TableRowColumn>{artist.name}</TableRowColumn>
                    <TableRowColumn>{message}</TableRowColumn>
                    <TableRowColumn>{artist.earliestOpening ? String(artist.earliestOpening.startDateTime) : '' }</TableRowColumn>
                </TableRow>

                    // <ListItem key={artist.calendarID} primaryText={artist.name}>
                    //     <div style={style.listItemContainer} >
                    //         <div style={style.listItemRightLabel}>{message }</div>
                    //     </div>
                    // </ListItem>
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
                            primaryText='Refresh'
                            insetChildren={true}
                            leftIcon={<UpdateIcon/>}
                            onTouchTap={() => this._handleRefreshArtistStats(this.state.timeFrame)}
                        />
                        <Divider/>
                        <MenuItem
                            primaryText='7 days'
                            insetChildren={true}
                            checked={this.state.timeFrame == 7}
                            onTouchTap={() => this._handleChangeTimeFrame(7)}
                        />
                        <MenuItem
                            primaryText='14 days'
                            insetChildren={true}
                            checked={this.state.timeFrame == 14}
                            onTouchTap={() => this._handleChangeTimeFrame(14)}
                        />
                        <MenuItem
                            primaryText='30 days'
                            insetChildren={true}
                            checked={this.state.timeFrame == 30}
                            onTouchTap={() => this._handleChangeTimeFrame(30)}
                        />
                        <MenuItem
                            primaryText='60 days'
                            insetChildren={true}
                            checked={this.state.timeFrame == 60}
                            onTouchTap={() => this._handleChangeTimeFrame(60)}
                        />
                        <MenuItem
                            primaryText='90 days'
                            insetChildren={true}
                            checked={this.state.timeFrame == 90}
                            onTouchTap={() => this._handleChangeTimeFrame(90)}
                        />
                    </IconMenu>
                </div>
                <Divider />
                {/*<List style={style.list}>*/}
                    {/*{this._renderArtistStats()}*/}
                {/*</List>*/}
                <div style={style.table}>
                <Table selectable={false}>
                    <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
                        <TableRow>
                            <TableHeaderColumn>Name</TableHeaderColumn>
                            <TableHeaderColumn tooltip="Today Onward">Hours Booked</TableHeaderColumn>
                            <TableHeaderColumn>Earliest Opening</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={false}>
                        {this._renderArtistStats()}
                    </TableBody>
                </Table>
                </div>
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