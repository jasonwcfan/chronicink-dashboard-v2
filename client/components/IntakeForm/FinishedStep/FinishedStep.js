import React, { Component, PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Checkbox from 'material-ui/Checkbox';

const style = {
    header: {
        margin: 10
    },
    navButtonsGroup: {
        display: 'inline'
    },
    navButton: {
        margin: 10
    },
    weekDaysContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center'
    },
    weekDay: {
        width: '33%'
    }
};

const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

class FinishedStep extends Component {
    constructor(props) {
        super(props);

        const state = {
            formIsValid: true,
        };

        const fields = props.fields;
        const agreements = props.disclaimerAgreements;
        for (let key in fields) {
            if (fields.hasOwnProperty(key)) {
                if (!fields[key].valid) {
                    state.formIsValid = false;
                    break;
                }
            }
        }

        for (let i = 0; i < agreements.length; i++) {
            if (agreements[i].required && !agreements[i].value) {
                state.formIsValid = false;
                break;
            }
        }

        this.state = state;

        this._renderSubmitButton = this._renderSubmitButton.bind(this);
        this._renderMessage = this._renderMessage.bind(this);
    }

    _renderMessage() {
        if (this.state.formIsValid) {
            return (
                <div>
                    <h2 style={{textAlign: 'center'}}>Almost done!</h2>
                    <p>
                        Thank you for taking the time to fill out our form.
                    </p>
                    <p>
                        Sometimes, we will have last minute openings when there is a cancellation, so we may be able to get
                        started on your piece earlier than expected.
                    </p>
                    <p>
                        If you would like to be notified in case space opens
                        up, please let us know what times you are typically available to come in, and we will give you a
                        call if someone else gives up their spot.
                    </p>
                    <div className="availabilities">
                        <div className="all-week">
                            <Checkbox
                                label='I am available all week'
                                name='all'
                                checked={this._allAvailabilityChecked()}
                                onCheck={this._handleChange.bind(this, 'all')}
                            />
                        </div>
                        {weekDays.map((day) => {
                            const availability = this.props.cancellationAvailability[day.toLowerCase()];
                            return (
                                <div className='availability' key={day}>
                                    <div className="day">
                                        <span>Monday</span>
                                    </div>
                                    <Checkbox
                                        label='Afternoon (12pm - 5pm)'
                                        name='afternoon'
                                        checked={availability.afternoon}
                                        onCheck={this._handleChange.bind(this, day)}
                                        className='twelve-to-five'
                                    />
                                    <Checkbox
                                        label='Evening (5pm - 8pm)'
                                        name='evening'
                                        checked={availability.evening}
                                        onCheck={this._handleChange.bind(this, day)}
                                        className='five-to-eight'
                                    />
                                </div>
                            )
                        })}
                    </div>
                </div>
            )
        }

        return (
            <div>
                <h2>Form Incomplete</h2>
                <p>There are some problems with the form. Please fix them before moving on</p>
            </div>
        )
    }

    _renderSubmitButton() {
        return (this.props.isSaving ?
                <RaisedButton style={style.navButton} primary={true} label='Saving...' disabled={true} /> :
                <RaisedButton style={style.navButton} primary={true} label='Submit' onTouchTap={this.props.handleSubmit} />
        )
    }

    _handleChange(day, event, value) {
        this.props.onToggleCancellationAvailability(day.toLowerCase(), event.target.name, value);
    }

    _allAvailabilityChecked() {
        return Object.keys(this.props.cancellationAvailability).reduce((allChecked, day) => {
            return allChecked && Object.keys(this.props.cancellationAvailability).reduce((timesChecked, time) => {
                return timesChecked && this.props.cancellationAvailability[day][time];
            }, true);
        }, true)
    }

    render() {
        return (
            <div>
                {this._renderMessage()}
                <div style={style.navButtonsGroup}>
                    <RaisedButton style={style.navButton} label="Go Back" onTouchTap={this.props.resetStep} />
                    {this.state.formIsValid ? this._renderSubmitButton() : null}
                </div>
            </div>
        )
    }
}

FinishedStep.propTypes = {
    fields: PropTypes.object,
    disclaimerAgreements: PropTypes.array,
    isSaving: PropTypes.bool,
    cancellationAvailability: PropTypes.object
};

export default FinishedStep;
