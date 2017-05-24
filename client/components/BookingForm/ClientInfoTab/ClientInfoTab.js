import React, { Component, PropTypes } from 'react';
import Moment from 'moment';
import List from 'material-ui/List';
import ListItem from 'material-ui/List/ListItem';

/**
 * The tab with information about the client associated with this booking
 */
class ClientInfoTab extends Component {
    constructor(props) {
        super(props);
    }

    _renderClientInfo(intake) {
        const clientInfo = [];
        let conditionsString = '';

        // Iterate through each field in the intake and return a ListItem with that information
        Object.keys(intake.fields).forEach((key, idx) => {
            const property = intake.fields[key];
            switch (property.id) {
                case 'dateOfBirth':
                    clientInfo.push(<ListItem key={idx} primaryText={Moment(property.value).format('MMMM Do YYYY')} secondaryText={property.label} />);
                    break;
                default:
                    clientInfo.push(<ListItem key={idx} primaryText={property.value} secondaryText={property.label} />);
            }
        });

        // Render the medical information
        intake.medicalConditions.forEach(function(condition) {
            if (condition.value == true) {
                conditionsString += condition.id + ', ';
            }
        });
        conditionsString = conditionsString.slice(0, -2);

        clientInfo.push(<ListItem key={Object.keys(intake.fields).length} primaryText={conditionsString} secondaryText='Medical Conditions' />);

        return clientInfo;
    }

    render() {
        return (
            <div style={this.props.style}>{this.props.subReady ?
                <List>
                    {this.props.intake? this._renderClientInfo(this.props.intake) : 'No client set'}
                </List>
                : null
            }
            </div>
        );

    }
}

ClientInfoTab.PropTypes = {
    intake: PropTypes.object
};

export default ClientInfoTab;