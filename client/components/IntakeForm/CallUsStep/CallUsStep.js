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
    callUsContainer: {
        marginTop: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
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
        let message = this.props.filledInternally ? <div>
            Please give us a call when you are ready to leave your deposit.
            <div style={style.callUsContainer}>
                <RaisedButton
                    href="tel:416-544-0311"
                    target="_blank"
                    label="Call Us"
                    primary={true}
                    display={!this.filledInternally}
                    icon={<CommunicationCall />}
                />
                <p style={style.phoneNumber}>416-544-0311</p>
                <Checkbox
                    style={{width: 'initial'}}
                    labelStyle={{width: 'initial'}}
                    labelPosition='left'
                    label={this.state.missedCall ? 'OK, we\'ll get back to you!' : 'Did we miss your call?'}
                    onCheck={this._handleMissedCall}
                    disabled={this.state.missedCall} />
            </div>
        </div> : <div>
            Please let a staff member know that you've completed the form.
        </div>;

        return (
            <div style={style.container}>
                <h2>You're not finished yet!</h2>
                {message}

                <p>NOTE: The submission of this form does not imply that an appointment or booking has been made. Please contact us if you would like to continue with your consultation.
                    This form will be deleted in 24 hours if no official booking and deposit has been completed.
                </p>
            </div>
        );
    }
}

CallUsStep.propTypes = {
    filledInternally: PropTypes.bool
};

export default Radium(CallUsStep);
