import React, { Component } from 'react';
import Radium from 'radium';
import RaisedButton from 'material-ui/RaisedButton';
import CommunicationCall from 'material-ui/svg-icons/communication/call';

const style = {
    container: {
        display: 'flex',
        minHeight: 500,
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        fontFamily: 'Roboto, sans-serif'
    },
    item: {
        padding: 10
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
    }

    _handleChange(idx) {
        this.props.onToggleAgreement(idx);
    }

    render() {
        return (
            <div style={style.container}>
                <h2>You're not finished yet!</h2>
                <p>If you are in the shop, please let a staff member know that you've completed the form. Otherwise, please give us a call when you are ready to leave your deposit.</p>
                <div style={style.callUsButton}>
                    <RaisedButton
                        href="tel:416-544-0311"
                        target="_blank"
                        label="Call Us"
                        primary={true}
                        icon={<CommunicationCall />}
                    />
                </div>
                <p style={style.phoneNumber}>416-544-0311</p>

                <p>NOTE: The submission of this form does not imply that an appointment or booking has been made. Please contact us if you would like to continue with your consultation.
                    This form will be deleted in 24 hours if no official booking and deposit has been completed.
                </p>
            </div>
        );
    }
}

export default Radium(CallUsStep);
