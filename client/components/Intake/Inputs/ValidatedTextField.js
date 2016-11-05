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
            this.props.onChange(this.props.name, {value: event.target.value, valid: false});
        } else {
            this.setState({
                errorText: null
            });
            this.props.onChange(this.props.name, {value: event.target.value, valid: true});
        }
    }

    render() {
        return(
            <TextField
                errorText={this.state.errorText}
                style={this.props.style}
                floatingLabelText={this.props.floatingLabelText}
                onChange={this._handleChange.bind(this)} />
        )
    }
}

export default RequiredTextField;