import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import RaisedButton from 'material-ui/RaisedButton';
import {Tabs, Tab} from 'material-ui/Tabs';
import Artist from '../../../imports/Artist/artist';
import Consultation from '../../../imports/Consultation/consultation';
import Client from '../../../imports/Client/client';
import TattooDetailsTab from './TattooDetailsTab';
import BookingsTab from './BookingsTab';
import ClientInfoTab from './ClientInfoTab';
import RecommendationsTab from './RecommendationsTab';
import SubmitErrorDialog from './SubmitErrorDialog';
import defaultFields from '../../constants/defaultConsultationFormFields';

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

class ConsultationForm extends Component {
    constructor(props) {
        super(props);
        this.state = (() => {
            const state = {
                fields: {},
                sessions: [],
                isSaved: false,
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
        this._onCreateSession = this._onCreateSession.bind(this);
        this._handleSubmit = this._handleSubmit.bind(this);
    }

    componentWillReceiveProps(props) {
        if (props.form) {
            this.setState({
                fields: props.form.fields,
                formID: props.form._id,
                sessions: props.form.sessions
            })
        }
    }

    _handleSave() {
        const form = {
            formID: this.state.formID,
            clientID: this.props.client._id,
            fields: this.state.fields,
            sessions: this.state.sessions
        };
        Meteor.call('consultation.saveForm', form, (err, formID) => {
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
            clientID: this.props.client._id,
            fields: this.state.fields,
            sessions: this.state.sessions,
        };

        Meteor.call('consultation.submitToCalendar', form, (err, res) => {
            if (err) {
                console.log(err);

                this.setState({
                    errorMessages: [...this.state.errorMessages, 'There was a problem saving the appointments to the calendar']
                })
            } else {
                console.log(res);
                this.setState({
                    isSubmitted: true
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

    _onCreateSession(session) {
        this.setState({
            isSaved: false,
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
        return (
            <div>
                <Tabs initialSelectedIndex={1} >
                    <Tab label='Client Info'>
                        <ClientInfoTab
                            client={this.props.client}
                            subReady={this.props.clientSubReady}
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
                    <Tab label='Booking'>
                        <BookingsTab style={style.container} sessions={this.state.sessions}
                                     onSubmitSession={this._onCreateSession}/>
                        {this._getSaveButton(this.state.isSaved)}
                        <SubmitErrorDialog
                            handleSubmit={this._handleSubmit}
                            fieldValues={this.state.fields}
                            sessions={this.state.sessions}
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


ConsultationForm.propTypes = {
    form: PropTypes.object,
    client: PropTypes.object,
    artists: PropTypes.array
};

export default ConsultationForm = createContainer(({ clientID }) => {
    const artistSubscription = Meteor.subscribe('artist');
    const formSubscription = Meteor.subscribe('consultation');
    const clientSubscription = Meteor.subscribe('client');

    return {
        artistSubReady: artistSubscription.ready(),
        formSubReady: formSubscription.ready(),
        clientSubReady: clientSubscription.ready(),
        artists: Artist.find().fetch(),
        fields: defaultFields,
        form: Consultation.findOne({clientID: clientID}),
        client: Client.findOne({_id: clientID})
    }
}, ConsultationForm);