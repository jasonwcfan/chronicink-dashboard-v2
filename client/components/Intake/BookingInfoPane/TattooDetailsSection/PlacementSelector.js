import React, { Component } from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import MenuItem from 'material-ui/MenuItem';

class PlacementSelector extends Component {
    constructor() {
        super();
        this.state = {
            value: null
        }
    }

    handleChange(event, index, value) {
        this.setState({value});
    }

    render() {
        return (
            <AutoComplete
                style={style}
                floatingLabelText='Country'
                value={this.state.value}
                dataSource={countries}
            />
        )
    }
}

export default PlacementSelector;