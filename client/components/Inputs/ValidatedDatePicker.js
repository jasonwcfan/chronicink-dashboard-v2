import React, { Component } from 'react';
import DatePicker from 'material-ui/DatePicker';

class RequiredTextField extends Component {
    constructor(props) {
        super(props);
    }

    _handleChange(_, date) {
        this.props.onFieldChange(this.props.name, date, date != null);
    }

    render() {
        return (
            this.props.defaultDate ?
                <DatePicker
                    style={this.props.style}
                    defaultDate={this.props.defaultDate}
                    floatingLabelText={this.props.floatingLabelText}
                    onChange={this._handleChange.bind(this)}
                />
                :
                <DatePicker
                    style={this.props.style}
                    floatingLabelText={this.props.floatingLabelText}
                    onChange={this._handleChange.bind(this)}
                />

        );
    }
}

export default RequiredTextField;