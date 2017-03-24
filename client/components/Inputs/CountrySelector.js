import React, { Component } from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import MenuItem from 'material-ui/MenuItem';
import countries from '../../constants/countries';

class CountrySelector extends Component {
    constructor(props) {
        super(props);
        this.state = {
            touched: this.props.touched
        };

        this._handleNewRequest = this._handleNewRequest.bind(this);
        this._handleUpdateInput = this._handleUpdateInput.bind(this);
    }

    componentWillReceiveProps(props) {
        this.setState({
            touched: this.props.touched
        })
    }

    _filter(searchText, key) {
        const lowerCaseSearchText = searchText.toLowerCase();
        const lowerCaseKey = key.toLowerCase();
        return lowerCaseKey.indexOf(lowerCaseSearchText) > -1;
    }

    _handleNewRequest(request) {
        this.props.onFieldChange(this.props.name, request, null);

        if (request == 'Canada' || request == 'United States') {
            this.props.onFieldChange('region', '', 'Not a valid Province/State/Region');
        } else {
            this.props.onFieldChange('region', '', null);
        }
    }

    _handleUpdateInput(text, dataSource) {
        let isCountry = false;

        if (!this.state.touched) {
            this.setState({
                touched: true
            });
        }

        dataSource.forEach((country) => {
            if (text.toLowerCase() == country.toLowerCase()) {
                isCountry = true;
                this.props.onFieldChange(this.props.name, country, null);
            }
        });

        if (!isCountry) {
            this.props.onFieldChange(this.props.name, text, 'Not a valid Country');
        }
    }

    render() {
        return (
            <AutoComplete
                style={this.props.style}
                errorText={this.state.touched && this.props.errorText ? this.props.errorText: null}
                errorStyle={{
                    // Workaround to fix layout issues caused by material ui's error text
                    // https://github.com/callemall/material-ui/issues/1151
                    float: 'left'
                }}
                floatingLabelText='Country *'
                value={this.state.value}
                searchText={this.props.defaultValue}
                onNewRequest={this._handleNewRequest}
                onUpdateInput={this._handleUpdateInput}
                dataSource={countries}
                filter={this._filter}
                maxSearchResults={10}
            />
        )
    }
}

export default CountrySelector;