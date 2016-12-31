import React, { Component, PropTypes } from 'react';
import AutoComplete from 'material-ui/AutoComplete';

class ValidatedAutoComplete extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errorText: null,
            value: this.props.fieldValue.value
        };
        this._handleUpdateInput = this._handleUpdateInput.bind(this);
    }

    _handleUpdateInput(searchText) {
        this.setState({
            errorText: searchText.length == 0 ? `${this.props.fieldTemplate.label} is required` : null,
            value: searchText
        })
    }

    render() {
        return (
            <AutoComplete
                floatingLabelText={this.props.fieldTemplate.label}
                style={this.props.style}
                searchText={ this.props.fieldValue.value || ''}
                errorText={this.state.errorText}
                key={this.props.fieldTemplate.id}
                dataSource={this.props.dataSource}
                filter={(searchText, key) => {
                                // Fuzzier search than the default
                                const lowerCaseSearchText = searchText.toLowerCase();
                                const lowerCaseKey = key.toLowerCase();
                                return lowerCaseKey.indexOf(lowerCaseSearchText) > -1;
                            }}
                maxSearchResults={10}
                onNewRequest={(value) => {
                                this.props.onFieldChange(this.props.fieldTemplate.id, value, !this.state.errorText)
                            }}
                onUpdateInput={this._handleUpdateInput}
                onBlur={(event) => {
                    this.props.onFieldChange(this.props.fieldTemplate.id, event.target.value, !this.state.errorText)
                }}
            />
        )
    }
}

ValidatedAutoComplete.propTypes = {
    fieldTemplate: PropTypes.object,
    dataSource: PropTypes.array,
    fieldValue: PropTypes.object
};

export default ValidatedAutoComplete;