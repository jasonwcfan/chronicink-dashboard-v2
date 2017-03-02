import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import CommunicationCall from 'material-ui/svg-icons/communication/call';

const style = {
    item: {
        padding: 10
    }
};

class CallUsStep extends Component {
    constructor(props) {
        super(props);
    }

    _handleChange(idx) {
        this.props.onToggleAgreement(idx);
    }

    render() {
        return (
            <div style={{textAlign: 'center'}}>
                <h2>You're not finished yet!</h2>
                <p>If you are in the shop, please let a staff member know that you've completed the form. Otherwise, please give us a call when you are ready to leave your deposit.</p>

                <RaisedButton
                    href="tel:416-544-0311"
                    target="_blank"
                    label="Call Us"
                    primary={true}
                    style={styles.button}
                    icon={<CommunicationCall />}
                />
                <p style={{marginTop: 10}}>416-544-0311</p>

                <p style={{textAlign: 'center'}}>NOTE: The submission of this form does not imply that an appointment or booking has been made. Please contact us if you would like to continue with your consultation.
                    This form will be deleted in 24 hours if no official booking and deposit has been completed.
                </p>
            </div>
        );
    }
}

export default CallUsStep;
