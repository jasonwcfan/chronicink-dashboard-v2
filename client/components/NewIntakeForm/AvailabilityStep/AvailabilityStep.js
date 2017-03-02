import React, { Component, PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Checkbox from 'material-ui/Checkbox';

const style = {
    container: {
        fontFamily: 'Roboto, sans-serif'
    },
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
    }

    _handleChange(day, event, value) {
        this.props.onToggleCancellationAvailability(day.toLowerCase(), event.target.name, value);
    }

    render() {
        return (
            <div style={style.container}>
                <h2 style={{textAlign: 'center'}}>Availability if a spot opens up</h2>
                <p>
                    Sometimes, we will have last minute openings when there is a cancellation, so we may be able to get
                    started on your piece earlier than expected.
                </p>
                <p>
                    If you would like to be notified in case space opens
                    up, please let us know what times you are typically available to come in, and we will give you a
                    call if someone else gives up their spot.
                </p>
                <div style={style.weekDaysContainer}>
                    {weekDays.map((day) => {
                        const availability = this.props.cancellationAvailability[day.toLowerCase()];
                        return (
                            <div style={style.weekDay} key={day}>
                                <h3>{day}</h3>
                                <Checkbox
                                    label='Afternoon (12 - 5)'
                                    name='afternoon'
                                    checked={availability.afternoon}
                                    onCheck={this._handleChange.bind(this, day)}
                                />
                                <Checkbox
                                    label='Evening (5 - 8)'
                                    name='evening'
                                    checked={availability.evening}
                                    onCheck={this._handleChange.bind(this, day)}
                                />
                            </div>
                        )
                    })}
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