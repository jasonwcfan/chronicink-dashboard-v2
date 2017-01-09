import React, { Component } from 'react';
import { List, ListItem } from 'material-ui/List';
import Paper from 'material-ui/Paper';
import DeleteIcon from 'material-ui/svg-icons/action/delete-forever';
import IconButton from 'material-ui/IconButton';
import BookingDialog from './BookingDialog';
import moment from 'moment';

class BookingsList extends Component {
    constructor() {
        super();
    }

    _renderBookings(bookings) {
        return bookings.map((booking, idx) => {
            const _handleDeleteBooking = (event) => {
                this.props.deleteBooking(idx);
            };
            return (
                <ListItem
                    primaryText={booking.type + ' ' + (booking.bookingNum)}
                    secondaryText={moment(booking.date).format('MMM Do YYYY: ') + moment(booking.startTime).format('h:mm A') + ' to ' + moment(booking.endTime).format('h:mm A')}
                    key={idx}
                    rightIconButton={<IconButton onClick={_handleDeleteBooking}><DeleteIcon /></IconButton>}
                />
            )
        })
    }

    render() {
        const style = {
            root: {
                marginBottom: 200,
                marginRight: 24,
                maxWidth: 360,
                width: '100%',
            },
            listContainer: {
                backgroundColor: '#404040',
                height: this.props.bookings.length * 72 || 144,
                overflow: 'hidden',
            },
            dialogContainer: {
                backgroundColor: '#404040',
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'flex-end',
                alignItems: 'flex-end'
            }
        };

        return (
            <Paper style={style.root} zDepth={5}>
                <List style={style.listContainer}>
                    {this._renderBookings(this.props.bookings)}
                </List>
                <div style={style.dialogContainer}>
                    <BookingDialog onSubmitBooking={this.props.onSubmitBooking} />
                </div>
            </Paper>
        )
    }
}

export default BookingsList;