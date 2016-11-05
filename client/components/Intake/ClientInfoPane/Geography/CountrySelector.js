import React, { Component } from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import MenuItem from 'material-ui/MenuItem';
import countries from '../../../../constants/countries';

class CountrySelector extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errorText: null,
            value: 'Canada'
        }
    }

    _filter(searchText, key) {
        const lowerCaseSearchText = searchText.toLowerCase();
        const lowerCaseKey = key.toLowerCase();
        return lowerCaseKey.indexOf(lowerCaseSearchText) > -1;
    }

    _handleBlur(event) {
        if (event.target.value == '') {
            this.setState({
                errorText: 'Country is required'
            });
        } else {
            this.setState({
                errorText: null
            });
        }
    }

    render() {
        return (
            <AutoComplete
                style={this.props.style}
                errorText={this.state.errorText}
                errorStyle={{
                    // Workaround to fix layout issues caused by material ui's error text
                    // https://github.com/callemall/material-ui/issues/1151
                    float: 'left'
                }}
                floatingLabelText='Country'
                value={this.state.value}
                searchText='Canada'
                onBlur={this._handleBlur.bind(this)}
                dataSource={countries}
                filter={this._filter}
                maxSearchResults={10}
            />
        )
    }
}

export default CountrySelector;