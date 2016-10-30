import React, { Component } from 'react';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import BookingRow from './BookingRow';


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

class RateSection extends Component {
    render() {
        return (
            <div>
                <h2>Bookings</h2>
                <RadioButtonGroup style={style.radioGroup} name='presentationRequired' defaultSelected='required'>
                    <RadioButton
                        value='required'
                        label='Presentation required'
                        style={style.radioButton}
                    />
                    <RadioButton
                        value='notRequired'
                        label='No presentation required'
                        style={style.radioButton}
                    />
                    <RadioButton
                        value='toBeDetermined'
                        label='To Be Determined'
                        style={style.radioButton}
                    />
                </RadioButtonGroup>
                <BookingRow />
            </div>
        )
    }
}

export default RateSection;