import React, { Component, PropTypes } from 'react';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';

const style = {
    container: {
        display: 'inline'
    }
};

class SubmitErrorDialog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false,
            errors: []
        };

        this._handleClose = this._handleClose.bind(this);
        this._handleClickSubmit = this._handleClickSubmit.bind(this);
    }

    componentWillReceiveProps(props) {
        if (props.errorMessages.length > 0) {
            this.setState({
                open: true,
                errors: props.errorMessages
            })
        }
    }

    _handleClose() {
        console.log(this.state.errors);
        this.setState({
            open: false,
            errors: []
        })
    }

    _handleClickSubmit() {
        const errors = [];

        Object.keys(this.props.fieldValues).forEach((key) => {
            const field = this.props.fieldValues[key];
            if (!field.valid) {
                errors.push(`There is a problem with the \"${field.label}\" field`);
            }
        });

        if (this.props.bookings.length == 0) {
            errors.push('There should be at least 1 session to book')
        }

        if (errors.length > 0) {
            this.setState({
                open: true,
                errors
            })
        } else {
            this.props.handleSubmit();
        }
    }

    render() {
        return (
            <div style={style.container}>
                <RaisedButton
                    secondary={true}
                    disabled={this.props.isSubmitted}
                    label='Submit'
                    onTouchTap={this._handleClickSubmit}
                />
                <Dialog
                    title='Form Errors'
                    open={this.state.open}
                    onRequestClose={this._handleClose}
                    actions={
                        <RaisedButton
                            label='Ok'
                            primary={true}
                            onTouchTap={this._handleClose}
                        />
                    }
                >
                    {this.state.errors.map((error, idx) => <p key={idx} style={{color: 'red'}}>{`- ${error}`}</p>)}
                </Dialog>
            </div>
        )
    }
}

SubmitErrorDialog.propTypes = {
    fieldValues: PropTypes.object,
    bookings: PropTypes.array,
    isSubmitted: PropTypes.bool,
    errorMessages: PropTypes.array
};

export default SubmitErrorDialog;