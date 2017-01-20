import React, { Component } from 'react';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const style = {
    container: {
        display: 'inline-block',
        margin: 10
    },
    dialogHeader: {
        textAlign: 'center'
    },
    dialogBody: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
};

class NewBookingDialog extends Component {
    constructor() {
        super();
        this.state = {
            open: false,
            appointmentType: '',
            date: null,
            startTime: null,
            endTime: null,
            errorMessage: null
        }
    }

    _handleOpen() {
        this.setState({
            open: true,
            appointmentType: '',
            date: null,
            startTime: new Date(null, null, null, 12, 0, 0, 0),
            endTime: new Date(null, null, null, 13, 0, 0, 0),
            errorMessage: null
        });
    }

    _handleClose() {
        this.setState({
            open: false
        });
    }

    _handleSubmitBooking() {
        const date = this.state.date;
        const startTime = this.state.startTime;
        const endTime = this.state.endTime;

        if (!date || !startTime || !endTime || this.state.appointmentType.length == 0) {
            this.setState({
                errorMessage: 'Some fields are incomplete'
            });
            return;
        }

        if (endTime < startTime) {
            this.setState({
                errorMessage: 'The end time of an appointment cannot be before the start time'
            });
            return;
        }

        if (date && startTime && endTime) {
            startTime.setFullYear(date.getFullYear(), date.getMonth(), date.getDate());
            endTime.setFullYear(date.getFullYear(), date.getMonth(), date.getDate());
        }

        this.props.onSubmitBooking({
            type: this.state.appointmentType,
            date,
            startTime,
            endTime,
        });

        this._handleClose();
    }

    render() {
        const actions = [
            <RaisedButton
                label='Ok'
                primary={true}
                onTouchTap={this._handleSubmitBooking.bind(this)}
            />
        ];

        return (
            <div style={style.container}>
                <RaisedButton style={style.dialogButton} label='Create New Booking' onTouchTap={this._handleOpen.bind(this)} />
                <Dialog
                    title='New Booking'
                    titleStyle={style.dialogHeader}
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this._handleClose.bind(this)} >
                    <div style={style.dialogBody}>
                        <SelectField
                            floatingLabelText='Type'
                            style={style.field}
                            value={this.state.appointmentType}
                            onChange={(event, key, appointmentType) => {this.setState({appointmentType})}}
                        >
                            <MenuItem value='Session' primaryText='Session' />
                            <MenuItem value='Presentation' primaryText='Presentation' />
                            <MenuItem value='Consultation' primaryText='Consultation' />
                        </SelectField>
                        <DatePicker
                            style={style.field}
                            floatingLabelText='Date'
                            onChange={(_, date) => {this.setState({date})}}
                        />
                        <TimePicker
                            style={style.field}
                            floatingLabelText='Start Time'
                            defaultTime={new Date(null, null, null, 12, 0, 0, 0)}
                            onChange={(_, startTime) => {this.setState({startTime})}}
                        />
                        <TimePicker
                            style={style.field}
                            floatingLabelText='End Time'
                            defaultTime={new Date(null, null, null, 13, 0, 0, 0)}
                            onChange={(_, endTime) => {this.setState({endTime})}}
                        />
                        <p style={{color: 'red'}}>
                            {this.state.errorMessage}
                        </p>
                    </div>
                </Dialog>
            </div>
        )
    }
}

export default NewBookingDialog;