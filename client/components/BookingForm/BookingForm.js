import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import RaisedButton from 'material-ui/RaisedButton';
import {Tabs, Tab} from 'material-ui/Tabs';
import Artist from '../../../imports/Artist/artist';
import Booking from '../../../imports/Booking/booking';
import Intake from '../../../imports/Intake/intake';
import App from '../app';
import TattooDetailsTab from './TattooDetailsTab';
import BookingsListTab from './BookingsListTab';
import ClientInfoTab from './ClientInfoTab';
import defaultFields from '../../constants/defaultBookingFormFields';
import Dialog from 'material-ui/Dialog';
import Moment from 'moment';
import CircularProgress from 'material-ui/CircularProgress';

const style = {
    tabs: {
        width: '100%'
    },
    container: {
        margin: 24
    },
    navButton: {
        margin: 10
    }
};

class BookingForm extends Component {
    constructor(props) {
        super(props);
        this.state = (() => {
            const state = {
                tabIndex: 0,
                fields: {},
                bookedBy: '',
                bookedThru: 'in person',
                presentationRequired: true,
                bookings: [],
                isSaved: false,
                isSubmitting: false,
                isSubmitted: false,
                showErrorDialog: false,
                errorDialog: {
                    errors: [],
                    actions: null
                }
            };

            props.fields.forEach(function(field) {
                state.fields[field.id] = {
                    value: field.value,
                    errorText: field.required && !field.value ? `Not a valid ${field.label}` : null,
                    touched: false,
                    label: field.label
                }
            });
            return state;
        })();

        this._handleFieldChange = this._handleFieldChange.bind(this);
        this._handleCreateBooking = this._handleCreateBooking.bind(this);
        this._handleSubmit = this._handleSubmit.bind(this);
        this._handleDeleteBooking = this._handleDeleteBooking.bind(this);
        this._handleSetBookedBy = this._handleSetBookedBy.bind(this);
        this._handleSetBookedThru = this._handleSetBookedThru.bind(this);
        this._handleTogglePresentationRequired = this._handleTogglePresentationRequired.bind(this);
        this._handlePreSubmit = this._handlePreSubmit.bind(this);
        this._handleChangeTab = this._handleChangeTab.bind(this);
    }

    componentWillReceiveProps(props) {
        if (props.form) {
            this.setState({
                fields: props.form.fields,
                formID: props.form._id,
                presentationRequired: props.form.presentationRequired,
                bookings: props.form.bookings
            })
        }
    }

    _handleSave() {
        const form = {
            formID: this.state.formID,
            clientID: this.props.clientID,
            presentationRequired: this.state.presentationRequired,
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
            bookedBy: this.state.bookedBy,
            bookedThru: this.state.bookedThru,
            presentationRequired: this.state.presentationRequired
        };

        this.setState({
            isSubmitting: true
        });

        Meteor.call('booking.submitToCalendar', form, (err, res) => {
            if (err) {
                console.log(err);

                this.setState({
                    errorDialog: {
                        errors: [...this.state.errorDialog.errors, 'There was a problem saving the appointments to the calendar']
                    }
                })
            } else {
                this.setState({
                    isSubmitted: true,
                    isSubmitting: false
                })
            }
        });
    }

    _handlePreSubmit() {
        const errors = [];
        let fields = this.state.fields;

        Object.keys(fields).forEach((key) => {
            if (fields[key].errorText) {
                fields[key].touched = true;
                errors.push(fields[key].errorText);
            }
        });

        if (this.state.bookings.length == 0) {
            errors.push('There should be at least 1 session to book');
        }

        if (this.state.bookedBy.length == 0) {
            errors.push('Please record who did the booking');
        }

        if (this.state.presentationRequired) {
            let presentNow = false;
            let hasPresentation = false;
            this.state.bookings.forEach((booking) => {
                if (booking.type == 'Presentation' || booking.type == 'Email Presentation') {
                    hasPresentation = true;
                }

                if (booking.type == 'Session' && Moment(booking.startTime).diff(Moment({hour: 23, minute: 59})) < 1555200000) {
                    presentNow = true;
                }

            });

            if (presentNow && !hasPresentation) {
                errors.push('The first session is in less than 18 days, please book a presentation at this point');
            }
        }

        if (errors.length) {
            this.setState({
                fields: fields,
                showErrorDialog: true,
                errorDialog: {
                    errors: errors,
                    actions: (
                        <RaisedButton
                            label='Ok'
                            primary={true}
                            onTouchTap={() => { this.setState({showErrorDialog: false});  } }
                        />
                    )
                }
            });
        } else {
            this._handleSubmit();
        }
    }

    _getSaveButton(isSaved) {
        return (isSaved ?
                <RaisedButton style={style.navButton} primary={true} label='Saved!' disabled={true}/> :
                <RaisedButton style={style.navButton} primary={true} label='Save'
                              onTouchTap={this._handleSave.bind(this)}/>
        )
    }

