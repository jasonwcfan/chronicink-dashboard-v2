import React, { Component, PropTypes } from 'react';
import TextField from 'material-ui/TextField';
import MaskedInput from 'react-text-mask';

class ValidatedTextField extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.defaultValue
        };

        this._handleChange = this._handleChange.bind(this);
    }

    _handleChange(_, value) {

        let errorText = null;
        if (value.length == 0 && this.props.required) {
            errorText = this.props.floatingLabelText + ' is required'
        } else if (this.props.pattern) {
            const matches = this.props.pattern.test(value);
            errorText = matches ? null : `Not a valid ${this.props.floatingLabelText}`;
        } else if (this.props.validator) {
            errorText = this.props.validator(value) ? null : `Not a valid ${this.props.floatingLabelText}`;
        }

        this.setState({
            value: value
        });

        this.props.onFieldChange(this.props.name, value, errorText);
    }

    render() {
        return(
            <TextField
                errorText={this.props.validated && this.props.errorText ? this.props.errorText: null}
                value={this.state.value}
                style={this.props.style}
                floatingLabelText={this.props.floatingLabelText + (this.props.required ? ' *' : '')}
                onChange={this._handleChange}
                fullWidth={this.props.fullWidth}
                multiLine={this.props.multiLine}
                errorStyle={{
                    // Workaround to fix layout issues caused by material ui's error text
                    // https://github.com/callemall/material-ui/issues/1151
                    float: 'left'
                }}
            >
                {this.props.mask ? <MaskedInput type={this.props.type} autoComplete='off' mask={this.props.mask} value={this.state.value} /> : null}
            </TextField>
        )
    }
}

ValidatedTextField.propTypes = {
    defaultValue: PropTypes.string,
    mask: PropTypes.array,
    touched: PropTypes.bool,
    validated: PropTypes.bool,
    errorText: PropTypes.string,
    floatingLabelText: PropTypes.string,
    pattern: PropTypes.object,
    validator: PropTypes.func
};

export default ValidatedTextField;
