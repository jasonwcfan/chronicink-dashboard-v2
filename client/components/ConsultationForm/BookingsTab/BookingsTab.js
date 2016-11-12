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

class RateSection extends Component {
    render() {
        return (
            <div style={this.props.style}>
                <h2>Bookings</h2>
                <h3>Presentation Required?</h3>
                <RadioButtonGroup style={style.radioGroup} name='presentationRequired' defaultSelected='yes'>
                    <RadioButton
                        value='yes'
                        label='Yes'
                        style={style.radioButton}
                    />
                    <RadioButton
                        value='no'
                        label='No'
                        style={style.radioButton}
                    />
                    <RadioButton
                        value='toBeDetermined'
                        label='To Be Determined'
                        style={style.radioButton}
                    />
                </RadioButtonGroup>
                <BookingsList sessions={this.props.sessions} />
            </div>
        )
    }
}

export default RateSection;