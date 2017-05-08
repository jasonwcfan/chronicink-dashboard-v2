import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import Paper from 'material-ui/Paper';
import Colors from 'material-ui/styles/colors';
import Divider from 'material-ui/Divider';;
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import UpdateIcon from 'material-ui/svg-icons/action/update';
import FlatButton from 'material-ui/FlatButton';
import SortUpIcon from 'material-ui/svg-icons/navigation/arrow-drop-up';
import SortDownIcon from 'material-ui/svg-icons/navigation/arrow-drop-down';
import Artist from '../../../../imports/Artist/artist';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import Moment from 'moment-timezone';


const style = {
    widgetContainer: {
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
        height:'70vh',
        overflowY: 'hidden'
    },
    tableBody: {
        overflowY: 'auto',
        height:'55vh'
    },
    tableHeaderColumn: {
        justifyContent: 'space-between'
    },
    sortButtons: {
        width: '100%',
        textAlign: 'left'
    },
};

class ArtistStats extends Component {
    constructor(props) {
        super(props);

        this.state = {
            timeFrame: 30,
            artists: [],
            sortByName: 'none', //'none' or 'asc' or 'desc'
            sortByHoursBooked: 'none', //'none' or 'asc' or 'desc'
            sortByEarliestOpening: 'none' //'none' or 'asc' or 'desc'
        };

        this._handleChangeTimeFrame = this._handleChangeTimeFrame.bind(this);
        this._handleRefreshArtistStats = this._handleRefreshArtistStats.bind(this);

        this._sortByName = this._sortByName.bind(this);
        this._sortByNameAscending = this._sortByNameAscending.bind(this);
        this._sortByNameDescending = this._sortByNameDescending.bind(this);

        this._sortByHoursBooked = this._sortByHoursBooked.bind(this);

        this._sortByEarliestOpening = this._sortByEarliestOpening.bind(this);
        this._sortByEarliestOpeningAscending = this._sortByEarliestOpeningAscending.bind(this);
        this._sortByEarliestOpeningDescending = this._sortByEarliestOpeningDescending.bind(this);

        this._handleRefreshArtistStats(this.state.timeFrame);
    }

    _sortByNameAscending() {
        this.props.artists.sort(function (a,b){
            var nameA = a.name.toUpperCase(); // ignore upper and lowercase
            var nameB = b.name.toUpperCase(); // ignore upper and lowercase

            if (nameA > nameB) {
                return 1;
            }
            else if (nameA < nameB) {
                return -1;
            }
            else {
                // names must be equal
                return 0
            }
        });
    }

    _sortByNameDescending() {
        this.props.artists.sort(function (a,b){
            var nameA = a.name.toUpperCase(); // ignore upper and lowercase
            var nameB = b.name.toUpperCase(); // ignore upper and lowercase

            if (nameA > nameB) {
                return -1;
            }
            else if (nameA < nameB) {
                return 1;
            }
            else {
                // names must be equal
                return 0
            }
        });
    }

    _sortByName() {
        switch(this.state.sortByName) {
            case 'asc':
                this.setState({sortByName:'desc'});
                this.setState({sortByHoursBooked:'none'});
                this.setState({sortByEarliestOpening:'none'});
                this._sortByNameDescending();
                break;
            case 'desc':
                this.setState({sortByName:'none'});
                break;
            case 'none':
                this.setState({sortByName:'asc'});
                this.setState({sortByHoursBooked:'none'});
                this.setState({sortByEarliestOpening:'none'});
                this._sortByNameAscending();
                break;
            default:
                this.setState({sortByName:'none'});
        }
    }

    _sortByHoursBookedAscending() {
        this.props.artists.sort(function (a,b){
            // Create key for # of hours in timeFrame
            let key = 'hoursIn' + String(this.state.timeFrame) + 'Days';

            var hoursBookedA = a[key] ? a[key] : null;
            var hoursBookedB = b[key] ? b[key] : null;

            if (hoursBookedA && hoursBookedB) {
                return hoursBookedA - hoursBookedB;
            }
            else if (hoursBookedA && !hoursBookedB) {
                return -1;
            }
            else if (!hoursBookedA && hoursBookedB) {
                return 1;
            }
            else if (!hoursBookedA && !hoursBookedB) {
                return 0;
            }
        });
    }

    _sortByHoursBookedDescending() {
        this.props.artists.sort(function (a,b){
            // Create key for # of hours in timeFrame
            let key = 'hoursIn' + String(this.state.timeFrame) + 'Days';

            var hoursBookedA = a[key] != null ? a[key] : null;
            var hoursBookedB = b[key] != null ? b[key] : null;

            if (hoursBookedA && hoursBookedB) {
                return hoursBookedB - hoursBookedA;
            }
            else if (hoursBookedA && !hoursBookedB) {
                return -1;
            }
            else if (!hoursBookedA && hoursBookedB) {
                return 1;
            }
            else if (!hoursBookedA && !hoursBookedB) {
                return 0;
            }
        });
    }

