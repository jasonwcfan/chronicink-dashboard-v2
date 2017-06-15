import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import RaisedButton from 'material-ui/RaisedButton';
import Checkbox from 'material-ui/Checkbox';
import CommunicationCall from 'material-ui/svg-icons/communication/call';

const style = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        fontFamily: 'Roboto, sans-serif'
    },
    item: {
        padding: 10
    },
    messageContainer: {
        paddingBottom: 24
    },
    callUsContainer: {
        marginTop: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    callUsButton: {
        '@media (min-width: 768px)': {
            display: 'none'
        }
    },
    phoneNumber: {
        '@media (min-width: 768px)': {
            fontSize: '2em'
        }
    }
};

@Radium
class CallUsStep extends Component {
    constructor(props) {
        super(props);

        this.state = {
            missedCall: false
        };

        this._handleMissedCall = this._handleMissedCall.bind(this);
    }

    _handleMissedCall() {
        this.setState({
            missedCall: !this.state.missedCall
        });

        Meteor.call('intake.missedCall', this.props.formID, function(err, res){
            
        })
    }

    render() {
        let message = this.props.filledInternally ?
            <div style={style.messageContainer}>
                Please find a consultant to finish your booking.
            </div> :
            <div style={style.messageContainer}>
                <div style={style.callUsContainer}>
                    <p>Please give us a call when you are ready to leave your deposit.</p>
                    <div style={style.callUsButton}>
                        <RaisedButton
                            href="tel:416-544-0311"
                            target="_blank"
                            label="Call Us"
                            primary={true}
                            display={!this.filledInternally}
                            icon={<CommunicationCall />}
                        />
                    </div>
                    <p style={style.phoneNumber}>416-544-0311</p>
                    <Checkbox
                        style={{width: 'initial'}}
                        labelStyle={{width: 'initial'}}
                        labelPosition='left'
                        label={this.state.missedCall ? 'OK, we\'ll get back to you!' : 'Did we miss your call?'}
                        onCheck={this._handleMissedCall}
                        disabled={this.state.missedCall} />
                </div>
                <p>NOTE: The submission of this form does not imply that an appointment or booking has been made. Please contact us if you would like to continue with your consultation.
                    This form will be deleted in 24 hours if no official booking and deposit has been completed.
                </p>
            </div>;

        return (
            <div style={style.container}>
                <h2>You're not done!</h2>
                {message}
            </div>
        );
    }
}

CallUsStep.propTypes = {
    filledInternally: PropTypes.bool
};

export default Radium(CallUsStep);
