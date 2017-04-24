import React, { Component, PropTypes } from 'react';
import Moment from 'moment';
import List from 'material-ui/List';
import ListItem from 'material-ui/List/ListItem';

class ClientInfoTab extends Component {
    fieldMetasx(field) {
        if(!this.props.intake) {
            return undefined;
        }

        const matches = Object.keys(this.props.intake.fields).filter((key) => {
            return key == field;
        });

        return matches.length ? this.props.intake.fields[matches[0]] : undefined;
    }

    fieldValue(field) {
        return this.fieldMetasx(field) ? this.fieldMetasx(field).value : '';
    }

    medicalConditionsString() {
        const defaultText = 'N/A';

        if(!this.props.intake) {
            return defaultText;
        }

        const text = this.props.intake.medicalConditions.filter((condition) => {
            return condition.value;
        }).map((condition) => {
            return condition.id;
        }).join(', ');

        return text.length ? text : defaultText;
    }

    render() {
        return (
            <div>
                <h3 className="text-center">&nbsp;</h3>
                <dl className="dl-horizontal client-info-summary">
                  <dt>{'NAME'}</dt>
                  <dd>{`${this.fieldValue('firstName')} ${this.fieldValue('lastName')}`}</dd>

                  <dt>{'ADDRESS'}</dt>
                  <dd>
                    {`${this.fieldValue('address')}`} <br/>
                    {`${this.fieldValue('secondaryAddress')}`} { this.fieldValue('secondaryAddress').length ? <br/> : ''}
                    {`${this.fieldValue('city')}, ${this.fieldValue('region')}, ${this.fieldValue('postalCode')}`} <br/>
                    {`${this.fieldValue('country')}`} <br/>
                  </dd>

                  <dt>{'EMAIL'}</dt>
                  <dd>{`${this.fieldValue('email')}`} <br/></dd>

                  <dt>{'PHONE NUMBER'}</dt>
                  <dd>{`${this.fieldValue('primaryPhoneNumber')}`}, {`${this.fieldValue('secondaryPhoneNumber')}`}</dd>

                  <dt>{'DATE OF BIRTH'}</dt>
                  <dd>{`${Moment(this.fieldValue('dateOfBirth')).format('MMMM Do YYYY')}`}</dd>

                  <dt>{'MEDICAL CONDITIONS'}</dt>
                  <dd>{this.medicalConditionsString()}</dd>
                </dl>
            </div>
        );

    }
}

ClientInfoTab.PropTypes = {
    intake: PropTypes.object
};

export default ClientInfoTab;
