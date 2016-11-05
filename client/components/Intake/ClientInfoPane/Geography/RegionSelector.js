import React, { Component } from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import provinces from '../../../../constants/provinces';
import states from '../../../../constants/states';

const style = {
    marginLeft: 5,
    marginRight: 5,
    // Workaround for SelectField fucking up the layout >:(
    float: 'left'
};

class RegionSelector extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.defaultValue
        }
    }

    _getRegionsList() {
        const list = [];
        for (let i = 0; i < provinces.length; i++) {
            list.push(<MenuItem value={provinces[i]} key={provinces[i]} primaryText={provinces[i]} />);
        }
        return list;
    }

    _handleChange(event, index, value) {
        this.setState({value});
        this.props.onChange(this.props.name, {value: value, valid: true});
    }

    render() {
        return (
            <SelectField
                style={style}
                floatingLabelText='Province'
                value={this.state.value}
                onChange={this._handleChange.bind(this)}
                maxHeight={200}>
                {this._getRegionsList()}
            </SelectField>
        )
    }
}

export default RegionSelector;