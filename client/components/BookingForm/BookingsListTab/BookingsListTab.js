import React, { Component } from 'react';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import BookingsList from './BookingsList';


const style = {
    textField: {
        marginLeft: 5,
        marginRight: 5
    },
    radioGroup: {
        display: 'flex',
        justifyContent: 'flex-start',
        maxWidth: 650
    },
    radioButton: {
        display: 'inline-block',
        padding: 10,
    }
};

class BookingsListTab extends Component {
    constructor() {
        super();
    }
    
    render() {
        return (
            <div style={this.props.style}>
                <h2>Sessions</h2>
                <BookingsList bookings={this.props.bookings} deleteBooking={this.props.deleteBooking} onSubmitBooking={this.props.onSubmitBooking} />
            </div>
        )
    }
}

export default BookingsListTab;