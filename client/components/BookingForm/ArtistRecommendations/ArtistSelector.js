import React, { Component, PropTypes } from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import ArtistRecommendation from './ArtistRecommendation';

const style = {
    container: {
        display: 'flex',
        alignItems: 'flex-end'
    },
    recommendButton: {
    }
};

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
        return 0;
    }

    render() {
        return (
            <div style={style.container}>
                <SelectField
                    floatingLabelText={this.props.fieldTemplate.label}
                    errorText={this.props.touched && this.props.errorText ? this.props.errorText: null}
                    value={this.props.fieldValue.value || ''}
                    onChange={(event, index, value) => {
                    this.props.onFieldChange(this.props.fieldTemplate.id, value, null)
                }}
                >
                    {this.props.artists.sort(this._artistSort).map((artist) => (
                        <MenuItem key={artist._id._str} value={artist._id._str} primaryText={artist.name} />
                    ))}
                </SelectField>
                <ArtistRecommendation
                    formValues={this.props.formValues}
                    onFieldChange={this.props.onFieldChange}
                />
            </div>
        )
    }
}

ArtistSelector.propTypes = {
    fieldTemplate: PropTypes.object,
    fieldValue: PropTypes.object,
    formValues: PropTypes.object,
    artists: PropTypes.array
};

export default ArtistSelector;