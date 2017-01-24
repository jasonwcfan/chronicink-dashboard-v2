import React, { Component, PropTypes } from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import ValidatedTextField from '../../Inputs/ValidatedTextField';
import BookingsList from './BookingsList';


const style = {
    container: {
        margin: 5
    },
    bookedThruSelectField: {
        display: 'block'
    }
};

class BookingsListTab extends Component {
    constructor() {
        super();
    }
    
    render() {
        return (
            <div style={style.container}>
                <h2>Sessions</h2>
                <BookingsList bookings={this.props.bookings} deleteBooking={this.props.deleteBooking} onSubmitBooking={this.props.onSubmitBooking} />
                <ValidatedTextField
                    name='bookedBy'
                    defaultValue={this.props.bookedBy}
                    floatingLabelText='Booked by...'
                    onFieldChange={this.props.setBookedBy}
                    required={true}
                />
                <SelectField
                    style={style.bookedThruSelectField}
                    value={this.props.bookedThru}
                    onChange={this.props.setBookedThru}
                >
                    <MenuItem value='by phone' primaryText='By phone' />
                    <MenuItem value='in person' primaryText='In person' />
                </SelectField>
            </div>
        )
    }
}

BookingsListTab.propTypes = {
    bookedBy: PropTypes.string,
    bookedThru: PropTypes.string
};

export default BookingsListTab;