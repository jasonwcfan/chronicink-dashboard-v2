import React, { Component, PropTypes } from 'react';
import Moment from 'moment';
import List from 'material-ui/List';
import ListItem from 'material-ui/List/ListItem';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Client from '../../../../imports/Client/client';

class ClientInfoTab extends Component {
    constructor(props) {
        super(props);
        console.log(this.props.client);
    }

    _renderClientInfo(client) {
        return Object.keys(client).map((key) => {
            const property = client[key];
            if (key == 'conditions') {
                let conditionsString = '';
                property.forEach(function(condition, i) {
                    console.log(property);
                    conditionsString += i < property.length - 1 ? condition + ', ': condition;

                });
                return (<ListItem primaryText={conditionsString} secondaryText='Medical Conditions' />)
            } else if (property.label) {
                switch (property.type) {
                    case 'textBox':
                    case 'textField':
                    case 'region':
                    case 'country':
                        return (<ListItem primaryText={property.value} secondaryText={property.label} />);
                    case 'date':
                        return (<ListItem primaryText={Moment(property.value).format('MMMM Do YYYY')} secondaryText={property.label} />);
                }
            }
        })
    }

    render() {
        return (
            <div>
                <List>
                    {this.props.client? this._renderClientInfo(this.props.client) : 'No client set'}
                </List>
            </div>
        );

    }
}

ClientInfoTab.PropTypes = {
    client: PropTypes.object
};

export default ClientInfoTab;