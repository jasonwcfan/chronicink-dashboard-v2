import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import Moment from 'moment';
import SelectField from 'material-ui/SelectField';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';
import CircularProgress from 'material-ui/CircularProgress';
import Artist from '../../../imports/Artist/artist';
import App from '../app';

const style = {
    buttonContainer: {
        marginBottom: 24
    }
};

class Cancellations extends Component {
    constructor() {
        super();

        this.state = {
            selectedArtist: null,
            calendarId: null,
            date: null,
            time: null,
            isLoading: false,
            cancellationList: []
        };

        this._handleArtistChange = this._handleArtistChange.bind(this);
        this._renderArtistSelect = this._renderArtistSelect.bind(this);
        this._handleDateChange = this._handleDateChange.bind(this);
        this._handleTimeChange = this._handleTimeChange.bind(this);
        this._handleTouchGenerateListButton = this._handleTouchGenerateListButton.bind(this);
        this._renderTableRows = this._renderTableRows.bind(this);
    }

    _handleArtistChange(event, key, artistId) {
        let artist = null;
        this.props.artists.forEach((elem) => {
            if (elem._id._str == artistId) {
                artist = elem;
            }
        });

        this.setState({
            selectedArtist: artistId,
            calendarId: artist.calendarID
        })
    }

    _handleDateChange(_, date) {
        this.setState({
            date
        })
    }

    _handleTimeChange(_, time) {
        this.setState({
            time
        })
    }

    _handleTouchGenerateListButton() {
        this.setState({
            isLoading: true
        });
        Meteor.call('client.getCancellationList', this.state.selectedArtist, this.state.date, this.state.time, (err, res) => {
            if (err) {console.log(err); return;}
            this.setState({
                cancellationList: res,
                isLoading: false
            })
        })
    }

    _renderArtistSelect(artists) {
        return artists.map((artist) =>
            <MenuItem
                primaryText={artist.name}
                value={artist._id._str}
                key={artist._id}
            />
        )
    }

    _renderTableRows() {
        return this.state.cancellationList.map((item) => {
            return (
                <TableRow key={item.client._id}>
                    <TableRowColumn>{`${item.client.firstName} ${item.client.lastName}`}</TableRowColumn>
                    <TableRowColumn>{
                        <a
                            href={item.event.htmlLink}
                            target='_blank'
                        >
                            {Moment(item.event.start.dateTime).fromNow()}
                        </a>}</TableRowColumn>
                    <TableRowColumn>{item.client.primaryPhoneNumber}</TableRowColumn>
                    <TableRowColumn>{item.client.email}</TableRowColumn>
                </TableRow>
            )
        })
    }

    render() {
        return this.props.subReady ? (
            <App appName='Cancellations'>
                <SelectField
                    onChange={this._handleArtistChange}
                    value={this.state.selectedArtist}
                    floatingLabelText='Artist'
                >
                    {this._renderArtistSelect(this.props.artists)}
                </SelectField>
                <DatePicker
                    hintText='Cancellation Date'
                    onChange={this._handleDateChange}
                />
                <TimePicker
                    hintText='Time'
                    onChange={this._handleTimeChange}
                />
                <div style={style.buttonContainer}>
                    {this.state.isLoading ? <CircularProgress /> :
                    <RaisedButton
                        label='Generate List'
                        onTouchTap={this._handleTouchGenerateListButton}
                        primary={true}
                    />}
                </div>
                {this.state.cancellationList.length > 0 ?
                    <Table
                        selectable={false}
                    >
                        <TableHeader>
                            <TableRow>
                                <TableHeaderColumn>Name</TableHeaderColumn>
                                <TableHeaderColumn>Next Appointment</TableHeaderColumn>
                                <TableHeaderColumn>Phone #</TableHeaderColumn>
                                <TableHeaderColumn>Email</TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {this._renderTableRows()}
                        </TableBody>
                    </Table> : null
                }
            </App>
        ) : null
    }
}

export default Cancellations = createContainer(({ }) => {
    const artistSubscription = Meteor.subscribe('artist');

    return {
        subReady: artistSubscription.ready(),
        artists: Artist.find().fetch()
    }
}, Cancellations);