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
            const field = client[key];
            if (field.label) {
                switch (typeof field.value) {
                    case 'string':
                        return (<ListItem primaryText={field.value} secondaryText={field.label} />);
                    case 'object':
                        if (field.value.getMonth()) {
                            return (<ListItem primaryText={Moment(field.value).format('MMMM Do YYYY')} secondaryText={field.label} />);
                        }
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