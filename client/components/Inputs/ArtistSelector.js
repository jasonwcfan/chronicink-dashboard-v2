import React, { Component, PropTypes } from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

class ArtistSelector extends Component {
    constructor(props) {
        super(props);
    }

    _artistSort(a, b) {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();
        if (nameA < nameB) {
            return -1;
        }
        if (nameB < nameA) {
            return 1;
        }
        return 0
    }

    render() {
        return (
            <SelectField
                floatingLabelText={this.props.fieldTemplate.label}
                style={this.props.style}
                value={this.props.fieldValue.value || ''}
                onChange={(event, index, value) => {
                                this.props.onFieldChange(this.props.fieldTemplate.id, value, true)
                             }}
            >
                {this.props.artists.sort(this._artistSort).map((artist) => (
                    <MenuItem key={artist.calendarID} value={artist.calendarID} primaryText={artist.name} />
                ))}
            </SelectField>
        )
    }
}

ArtistSelector.propTypes = {
    fieldTemplate: PropTypes.object,
    fieldValue: PropTypes.object,
    artists: PropTypes.array
};

export default ArtistSelector;