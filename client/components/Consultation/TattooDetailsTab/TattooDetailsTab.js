import React, { Component } from 'react';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import TextField from 'material-ui/TextField';
import StyleSelector from './StyleSelector';
import PlacementSelector from './PlacementSelector';

const style = {
    textField: {
        display: 'block',
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
    },
};

class TattooDetailsTab extends Component {
    constructor() {
        super();
    }
    
    _renderFields() {
        
    }
    
    render() {
        return (
            <div>
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
                <h2>Tattoo Details</h2>
                <StyleSelector />
                <PlacementSelector />
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
                <TextField style={style.textField} floatingLabelText="Skin Tone" fullWidth={true} multiLine={true} />
                <TextField style={style.textField} floatingLabelText="Subject" fullWidth={true} multiLine={true} />
                <TextField style={style.textField} floatingLabelText="Feel" fullWidth={true} multiLine={true} />
                <TextField style={style.textField} floatingLabelText="Background" fullWidth={true} multiLine={true} />
                <h2>Rate</h2>
                <RadioButtonGroup style={style.radioGroup} name='rateType' defaultSelected='hourly'>
                    <RadioButton
                        value='perPiece'
                        label='Per Piece'
                        style={style.radioButton}
                    />
                    <RadioButton
                        value='hourly'
                        label='Hourly'
                        style={style.radioButton}
                    />
                    <RadioButton
                        value='toBeDetermined'
                        label='To Be Determined'
                        style={style.radioButton}
                    />
                </RadioButtonGroup>
                <TextField style={style.textField} floatingLabelText="Rate" multiLine={true} /><br />
                <TextField style={style.textField} floatingLabelText="Deposit" multiLine={true} />
            </div>
        )
    }
}

export default TattooDetailsTab;