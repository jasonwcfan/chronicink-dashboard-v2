import React, { Component } from 'react';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';

const style = {
    container: {
        padding: 10
    },
    group: {
        display: 'flex'
    },
    item: {
        padding: 10
    }
};

class BookingInfoPane extends Component {
    render() {
        return (
            <div style={style.container}>
                <h2>Studio</h2>
                <RadioButtonGroup name='studio' defaultSelected='toronto'>
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
                <RadioButtonGroup name='customPiece' defaultSelected='yes'>
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
                <RadioButtonGroup name='coverup' defaultSelected='no'>
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
            </div>
        )
    }
}

export default BookingInfoPane;