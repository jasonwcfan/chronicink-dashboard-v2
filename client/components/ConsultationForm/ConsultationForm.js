import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import RaisedButton from 'material-ui/RaisedButton';
import {Tabs, Tab} from 'material-ui/Tabs';
import Artist from '../../../imports/Artist/artist';
import Consultation from '../../../imports/Consultation/consultation';
import TattooDetailsTab from './TattooDetailsTab';
import BookingsTab from './BookingsTab';
import ClientInfoTab from './ClientInfoTab';

const style = {
    container: {
        margin: 5
    },
    navButton: {
        margin: 10
    },
    finishedStepContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    finishedStepNavButtons: {
        display: 'inline'
    },
    linearProgressContainer: {
        paddingBottom: 10,
        width: '95%'
    }
};

class ConsultationForm extends Component {
    constructor(props) {
        super(props);
        this.state = (() => {
            const state = {};
            props.fields.forEach(function(field) {
                state[field.id] = {
                    value: field.value,
                    valid: field.valid
                }
            });
            state.sessions = props.sessions;
            return state;
        })();

        this._onFieldChange = this._onFieldChange.bind(this);
        this._onCreateSession = this._onCreateSession.bind(this);
    }

    _handleSave() {
        const form = {
            clientID: this.props.client._id,
            formID: this.props.formID,
            fields: this.props.fields,
            sessions: this.props.sessions,
            artist: this.props.artist
        };
        this.props.onSaveConsultationForm(form);
    }

    _handleSubmit() {
        const form = {
            clientID: this.props.client._id,
            fields: this.props.fields,
            sessions: this.props.sessions,
            artist: this.props.artist
        };
        Meteor.call('consultation.submitToCalendar', form);
    }

    _getSaveButton(isSaved) {
        return (isSaved ?
                <RaisedButton style={style.navButton} primary={true} label='Saved!' disabled={true}/> :
                <RaisedButton style={style.navButton} primary={true} label='Save'
                              onTouchTap={this._handleSave.bind(this)}/>
        )
    }

    _onFieldChange(id, value, valid) {
        this.setState({
            [id]: {
                value,
                valid
            }
        })
    }

    _onCreateSession(session) {
        this.setState({
            sessions: this.state.sessions.concat({
                sessionIndex: this.state.sessions.length,
                sessionType: session.sessionType,
                date: session.date,
                startTime: session.startTime,
                endTime: session.endTime
            })
        })
    }

    render() {
        console.log(this.state);
        return (
            <div>
                <Tabs initialSelectedIndex={1} >
                    <Tab label='Client Info'>
                        <ClientInfoTab client={this.props.client} />
                    </Tab>
                    <Tab label='Details'>
                        <TattooDetailsTab fields={this.props.fields} style={style.container}
                                          artists={this.props.artists}
                                          subReady={this.props.artistSubReady}
                                          defaultArtist={this.props.artist}
                                          onFieldChange={this._onFieldChange}
                        />
                    </Tab>
                    <Tab label='Booking'>
                        <BookingsTab style={style.container} sessions={this.state.sessions}
                                     onSubmitSession={this._onCreateSession}/>
                        {this._getSaveButton(this.props.isSaved)}
                        <RaisedButton
                            style={style.navButton}
                            secondary={true}
                            label='Submit'
                            onTouchTap={this._handleSubmit.bind(this)}
                        />
                    </Tab>
                </Tabs>
            </div>
        );
    }
}


ConsultationForm.propTypes = {
    fields: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        label: PropTypes.string,
        inputType: PropTypes.string.isRequired,
        value: PropTypes.any,
        valid: PropTypes.bool.isRequired,
        required: PropTypes.bool.isRequired
    }).isRequired).isRequired,
    sessions: PropTypes.arrayOf(PropTypes.shape({
        sessionIndex: PropTypes.number,
        sessionType: PropTypes.string,
        date: PropTypes.object,
        startTime: PropTypes.object,
        endTime: PropTypes.object,
    }).isRequired).isRequired,
    isSaved: PropTypes.bool.isRequired,
    savingForm: PropTypes.bool.isRequired,
    formID: PropTypes.string,
    client: PropTypes.object,
    artist: PropTypes.object
};

export default ConsultationForm = createContainer(({ params }) => {
    const artistSubscription = Meteor.subscribe('artist');
    const formSubscription = Meteor.subscribe('consultation');

    return {
        artistSubReady: artistSubscription.ready(),
        formSubReady: formSubscription.ready(),
        artists: Artist.find().fetch(),
        // form: ConsultationForm.findOne({})
    }
}, ConsultationForm);