import React, { Component } from 'react';
import TextField from 'material-ui/TextField';

class RequiredTextField extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errorText: null,
        }
    }

    _handleChange(event) {
        if (event.target.value == '' && this.props.required) {
            this.setState({
                errorText: this.props.floatingLabelText + ' is required',
            });
        } else {
            this.setState({
                errorText: null,
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
                defaultValue={this.props.defaultValue || ''}
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