    _sortByHoursBooked() {
        switch(this.state.sortByHoursBooked) {
            case 'asc':
                this.setState({sortByHoursBooked:'desc'});
                this.setState({sortByName:'none'});
                this.setState({sortByEarliestOpening:'none'});
                this._sortByEarliestOpeningDescending();
                break;
            case 'desc':
                this.setState({sortByHoursBooked:'none'});
                break;
            case 'none':
                this.setState({sortByHoursBooked:'asc'});
                this.setState({sortByName:'none'});
                this.setState({sortByEarliestOpening:'none'});
                this._sortByEarliestOpeningAscending();
                break;
            default:
                this.setState({sortByHoursBooked:'none'});
        }
    }

    _sortByEarliestOpeningAscending() {
        this.props.artists.sort(function (a,b){
            var earliestOpeningA = a.earliestOpening != null ? Moment(a.earliestOpening.startTime) : null;
            var earliestOpeningB = b.earliestOpening != null ? Moment(b.earliestOpening.startTime) : null;

            if (earliestOpeningA && earliestOpeningB) {
                if (earliestOpeningA.isAfter(earliestOpeningB)) {
                    return 1;
                }
                else if (earliestOpeningA.isBefore(earliestOpeningB)) {
                    return -1;
                }
                else {
                    // names must be equal
                    return 0;
                }
            }
            else if (earliestOpeningA && !earliestOpeningB) {
                return -1;
            }
            else if (!earliestOpeningA && earliestOpeningB) {
                return 1;
            }
            else if (!earliestOpeningA && !earliestOpeningB) {
                return 0;
            }
        });
    }

    _sortByEarliestOpeningDescending() {
        this.props.artists.sort(function (a,b){
            var earliestOpeningA = a.earliestOpening ? Moment(a.earliestOpening.startTime) : null;
            var earliestOpeningB = b.earliestOpening ? Moment(b.earliestOpening.startTime) : null;

            if (earliestOpeningA && earliestOpeningB) {
                if (earliestOpeningA.isAfter(earliestOpeningB)) {
                    return -1;
                }
                else if (earliestOpeningA.isBefore(earliestOpeningB)) {
                    return 1;
                }
                else {
                    // names must be equal
                    return 0;
                }
            }
            else if (earliestOpeningA && !earliestOpeningB) {
                return -1;
            }
            else if (!earliestOpeningA && earliestOpeningB) {
                return 1;
            }
            else if (!earliestOpeningA && !earliestOpeningB) {
                return 0;
            }
        });
    }

    _sortByEarliestOpening() {
        switch(this.state.sortByEarliestOpening) {
            case 'asc':
                this.setState({sortByEarliestOpening:'desc'});
                this.setState({sortByName:'none'});
                this.setState({sortByHoursBooked:'none'});
                this._sortByEarliestOpeningDescending();
                break;
            case 'desc':
                this.setState({sortByEarliestOpening:'none'});
                break;
            case 'none':
                this.setState({sortByEarliestOpening:'asc'});
                this.setState({sortByName:'none'});
                this.setState({sortByHoursBooked:'none'});
                this._sortByEarliestOpeningAscending()
                break;
            default:
                this.setState({sortByEarliestOpening:'none'});
        }
    }

    _renderSortIcon(fieldName){
        let icon = null;

        if (this.state[fieldName]=='desc') {
            icon=<SortUpIcon/>;
        }
        else if (this.state[fieldName]=='asc') {
            icon=<SortDownIcon/>;
        }

        return icon;

    }

    _handleRefreshArtistStats(timeFrame) {
        // Calls back-end method to store artist hours in database
        Meteor.call('artist.getHoursBooked', timeFrame);
        // Meteor.call('artist.getEarliestOpening');
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
                const message = artist[key] != null ?  artist[key] : 'Error';


                return (

                    <TableRow key={artist.calendarID}>
                        <TableRowColumn>{artist.name}</TableRowColumn>
                        <TableRowColumn>{message}</TableRowColumn>
                        {/*<TableRowColumn>{artist.earliestOpening ? Moment(artist.earliestOpening.startTime).format("MMM Do YYYY") : '' }</TableRowColumn>*/}
                    </TableRow>

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

                <Table selectable={false} fixedHeader={true} style={style.table}>
                    <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
                        <TableRow>
                            <TableHeaderColumn style={style.tableHeaderColumn} tooltip="Click to sort">
                                <FlatButton
                                    label="Name"
                                    style={style.sortButtons}
                                    onTouchTap={this._sortByName}
                                    labelPosition="before"
                                    icon={this._renderSortIcon('sortByName')}
                                />


                            </TableHeaderColumn>
                            <TableHeaderColumn tooltip="Click to sort">
                                <FlatButton
                                    label="Hours Booked"
                                    style={style.sortButtons}
                                    onTouchTap={this._sortByHoursBooked}
                                    labelPosition="before"
                                    icon={this._renderSortIcon('sortByHoursBooked')}
                                />
                            </TableHeaderColumn>
                            {/*<TableHeaderColumn tooltip="Click to sort">*/}
                                {/*<FlatButton*/}
                                    {/*label="Earliest Opening"*/}
                                    {/*style={style.sortButtons}*/}
                                    {/*onTouchTap={this._sortByEarliestOpening}*/}
                                    {/*labelPosition="before"*/}
                                    {/*icon={this._renderSortIcon('sortByEarliestOpening')}*/}
                                {/*/>*/}
                            {/*</TableHeaderColumn>*/}
                        </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={false} style={style.tableBody}>
                        {this._renderArtistStats()}
                    </TableBody>
                </Table>

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
