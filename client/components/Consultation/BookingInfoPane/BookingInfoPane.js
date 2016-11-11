import React, { Component } from 'react';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import RaisedButton from 'material-ui/RaisedButton';
import TattooDetailsSection from '../TattooDetailsTab';
import RateSection from './RateSection';
import BookingsSection from '../BookingsTab';

const style = {
    container: {
        padding: 10
    },
    group: {
        display: 'flex',
        flexDirection: 'row',
        maxWidth: 250
    },
    item: {
        display: 'inline',
        padding: 10
    },
    buttons: {
        margin: 5,
    }
};

class BookingInfoPane extends Component {
    render() {
        return (
            <div style={style.container}>
                <h2>Studio</h2>
                <RadioButtonGroup style={style.group} name='studio' defaultSelected='toronto'>
                    <RadioButton
                        value='toronto'
                        label='Toronto'
                        style={style.item}
                    />
                    <RadioButton
                        value='markham'
                        label='Markham'
                        style={style.item}
                    />
                </RadioButtonGroup>
                <h2>Custom Piece?</h2>
                <RadioButtonGroup style={style.group}name='customPiece' defaultSelected='yes'>
                    <RadioButton
                        value='yes'
                        label='Yes'
                        style={style.item}
                    />
                    <RadioButton
                        value='no'
                        label='No'
                        style={style.item}
                    />
                </RadioButtonGroup>
                <h2>Coverup?</h2>
                <RadioButtonGroup style={style.group}name='coverup' defaultSelected='no'>
                    <RadioButton
                        value='yes'
                        label='Yes'
                        style={style.item}
                    />
                    <RadioButton
                        value='no'
                        label='No'
                        style={style.item}
                    />
                </RadioButtonGroup>
                <TattooDetailsSection />
                <RateSection />
                <BookingsSection />
            </div>
        )
    }
}

export default BookingInfoPane;