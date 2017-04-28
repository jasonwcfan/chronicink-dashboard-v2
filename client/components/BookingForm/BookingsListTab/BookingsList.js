import React, { Component } from 'react';
import { List, ListItem } from 'material-ui/List';
import DeleteIcon from 'material-ui/svg-icons/action/delete-forever';
import IconButton from 'material-ui/IconButton';
import NewBookingDialog from './NewBookingDialog';
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
                maxWidth: 360,
                width: '100%',
            },
            listContainer: {
                overflow: 'hidden',
            },
            dialogContainer: {

            }
        };

        return (
            <div style={style.root}>
                <List style={style.listContainer}>
                    {this._renderBookings(this.props.bookings)}
                </List>
                <div style={style.dialogContainer}>
                    <NewBookingDialog onSubmitBooking={this.props.onSubmitBooking} />
                </div>
            </div>
        )
    }
}

export default BookingsList;