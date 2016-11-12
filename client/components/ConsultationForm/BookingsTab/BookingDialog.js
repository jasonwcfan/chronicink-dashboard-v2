import React, { Component } from 'react';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';

const style = {
    container: {
        display: 'inline-block',
        margin: 10
    },
    datePicker: {
        display: 'block',
        marginLeft: 5,
        marginRight: 5,
    },
    timePicker: {
        display: 'inline-block',
        marginLeft: 5,
        marginRight: 5,
    },
    textFieldStyle: {
        borderBottomWidth: 100,
        borderColor: 'red'
    },
};

class BookingDialog extends Component {
    constructor() {
        super();
        this.state = {
            open: false
        }
    }

    _handleOpen() {
        this.setState({open: true});
    }

    _handleClose() {
        this.setState({open: false});
    }

    _handleSubmitSession() {
        this.props.onSubmitConsultationForm({
            sessionType: this.props.sessionType,
            date: this.props.date,
            startTime: this.props.startTime,
            endTime: this.props.endTime
        })
    }

    render() {
        const actions = [
            <RaisedButton
                label="Ok"
                primary={true}
                onTouchTap={this._handleSubmitSession.bind(this)}
            />
        ];

        return (
            <div style={style.container}>
                <RaisedButton style={style.dialogButton} label="Create New Booking" onTouchTap={this._handleOpen.bind(this)} />
                <Dialog
                    title="New Booking"
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this._handleClose.bind(this)} >
                        <DatePicker style={style.datePicker} textFieldStyle={style.textFieldStyle} floatingLabelText="Date" />
                        <TimePicker style={style.timePicker} textFieldStyle={style.textFieldStyle} floatingLabelText="Start Time" />
                        <TimePicker style={style.timePicker} textFieldStyle={style.textFieldStyle} floatingLabelText="End Time" />
                </Dialog>
            </div>
        )
    }
}

export default BookingDialog;