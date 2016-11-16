import React, { Component, PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import {Tabs, Tab} from 'material-ui/Tabs';
import TattooDetailsTab from './TattooDetailsTab';
import BookingsTab from './BookingsTab';

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
    }

    _handleSubmit() {
        const form = {
            fields: this.props.fields,
            sessions: this.props.sessions,
        };
        this.props.onSubmitConsultationForm(form);
    }

    _getSubmitButton(isSaved) {
        return (isSaved ?
                <RaisedButton style={style.navButton} primary={true} label='Saved!' disabled={true}/> :
                <RaisedButton style={style.navButton} primary={true} label='Submit'
                              onTouchTap={this._handleSubmit.bind(this)}/>
        )
    }

    render() {
        return (
            <div>
                <Tabs>
                    <Tab label='Details'>
                        <TattooDetailsTab fields={this.props.fields} style={style.container}
                                          onFieldChange={this.props.onFieldChange}/>
                    </Tab>
                    <Tab label='Booking'>
                        <BookingsTab style={style.container} sessions={this.props.sessions}
                                     onSubmitSession={this.props.onSubmitSession}/>
                        {this._getSubmitButton(this.props.isSaved)}
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
    formID: PropTypes.string
};

export default ConsultationForm;