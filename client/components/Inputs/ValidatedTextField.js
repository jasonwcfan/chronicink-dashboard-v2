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

    componentWillReceiveProps(props) {
        this.setState({
            value: props.defaultValue
        })
    }

    _handleChange(event) {
        let errorText = null;
        if (event.target.value.length == 0 && this.props.required) {
            errorText = this.props.floatingLabelText + ' is required'
        } else if (this.props.pattern) {
            const matches = this.props.pattern.test(event.target.value);
            errorText = matches ? null : `Not a valid ${this.props.floatingLabelText}`;
        }

        this.setState({
            value: event.target.value
        });

        this.props.onFieldChange(this.props.name, event.target.value, errorText);
    }

    render() {
        return(
            <TextField
                errorText={this.props.touched && this.props.errorText ? this.props.errorText: null}
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
                {this.props.mask ? <MaskedInput mask={this.props.mask} value={this.state.value} /> : null}
            </TextField>
        )
    }
}

ValidatedTextField.propTypes = {
    defaultValue: PropTypes.string,
    mask: PropTypes.array
};

export default ValidatedTextField;