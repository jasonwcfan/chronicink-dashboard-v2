import React, { Component, PropTypes } from 'react';
import SelectField from 'material-ui/SelectField';
import FlatButton from 'material-ui/FlatButton';
import MenuItem from 'material-ui/MenuItem';
import Dialog from 'material-ui/Dialog';

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

        this.state = {
            dialogOpen: false
        };

        this._handleClickRecommendButton = this._handleClickRecommendButton.bind(this);
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

    _handleClickRecommendButton() {
        this.props.onClickRecommendButton();
        this.setState({
            dialogOpen: true
        })
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
                <FlatButton
                    style={style.recommendButton}
                    label='Recommend'
                    onTouchTap={this._handleClickRecommendButton}
                />
                <Dialog
                    open={this.state.dialogOpen}
                    onRequestClose={() => {this.setState({dialogOpen: false})}}
                >
                    Test
                </Dialog>
            </div>
        )
    }
}

ArtistSelector.propTypes = {
    fieldTemplate: PropTypes.object,
    fieldValue: PropTypes.object,
    artists: PropTypes.array
};

export default ArtistSelector;