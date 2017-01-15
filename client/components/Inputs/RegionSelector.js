import React, { Component, PropTypes } from 'react';
import SelectField from 'material-ui/SelectField';
import ValidatedTextField from './ValidatedTextField';
import MenuItem from 'material-ui/MenuItem';
import provinces from '../../constants/provinces';
import states from '../../constants/states';

const style = {
    selectField: {
        marginLeft: 5,
        marginRight: 5,
        // Workaround for SelectField fucking up the layout >:(
        float: 'left'
    },
    textField: {
        marginLeft: 5,
        marginRight: 5,
    }
};

class RegionSelector extends Component {
    constructor(props) {
        super(props);
    }

    _getRegionsList(country) {
        const list = [];
        let regions = [];
        switch (country) {
            case 'Canada':
                regions = provinces;
                break;
            case 'United States':
                regions = states;
                break;
        }
        for (let i = 0; i < regions.length; i++) {
            list.push(<MenuItem value={regions[i]} key={regions[i]} primaryText={regions[i]} />);
        }
        return list;
    }

    _getFieldLabel(country) {
        switch (country) {
            case 'Canada':
                return 'Province';
            case 'United States':
                return 'State';
            default:
                return 'Region/Province/County';
        }
    }

    _handleChange(event, index, value) {
        this.props.onFieldChange(this.props.name, value, true);
    }

    render() {
        switch (this.props.selectedCountry) {
            case 'United States':
            case 'Canada':
                return (
                    <SelectField
                        style={style.selectField}
                        floatingLabelText={this._getFieldLabel(this.props.selectedCountry) + ' *'}
                        value={this.props.value}
                        onChange={this._handleChange.bind(this)}
                        maxHeight={200}>
                        {this._getRegionsList(this.props.selectedCountry)}
                    </SelectField>
                );
            default:
                return (
                    <ValidatedTextField
                        style={style.textField}
                        defaultValue={this.props.value}
                        name='region'
                        floatingLabelText='Region/Province/County'
                        onFieldChange={this.props.onFieldChange}
                        required={false}
                    />
                )

        }
    }
}

RegionSelector.propTypes = {
    selectedCountry: PropTypes.string
};

export default RegionSelector;