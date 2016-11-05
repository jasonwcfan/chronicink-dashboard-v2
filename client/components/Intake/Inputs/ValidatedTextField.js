import React, { Component } from 'react';
import TextField from 'material-ui/TextField';

class RequiredTextField extends Component {
    constructor() {
        super();
        this.state = {
            errorText: null
        }
    }

    _handleChange(event) {
        if (event.target.value == '' && this.props.required) {
            this.setState({
                errorText: this.props.floatingLabelText + ' is required'
            });
        } else {
            this.setState({
                errorText: null
            });
        }
    }

    _handleBlur(event) {
        console.log(this.props.onChange);
        if (this.state.errorText) {
            this.props.onChange(this.props.name, {value: event.target.value, valid: false});
        } else {
            this.props.onChange(this.props.name, {value: event.target.value, valid: true});
        }
    }

    render() {
        return(
            <TextField
                errorText={this.state.errorText}
                style={this.props.style}
                floatingLabelText={this.props.floatingLabelText}
                onChange={this._handleChange.bind(this)}
                onBlur={this._handleBlur.bind(this)}
                errorStyle={{
                    // Workaround to fix layout issues caused by material ui's error text
                    // https://github.com/callemall/material-ui/issues/1151
                    float: 'left'
                }}
            />
        )
    }
}

export default RequiredTextField;