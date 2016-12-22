import React, { Component, PropTypes } from 'react';
import TextField from 'material-ui/TextField';

class ValidatedTextField extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errorText: null,
            value: props.defaultValue
        }
    }

    componentWillReceiveProps(props) {
        this.setState({
            value: props.defaultValue
        })
    }

    _handleChange(event) {
        if (event.target.value == '' && this.props.required) {
            this.setState({
                errorText: this.props.floatingLabelText + ' is required',
                value: event.target.value
            });
        } else {
            this.setState({
                errorText: null,
                value: event.target.value
            });
        }
    }

    _handleBlur(event) {
        this.props.onFieldChange(this.props.name, event.target.value, this.state.errorText == null);
    }

    render() {
        return(
            <TextField
                errorText={this.state.errorText}
                value={this.state.value}
                style={this.props.style}
                floatingLabelText={this.props.floatingLabelText}
                onChange={this._handleChange.bind(this)}
                onBlur={this._handleBlur.bind(this)}
                fullWidth={this.props.fullWidth}
                multiLine={this.props.multiLine}
                errorStyle={{
                    // Workaround to fix layout issues caused by material ui's error text
                    // https://github.com/callemall/material-ui/issues/1151
                    float: 'left'
                }}
            />
        )
    }
}

ValidatedTextField.propTypes = {
    defaultValue: PropTypes.string
};

export default ValidatedTextField;