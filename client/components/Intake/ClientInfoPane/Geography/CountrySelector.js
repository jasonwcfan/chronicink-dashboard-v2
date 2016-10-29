import React, { Component } from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import MenuItem from 'material-ui/MenuItem';
import countries from './countries';

const style = {
    marginLeft: 5,
    marginRight: 5
};

class CountrySelector extends Component {
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

export default CountrySelector;