    _handleFieldChange(id, value, errorText) {
        const newFields = Object.assign({}, this.state.fields);
        newFields[id].value = value;
        newFields[id].errorText = errorText;
        newFields[id].touched = true;

        // Reset buttons and errors since something was changed
        this.setState({
            fields: newFields,
            isSaved: false,
            isSubmitted: false,
            errorDialog: {
                errors: []
            }
        })
    }

    _handleCreateBooking(newBooking) {
        let bookingNum = 1;

        this.state.bookings.forEach(function(booking) {
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

    _handleDeleteBooking(index) {
        const newBookings = this.state.bookings.slice(0);
        const deletedBooking = newBookings[index];

        newBookings.splice(index, 1);
        newBookings.forEach((booking) => {
            if (booking.type == deletedBooking.type && booking.bookingNum > deletedBooking.bookingNum) {
                booking.bookingNum --;
            }
        });

        this.setState({
            isSaved: false,
            bookings: newBookings
        })
    }

    _handleSetBookedBy(id, value, valid) {
        this.setState({
            bookedBy: value
        })
    }

    _handleSetBookedThru(target, idx, value) {
        this.setState({
            bookedThru: value
        })
    }

    _handleTogglePresentationRequired() {
        this.setState({
            presentationRequired: !this.state.presentationRequired
        })
    }

    _handleChangeTab(e, tabIndex) {
        // Prevent something on the next page from being selected accidentally on touch up
        if (e) {e.preventDefault();}
        // Reset to the top of the document
        window.scrollTo(0, 0);
        this.setState({
            tabIndex: tabIndex
        })
    }

    render() {
        return (
            <App appName='Booking Form'>
                <Tabs style={style.tabs} value={this.state.tabIndex}>
                    <Tab label='Client Info' value={0} onActive={() => {this._handleChangeTab(null, 0)}}>
                        <ClientInfoTab
                            style={style.container}
                            intake={this.props.intake}
                            subReady={this.props.intakeSubReady}
                        />
                        <RaisedButton
                            style={style.navButton}
                            primary={true}
                            label='Next'
                            onTouchTap={(e) => {this._handleChangeTab(e, 1)}}
                        />
                    </Tab>
                    <Tab label='Details' value={1} onActive={() => {this._handleChangeTab(null, 1)}}>
                        <TattooDetailsTab formTemplate={this.props.fields}
                                          formValues={this.state.fields}
                                          style={style.container}
                                          artists={this.props.artists}
                                          subReady={this.props.artistSubReady}
                                          defaultArtist={this.props.artist}
                                          onFieldChange={this._handleFieldChange}
                        />
                        <RaisedButton
                            style={style.navButton}
                            label='Previous'
                            onTouchTap={(e) => {this._handleChangeTab(e, 0)}}
                        />
                        <RaisedButton
                            style={style.navButton}
                            primary={true}
                            label='Next'
                            onTouchTap={(e) => {this._handleChangeTab(e, 2)}}
                        />
                    </Tab>
                    <Tab label='Sessions' value={2} onActive={() => {this._handleChangeTab(null, 2)}}>
                        <BookingsListTab
                            style={style.container}
                            bookings={this.state.bookings}
                            onSubmitBooking={this._handleCreateBooking}
                            deleteBooking={this._handleDeleteBooking}
                            setBookedBy={this._handleSetBookedBy}
                            setBookedThru={this._handleSetBookedThru}
                            togglePresentationRequired={this._handleTogglePresentationRequired}
                            bookedBy={this.state.bookedBy}
                            bookedThru={this.state.bookedThru}
                            presentationRequired={this.state.presentationRequired}
                        />
                        {this._getSaveButton(this.state.isSaved)}
                        <div style={{ display: 'inline' }}>
                            {
                                this.state.isSubmitting
                                ?
                                <CircularProgress
                                    style={{ marginLeft: 28 }}
                                    size={16}
                                />
                                :
                                <RaisedButton
                                    secondary={true}
                                    disabled={this.state.isSubmitted}
                                    label={this.state.isSubmitted ? 'Done' : 'Submit'}
                                    onTouchTap={this._handlePreSubmit}
                                />

                            }
                            <Dialog
                                modal={true}
                                title='Form Errors'
                                open={this.state.showErrorDialog}
                                onRequestClose={() => { this.setState({showErrorDialog: false}) } }
                                actions={ this.state.errorDialog.actions }
                            >
                                { this.state.errorDialog.errors.map((error, index) => <p key={index} style={{color: 'red'}}>{`- ${error}`}</p>) }
                            </Dialog>
                        </div>
                    </Tab>
                </Tabs>
            </App>
        );
    }
}


BookingForm.propTypes = {
    form: PropTypes.object,
    client: PropTypes.object,
    artists: PropTypes.array
};

export default BookingForm = createContainer(({ match }) => {
    const artistSubscription = Meteor.subscribe('artist');
    const formSubscription = Meteor.subscribe('booking');
    const intakeSubscription = Meteor.subscribe('intake');
    const clientID = match.params.clientID;

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
