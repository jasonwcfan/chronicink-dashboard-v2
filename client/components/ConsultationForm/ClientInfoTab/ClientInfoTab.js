import React, { Component, PropTypes } from 'react';
import List from 'material-ui/List';
import ListItem from 'material-ui/List/ListItem';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Client from '../../../../imports/Client/client';

class ClientInfoTab extends Component {
    constructor(props) {
        super(props);

    }

    _renderFields(fields) {
        return fields.map((field) => {
            // <ListItem disabled={true} primaryText=field.value />
        });
    }

    render() {
        return (
            <div>
                {this.props.client._id}
                <List>
                    {/**this.props.clientID? this._renderFields(this.props.fields) : this._renderSetClientForm()**/}
                </List>
            </div>
        );

    }
}

ClientInfoTab.PropTypes = {
    client: PropTypes.object
};

export default ClientInfoTab;