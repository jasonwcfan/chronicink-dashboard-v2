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
        const errorText = searchText.length == 0 ? `${this.props.fieldTemplate.label} is required` : null;
        this.setState({
            errorText,
            value: searchText
        });
        this.props.onFieldChange(this.props.fieldTemplate.id, searchText, errorText);
    }

    render() {
        return (
            <AutoComplete
                floatingLabelText={this.props.fieldTemplate.label + (this.props.required ? ' *' : '')}
                style={this.props.style}
                searchText={ this.props.fieldValue.value || ''}
                errorText={this.props.touched && this.props.errorText ? this.props.errorText: null}
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
                                this._handleUpdateInput(value);
                            }}
                onUpdateInput={this._handleUpdateInput}
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
