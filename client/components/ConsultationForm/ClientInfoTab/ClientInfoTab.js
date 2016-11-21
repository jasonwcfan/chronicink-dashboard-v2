import React, { Component, PropTypes } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class ClientInfoTab extends Component {
    constructor(props) {
        super(props);
        console.log(props);
    }

    _fetchClient(clientID) {

    }

    // _renderFields(fields) {
    //     return fields.map((field) => {
    //         switch (field.inputType) {
    //             case 'textField':
    //                 return (
    //                     <ValidatedTextField
    //                         style={style.textField}
    //                         defaultValue={field.value}
    //                         name={field.id}
    //                         key={field.id}
    //                         floatingLabelText={field.label}
    //                         onFieldChange={this.props.onFieldChange}
    //                         required={field.required}
    //                     />
    //                 );
    //             case 'country':
    //                 return (
    //                     <CountrySelector
    //                         style={style.selector}
    //                         defaultValue={field.value}
    //                         name={field.id}
    //                         key={field.id}
    //                         onFieldChange={this.props.onFieldChange}
    //                         required={field.required}
    //                     />
    //                 );
    //             case 'region':
    //                 return (
    //                     <RegionSelector
    //                         style={style.selector}
    //                         value={field.value}
    //                         name={field.id}
    //                         key={field.id}
    //                         onFieldChange={this.props.onFieldChange}
    //                         required={field.required}
    //                     />
    //                 );
    //             case 'date':
    //                 return (
    //                     <ValidatedDatePicker
    //                         style={style.datePicker}
    //                         defaultDate={field.value}
    //                         name={field.id}
    //                         key={field.id}
    //                         floatingLabelText={field.label}
    //                         onFieldChange={this.props.onFieldChange}
    //                     />
    //
    //                 );
    //         }
    //     });
    // }

    _renderSetClientForm() {
        return (
            <div>
                Oops, no client set!
            </div>
        )
    }

    render() {
        return (
            <div>
                {/**this.props.clientID? this._renderFields(this.props.fields) : this._renderSetClientForm()**/}
            </div>
        );

    }
}

ClientInfoTab.PropTypes = {
    clientID: PropTypes.String
};

export default ClientInfoTab;