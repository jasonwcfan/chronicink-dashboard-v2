import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import RaisedButton from 'material-ui/RaisedButton';
import {Tabs, Tab} from 'material-ui/Tabs';
import Artist from '../../../imports/Artist/artist';
import Booking from '../../../imports/Booking/booking';
import Intake from '../../../imports/Intake/intake';
import TattooDetailsTab from './TattooDetailsTab';
import BookingsListTab from './BookingsListTab';
import ClientInfoTab from './ClientInfoTab';
import RecommendationsTab from './RecommendationsTab';
import SubmitErrorDialog from './SubmitErrorDialog';
import defaultFields from '../../constants/defaultBookingFormFields';

const style = {
    container: {
        margin: 5
    },
    navButton: {
        margin: 10
    },
    linearProgressContainer: {
        paddingBottom: 10,
        width: '95%'
    }
};

class BookingForm extends Component {
    constructor(props) {
        super(props);
        this.state = (() => {
            const state = {
                fields: {},
                bookedBy: '',
                bookings: [],
                isSaved: false,
                isSubmitting: false,
                isSubmitted: false,
                errorMessages: []
            };

            props.fields.forEach(function(field) {
                state.fields[field.id] = {
                    value: field.value,
                    valid: field.valid,
                    label: field.label
                }
            });
            return state;
        })();

        this._onFieldChange = this._onFieldChange.bind(this);
        this._onCreateBooking = this._onCreateBooking.bind(this);
        this._handleSubmit = this._handleSubmit.bind(this);
        this._onDeleteBooking = this._onDeleteBooking.bind(this);
        this._onSetBookedBy = this._onSetBookedBy.bind(this);
    }

    componentWillReceiveProps(props) {
        if (props.form) {
            this.setState({
                fields: props.form.fields,
                formID: props.form._id,
                bookings: props.form.bookings
            })
        }
    }

    _handleSave() {
        const form = {
            formID: this.state.formID,
            clientID: this.props.clientID,
            fields: this.state.fields,
            bookings: this.state.bookings
        };
        Meteor.call('booking.saveForm', form, (err, formID) => {
            if (err) {
                console.log(err);
            }
            console.log('form saved: ' + formID);
            this.setState({
                formID,
                isSaved: true
            })
        });
    }

    _handleSubmit() {
        const form = {
            formID: this.state.formID,
            clientID: this.props.clientID,
            fields: this.state.fields,
            bookings: this.state.bookings,
            bookedBy: this.state.bookedBy
        };

        this.setState({
            isSubmitting: true
        });

        Meteor.call('booking.submitToCalendar', form, (err, res) => {
            if (err) {
                console.log(err);

                this.setState({
                    errorMessages: [...this.state.errorMessages, 'There was a problem saving the appointments to the calendar']
                })
            } else {
                console.log(res);
                this.setState({
                    isSubmitted: true,
                    isSubmitting: false
                })
            }
        });
    }

    _getSaveButton(isSaved) {
        return (isSaved ?
                <RaisedButton style={style.navButton} primary={true} label='Saved!' disabled={true}/> :
                <RaisedButton style={style.navButton} primary={true} label='Save'
                              onTouchTap={this._handleSave.bind(this)}/>
        )
    }

    _onFieldChange(id, value, valid) {
        const newFields = _.extend({}, this.state.fields);
        newFields[id].value = value;
        newFields[id].valid = valid;

        // Reset buttons and errors since something was changed
        this.setState({
            fields: newFields,
            isSaved: false,
            isSubmitted: false,
            errorMessages: []
        })
    }

    _onCreateBooking(newBooking) {
        let bookingNum = 1;

        this.state.bookings.forEach(function(booking) {
            console.log(booking);
            console.log(newBooking.type);
            if (booking.type == newBooking.type) {
                bookingNum++;
            }
        });

        this.setState({
            isSaved: false,
            bookings: this.state.bookings.concat({
                bookingNum,
                type: newBooking.type,
                date: newBooking.date,
                startTime: newBooking.startTime,
                endTime: newBooking.endTime
            })
        })
    }

    _onDeleteBooking(index) {
        const newBookings = this.state.bookings.slice(0);
        newBookings.splice(index, 1);
        this.setState({
            isSaved: false,
            bookings: newBookings
        })
    }

    _onSetBookedBy(id, value, valid) {
        this.setState({
            bookedBy: value
        })
    }

    render() {
        return (
            <div>
                <Tabs initialSelectedIndex={1} >
                    <Tab label='Client Info'>
                        <ClientInfoTab
                            intake={this.props.intake}
                            subReady={this.props.intakeSubReady}
                        />
                    </Tab>
                    <Tab label='Details'>
                        <TattooDetailsTab formTemplate={this.props.fields}
                                          formValues={this.state.fields}
                                          style={style.container}
                                          artists={this.props.artists}
                                          subReady={this.props.artistSubReady}
                                          defaultArtist={this.props.artist}
                                          onFieldChange={this._onFieldChange}
                        />
                    </Tab>
                    <Tab label='Sessions'>
                        <BookingsListTab
                            style={style.container}
                            bookings={this.state.bookings}
                            onSubmitBooking={this._onCreateBooking}
                            deleteBooking={this._onDeleteBooking}
                            setBookedBy={this._onSetBookedBy}
                            bookedBy={this.state.bookedBy}
                        />
                        {this._getSaveButton(this.state.isSaved)}
                        <SubmitErrorDialog
                            handleSubmit={this._handleSubmit}
                            fieldValues={this.state.fields}
                            bookedBy={this.state.bookedBy}
                            bookings={this.state.bookings}
                            isSubmitting={this.state.isSubmitting}
                            isSubmitted={this.state.isSubmitted}
                            errorMessages={this.state.errorMessages}
                        />
                    </Tab>
                    <Tab label='Recommendation'>
                        <RecommendationsTab />
                    </Tab>
                </Tabs>
            </div>
        );
    }
}


BookingForm.propTypes = {
    form: PropTypes.object,
    client: PropTypes.object,
    artists: PropTypes.array
};

export default BookingForm = createContainer(({ clientID }) => {
    const artistSubscription = Meteor.subscribe('artist');
    const formSubscription = Meteor.subscribe('booking');
    const intakeSubscription = Meteor.subscribe('intake');

    return {
        artistSubReady: artistSubscription.ready(),
        formSubReady: formSubscription.ready(),
        intakeSubReady: intakeSubscription.ready(),
        artists: Artist.find().fetch(),
        fields: defaultFields,
        form: Booking.findOne({clientID: clientID}),
        intake: Intake.findOne({clientID: clientID}, {sort: {natural: -1}}),
        clientID
    }
}, BookingForm);