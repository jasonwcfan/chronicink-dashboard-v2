import React, { Component, PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton';

const style = {
    header: {
        margin: 10
    },
    navButtonsGroup: {
        display: 'inline'
    },
    navButton: {
        margin: 10
    }
};

class FinishedStep extends Component {
    constructor(props) {
        super(props);

        const state = {
            formIsValid: true
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

        console.log(state);
        console.log(props);

        this.state = state;

        this._renderSubmitButton = this._renderSubmitButton.bind(this);
        this._renderMessage = this._renderMessage.bind(this);
    }

    _renderMessage() {
        if (this.state.formIsValid) {
            return (
                <div>
                    <h2>Finished!</h2>
                    <p>Thank you for taking the time to fill out our form!</p>
                </div>
            );
        }

        return (
            <div>
                <h2>Form Incomplete</h2>
                <p>There are some problems with the form. Please fix them before submitting</p>
            </div>
        );
    }

    _renderSubmitButton() {
        return (this.props.isSaved ?
                <RaisedButton style={style.navButton} primary={true} label='Saved!' disabled={true} /> :
                <RaisedButton style={style.navButton} primary={true} label='Submit' onTouchTap={this._handleSubmit} />
        )
    }

    render() {
        return (
            <div>
                {this._renderMessage()}
                <div style={style.navButtonsGroup}>
                    <RaisedButton style={style.navButton} label="Previous" onTouchTap={this.props.decrementStep} />
                    {this.state.formIsValid ? this._renderSubmitButton() : null}
                </div>
            </div>
        )
    }
}

FinishedStep.propTypes = {
    fields: PropTypes.object,
    disclaimerAgreements: PropTypes.array,
    isSaved: PropTypes.bool
};

export default FinishedStep;