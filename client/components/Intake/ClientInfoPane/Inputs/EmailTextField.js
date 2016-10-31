import React, { Component } from 'react';
import ValidatedTextField from './ValidatedTextField';

class EmailTextField extends Component {
    constructor() {
        super();
        this.state = {
            errorText: null
        }
    }
    _handleChange(event) {

    }

    render() {
        return(
            <ValidatedTextField
                errorText={this.state.errorText}
                style={this.props.style}
                floatingLabelText={this.props.floatingLabelText}
                onChange={this._handleChange.bind(this)}
                required={this.props.required} />
        )
    }
}

export default EmailTextField;