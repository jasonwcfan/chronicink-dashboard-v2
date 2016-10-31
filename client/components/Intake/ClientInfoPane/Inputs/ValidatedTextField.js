import React, { Component } from 'react';
import TextField from 'material-ui/TextField';

class RequiredTextField extends Component {
    constructor() {
        super();
        this.state = {
            errorText: null
        }
    }

    componentWillMount() {
        this.props.attachToForm(this);
    }

    _handleChange(event) {
        console.log(this.props.required);
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