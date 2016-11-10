import React, { Component } from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import MenuItem from 'material-ui/MenuItem';
import styles from '../../../../constants/styles';

const style = {
    display: 'block'
};

class StyleSelector extends Component {
    constructor() {
        super();
        this.state = {
            value: null
        }
    }

    handleChange(event, index, value) {
        this.setState({value});
    }

    _filter(searchText, key) {
        const lowerCaseSearchText = searchText.toLowerCase();
        const lowerCaseKey = key.toLowerCase();
        return lowerCaseKey.indexOf(lowerCaseSearchText) > -1;
    }

    render() {
        return (
            <AutoComplete
                floatingLabelText='Style'
                value={this.state.value}
                dataSource={styles}
                filter={this._filter}
                style={style}
            />
        )
    }
}

export default StyleSelector;