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
import colors from '../../theme/colors'

const style = {
    tabs: {
        width: '100%'
    },
    container: {
        margin: 24
    },
    navButton: {
        margin: 10
    },
    tabItemContainer: {
        backgroundColor: colors.CitLightGrey
    }
};

/**
 * The form that is used to handle bookings for clients, after an IntakeForm has been created
 */
class BookingForm extends Component {
    constructor(props) {
        super(props);

        // A hacky way to set the state programmatically instead of hard coding default values
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

            // Go through all of the default files and initialize them based on their default values (set in
            // defaultBookingFormFields.js
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
        // New props are received, check if an existing form has been found in the database. If so, replace the default
        // values with the values from the existing form.
        if (props.form) {
            this.setState({
                fields: props.form.fields,
                formID: props.form._id,
                presentationRequired: props.form.presentationRequired,
                bookings: props.form.bookings
            })
        }
    }

    /**
     * Handle saving the form (when the save button or submit button is clicked
     * @private
     */
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

    /**
     * Handle submitting the form
     * @private
     */
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

    /**
     * Validate all the fields before the form is submitted
     * @private
     */
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

    /**
     * Validate each field before moving on to the next tab
     * @param e the click event that leads to moving to the next tab
     * @private
     */
    _validateFields(e) {
        const errors = [];
        let fields = this.state.fields;

        Object.keys(fields).forEach((key) => {
            if (fields[key].errorText) {
                fields[key].touched = true;
                errors.push(fields[key].errorText);
            }
        });

        // If there are errors, prevent navigating away from this tab
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
            // Actually move to the next tab
            this._handleChangeTab(e, 2);
        }
    }

    /**
     * Render the save button as either clickable or disabled, depending on whether the form has already been saved
     * @param isSaved whether or not the form is already saved
     * @returns {XML}
     * @private
     */
    _getSaveButton(isSaved) {
        return (isSaved ?
                <RaisedButton style={style.navButton} primary={true} label='Saved!' disabled={true}/> :
                <RaisedButton style={style.navButton} primary={true} label='Save'
                              onTouchTap={this._handleSave.bind(this)}/>
        )
    }

    /**
     * A very important function that is passed down to a lot of children, and is called every time a field on the
     * BookingForm changes.
     * @param id the id of the field that was changed
     * @param value the new value of the field
     * @param errorText null if the new value is valid, otherwise a string explaining why the field is not valid
     * @private
     */
    _handleFieldChange(id, value, errorText) {
        // Update the field with the new value
        const newFields = Object.assign({}, this.state.fields);
        newFields[id].value = value;
        newFields[id].errorText = errorText;
        newFields[id].touched = true;

        this.setState({
            fields: newFields,
            // Reset buttons and errors since something was changed
            isSaved: false,
            isSubmitted: false,
            errorDialog: {
                errors: []
            }
        })
    }

    /**
     * Create a new Session/Presentation, etc to add to the list. Passed down to children.
     * @param newBooking the new session to add to the list
     * @private
     */
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

    /**
     * Removes a session from the list. Passed down to children
     * @param index the index of the session in the list to remove
     * @private
     */
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

    /**
     * Set who the booking, the text field right before the submit button. Passed down to children
     * @param id necessary argument for the component this function is passed to.
     * @param value the value of the textField
     * @param valid whether the value is valid. (In this case as long as it's not blank)
     * @private
     */
    _handleSetBookedBy(id, value, valid) {
        this.setState({
            bookedBy: value
        })
    }

    /**
     * Set the format through which this booking was made (e.g. phone, in person). Passed down to children
     * @param target necessary argument for the component this function is passed to.
     * @param idx necessary argument for the component this function is passed to.
     * @param value the new value
     * @private
     */
    _handleSetBookedThru(target, idx, value) {
        this.setState({
            bookedThru: value
        })
    }

    /**
     * Toggle whether or not a presentation is required for this booking. Passed down to children
     * @private
     */
    _handleTogglePresentationRequired() {
        this.setState({
            presentationRequired: !this.state.presentationRequired
        })
    }

    /**
     * Handle changing the tab the user is on.
     * @param e the click event triggered to change the tab
     * @param tabIndex the index of the tab being changed to
     * @private
     */
    _handleChangeTab(e, tabIndex) {
        // Prevent something on the next page from being selected accidentally on touch up
        if (e) {e.preventDefault();}
        // Reset to the top of the document
        window.scrollTo(0, 0);
        this.setState({
            tabIndex: tabIndex
        })
    }

    /**
     * Renders all the components. Most things are within a <Tabs> component, and split into <Tab>s. ClientInfoTab,
     * TattooDetailsTab, and BookingsListTab are the primary components that are rendered in each <Tab>, along with
     * some buttons for navigation and form submission.
     * @returns {XML}
     */
    render() {
        return (
            <App appName='Booking Form'>
                <Tabs style={style.tabs} value={this.state.tabIndex} tabItemContainerStyle={style.tabItemContainer}>
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
                            onTouchTap={(e) => {this._validateFields(e)}}
                        />
                    </Tab>
                    <Tab label='Sessions' value={2} onActive={() => {this._validateFields(null)}}>
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

// The props that BookingForm expects to be passed. Incomplete list.
BookingForm.propTypes = {
    form: PropTypes.object,
    client: PropTypes.object,
    artists: PropTypes.array
};

// A react-meteor-data container that connects to and queries the database. It allows us to make sure that we are
// subscribed to all the collections we need access to, so that we won't run into cases where we expect to have some
// data but find that it's not available.
export default BookingForm = createContainer(({ match }) => {
    // Subscribe to the relevant collections
    const artistSubscription = Meteor.subscribe('artist');
    const formSubscription = Meteor.subscribe('booking');
    const intakeSubscription = Meteor.subscribe('intake');
    // Get the clientID from the URL parameters
    const clientID = match.params.clientID;

    return {
        // Passed to the BookingForm component so it knows when the data is ready. If we don't have this, we could
        // accidentally try to access data that hasn't finished loading yet
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
