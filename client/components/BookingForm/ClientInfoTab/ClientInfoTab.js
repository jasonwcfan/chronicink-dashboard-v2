import React, { Component, PropTypes } from 'react';
import Moment from 'moment';
import List from 'material-ui/List';
import ListItem from 'material-ui/List/ListItem';

class ClientInfoTab extends Component {
    constructor(props) {
        super(props);
    }

    _renderClientInfo(client) {
        return Object.keys(client).map((key) => {
            const property = client[key];
            if (key == 'conditions') {
                // If this property is a list of conditions, construct a string to represent it
                let conditionsString = '';
                property.forEach(function(condition, i) {
                    conditionsString += i < property.length - 1 ? condition + ', ': condition;

                });
                return (<ListItem key={key} primaryText={conditionsString} secondaryText='Medical Conditions' />)
            } else if (property.label) {
                // Otherwise, this property is a regular field, generate a ListItem for it
                switch (property.id) {
                    case 'dateOfBirth':
                        return (<ListItem key={key} primaryText={Moment(property.value).format('MMMM Do YYYY')} secondaryText={property.label} />);
                    default:
                        return (<ListItem key={key} primaryText={property.value} secondaryText={property.label} />);
                }
            }
        })
    }

    render() {
        return (
            <div>{this.props.subReady ?
                <List>
                    {this.props.client? this._renderClientInfo(this.props.client) : 'No client set'}
                </List>
                : null
            }
            </div>
        );

    }
}

ClientInfoTab.PropTypes = {
    client: PropTypes.object
};

export default ClientInfoTab;