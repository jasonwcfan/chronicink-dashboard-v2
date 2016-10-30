import React, { Component } from 'react';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import StyleSelector from './StyleSelector';
import PlacementSelector from './PlacementSelector';

const style = {
    textField: {
        marginLeft: 5,
        marginRight: 5
    },
    datePicker: {
        marginLeft: 5,
        marginRight: 5
    }
};

class TattooDetailsSection extends Component {
    render() {
        return (
            <div>
                <h2>Tattoo Details</h2>
                <StyleSelector /><br />
                <PlacementSelector />
            </div>
        )
    }
}

export default TattooDetailsSection;