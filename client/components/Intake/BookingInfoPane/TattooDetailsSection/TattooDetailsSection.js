import React, { Component } from 'react';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import TextField from 'material-ui/TextField';
import StyleSelector from './StyleSelector';
import PlacementSelector from './PlacementSelector';

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

class TattooDetailsSection extends Component {
    render() {
        return (
            <div>
                <h2>Tattoo Details</h2>
                <StyleSelector /><br />
                <PlacementSelector /><br />
                <TextField style={style.textField} floatingLabelText="Size" />
                <h3>Colour</h3>
                <RadioButtonGroup style={style.radioGroup} name='colour' defaultSelected='blackAndGrey'>
                    <RadioButton
                        value='blackAndGrey'
                        label='Black & grey'
                        style={style.radioButton}
                    />
                    <RadioButton
                        value='colour'
                        label='Colour'
                        style={style.radioButton}
                    />
                    <RadioButton
                        value='blackAndGreyWithTouchesOfColour'
                        label='Black & grey with touches of colour'
                        style={style.radioButton}
                    />
                </RadioButtonGroup>
                <TextField style={style.textField} floatingLabelText="Skin Tone" fullWidth={true} multiLine={true} /><br />
                <TextField style={style.textField} floatingLabelText="Subject" fullWidth={true} multiLine={true} /><br />
                <TextField style={style.textField} floatingLabelText="Feel" fullWidth={true} multiLine={true} /><br />
                <TextField style={style.textField} floatingLabelText="Background" fullWidth={true} multiLine={true} /><br />
            </div>
        )
    }
}

export default TattooDetailsSection;