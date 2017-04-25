import React, { Component, PropTypes } from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { RadioButtonGroup, RadioButton } from 'material-ui/RadioButton';
import ValidatedTextField from '../../Inputs/ValidatedTextField';
import BookingsList from './BookingsList';


const style = {
    bookedThruSelectField: {
        display: 'block'
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
    bookedThru: PropTypes.string,
    presentationRequired: PropTypes.bool
};

export default BookingsListTab;