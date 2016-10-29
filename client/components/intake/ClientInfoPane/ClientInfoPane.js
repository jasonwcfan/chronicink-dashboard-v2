import React, { Component } from 'react';
import TextField from 'material-ui/TextField';

const style = {
    padding: 5,
};

class ClientInfoPane extends Component {
    render() {
        return (
            <div style={style}>
                <TextField hintText="First Name" />
            </div>
        );
    }
}

ClientInfoPane.propTypes = {

};

export default ClientInfoPane;