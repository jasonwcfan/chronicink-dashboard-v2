import React, { Component } from 'react';
import Checkbox from 'material-ui/Checkbox';

const style = {
    item: {
        padding: 10
    }
};

class AgreementStep extends Component {
    constructor(props) {
        super(props);
    }

    _handleChange(idx) {
        this.props.onToggleAgreement(idx);
    }

    render() {
        return (
            <div>
                <h3>Deposit Structure</h3><br />
                    Small – $80<br />
                    Medium – $150<br />
                    Large – $350<br />
                    <br />
                        Small to Medium tattoos are priced uniquely by the tattoo. Small to Medium tattoos are estimated to require less than 4 hours for completion. Large pieces are priced by the hour or by a day rate.* Large tattoos are estimated to require more than 4 hours for completion. *Day rates only apply to large tattoos. Day rates are fixed rates for an entire day of tattooing from an artist because some artists prefer to work on a day rate so they don’t feel the pressure of time. Think of it as hiring a photographer for a day of work.
                        <br />
                            <h4>RIGHT OF REFUSAL</h4>

                            We reserve the right to refuse a tattoo at any point prior to the start of a tattoo. Deposits will be refunded if a sketch has not been drawn. We will only refuse a tattoo if we feel we cannot do the best artwork on a tattoo. Yes, this sounds subjective but we are in the business of doing tattoos, not to refuse them, and we hope our expertise will enable us to make sound judgements. This is the last thing we want to do and we realize you have to trust us, so we will do our best to make you proud.

                            <h4>REFUNDS</h4>
                            Deposits are non-refundable.

                            <h4>CHANGE OF IDEA</h4>
                            We will require a 2nd deposit if you change your idea after a sketch has been done. The 1st deposit will be voided and the price for the 2nd deposit will be the same as the 1st deposit.

                            <h4>RESCHEDULING</h4>
                            We require 72 hours notice for rescheduling or the deposit will be forfeited.

                            <h4>TOUCH UP POLICY</h4>
                            We guarantee the quality of all of our tattoos, except for tattoos on the hands, fingers, and feet (please ask our staff for an explanation). Our guarantee covers all ink loss caused during the healing process, and thus is good for 90 days after your final session. Please follow our aftercare instructions for best results.

                            <h4>UNDER 18 POLICY</h4>
                            If you are under 18 years old (for tattooing) or 17 years old (for piercing), we ask that you bring your Parent or Legal Guardian along to fill out the form below at the time of booking. The Parent or Guardian must be present when you are receiving your tattoo/piercing and present government issued identification.
                {this.props.agreements.map((agreement, idx) => (
                    <Checkbox
                        style={style.item}
                        key={agreement.id}
                        label={agreement.label}
                        name={agreement.id}
                        checked={agreement.value}
                        onCheck={this._handleChange.bind(this, idx)}
                    />
                ))}
            </div>
        );
    }
}

export default AgreementStep;