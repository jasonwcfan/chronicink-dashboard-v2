import React, { Component } from 'react';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';

const style = {
    container: {
        display: 'flex',
        flexWrap: 'wrap'
    },
    datePicker: {
        display: 'inline-block',
        marginLeft: 5,
        marginRight: 5,
        width: 100
    },
    timePicker: {
        display: 'inline-block',
        marginLeft: 5,
        marginRight: 5,
        width: 100
    }
};

class BookingRow extends Component {
    render() {
        return (
            <div style={style.container}>
                <DatePicker style={style.datePicker} floatingLabelText="Date" />
                <TimePicker style={style.timePicker} floatingLabelText="Start Time" />
                <TimePicker style={style.timePicker} floatingLabelText="End Time" />
            </div>
        )
    }
}

export default BookingRow;