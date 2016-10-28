import React, { Component } from 'react';
import TextField from 'material-ui/TextField';

class ClientInfoPane extends Component {
    render() {
        return (
            <div>
                <TextField hintText="First Name"></TextField>
            </div>
        );
    }
}

ClientInfoPane.propTypes = {

};

export default ClientInfoPane;