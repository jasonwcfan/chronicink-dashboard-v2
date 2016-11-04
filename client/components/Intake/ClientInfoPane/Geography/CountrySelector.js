import React, { Component } from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import MenuItem from 'material-ui/MenuItem';
import countries from '../../../../constants/countries';

const style = {
    marginLeft: 5,
    marginRight: 5
};

class CountrySelector extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null
        }
    }

    _filter(searchText, key) {
        const lowerCaseSearchText = searchText.toLowerCase();
        const lowerCaseKey = key.toLowerCase();
        return lowerCaseKey.indexOf(lowerCaseSearchText) > -1;
    }

    render() {
        return (
            <AutoComplete
                style={style}
                floatingLabelText='Country'
                value={this.state.value}
                dataSource={countries}
                filter={this._filter}
            />
        )
    }
}

export default CountrySelector;