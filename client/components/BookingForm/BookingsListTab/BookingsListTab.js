import React, { Component, PropTypes } from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Toggle from 'material-ui/Toggle';
import ValidatedTextField from '../../Inputs/ValidatedTextField';
import BookingsList from './BookingsList';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';


const style = {
    bookedThruSelectField: {
        display: 'block'
    },
    presentationToggle: {
        maxWidth: 360,
    },
    presentationLabel: {
        display: 'inline-block',
        marginRight: 105,
        lineHeight: '29px',
        verticalAlign: 'super'
    },
    radioItem: {
        width: 'auto',
        display: 'inline-block',
        marginRight: 25
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
                <div>
                    <div style={style.presentationLabel}>Presentation Required</div>
                    <RadioButtonGroup
                        style={{display: 'inline-block'}}
                        name={'presentationRequired'}
                        valueSelected={this.props.presentationRequired}
                        onChange={this.props.togglePresentationRequired}
                    >
                        <RadioButton
                            style={style.radioItem}
                            iconStyle={{marginRight: 10}}
                            value={true}
                            label={'Yes'}
                            key={'yes'}
                        />
                        <RadioButton
                            style={style.radioItem}
                            iconStyle={{marginRight: 10}}
                            value={false}
                            label={'No'}
                            key={'no'}
                        />
                    </RadioButtonGroup>
                </div>
                <BookingsList bookings={this.props.bookings} deleteBooking={this.props.deleteBooking} onSubmitBooking={this.props.onSubmitBooking} />
            </div>
        )
    }
}

BookingsListTab.propTypes = {
    bookedBy: PropTypes.string,
    bookedThru: PropTypes.string,
    presentationRequired: PropTypes.bool
};

export default BookingsListTab;
