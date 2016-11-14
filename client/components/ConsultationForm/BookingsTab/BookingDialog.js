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
            open: false,
            sessionType: 'Session',
            date: null,
            startTime: null,
            endTime: null
        }
    }

    _handleOpen() {
        this.setState({open: true});
    }

    _handleClose() {
        this.setState({
            open: false,
            sessionType: 'Session',
            date: null,
            startTime: null,
            endTime: null
        });
    }

    _handleSubmitSession() {
        console.log(this.state);
        const date = this.state.date;
        const startTime = this.state.startTime;
        const endTime = this.state.endTime;

        if (date && startTime && endTime) {
            startTime.setFullYear(date.getFullYear(), date.getMonth(), date.getDate());
            endTime.setFullYear(date.getFullYear(), date.getMonth(), date.getDate());
        }

        this.props.onSubmitSession({
            sessionType: this.state.sessionType,
            date,
            startTime,
            endTime,
        });

        this._handleClose();
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
                        <DatePicker
                            style={style.datePicker}
                            textFieldStyle={style.textFieldStyle}
                            floatingLabelText="Date"
                            onChange={(_, date) => {this.setState({date})}}
                        />
                        <TimePicker
                            style={style.timePicker}
                            textFieldStyle={style.textFieldStyle}
                            floatingLabelText="Start Time"
                            onChange={(_, startTime) => {this.setState({startTime})}}
                        />
                        <TimePicker
                            style={style.timePicker}
                            textFieldStyle={style.textFieldStyle}
                            floatingLabelText="End Time"
                            onChange={(_, endTime) => {this.setState({endTime})}}
                        />
                </Dialog>
            </div>
        )
    }
}

export default BookingDialog;