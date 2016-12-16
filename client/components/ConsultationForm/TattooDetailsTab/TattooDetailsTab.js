import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import ValidatedTextField from '../../Inputs/ValidatedTextField';
import AutoComplete from 'material-ui/AutoComplete';
import Artist from '../../../../imports/Artist/artist';

const style = {
    textField: {
        display: 'block',
        marginLeft: 5,
        marginRight: 5
    },
    autoComplete: {
        display: 'block',
        marginLeft: 5,
        marginRight: 5
    },
    radioGroup: {
        display: 'flex',
        justifyContent: 'flex-start',
        maxWidth: 650
    },
    radioButton: {
        display: 'inline-block',
        padding: 10,
    },
    radioItem: {
        display: 'inline-block',
        padding: 10
    },
};

class TattooDetailsTab extends Component {
    constructor(props) {
        super(props);
        this._renderFields = this._renderFields.bind(this);
    }
    
    _renderFields(fields) {
        return fields.map((field) => {
            switch (field.inputType) {
                case 'textField':
                    return (
                        <ValidatedTextField
                            style={style.textField}
                            defaultValue={field.value}
                            name={field.id}
                            key={field.id}
                            floatingLabelText={field.label}
                            onFieldChange={this.props.onFieldChange}
                            required={field.required}
                        />
                    );
                case 'textBox':
                    return (
                        <ValidatedTextField
                            style={style.textField}
                            defaultValue={field.value}
                            name={field.id}
                            key={field.id}
                            floatingLabelText={field.label}
                            onFieldChange={this.props.onFieldChange}
                            multiLine={true}
                            fullWidth={true}
                            required={field.required}
                        />
                    );
                case 'radio':
                    return (
                        <div key={field.id}>
                            <h3>{field.label}</h3>
                            <RadioButtonGroup
                                tyle={style.group}
                                name={field.id}
                                defaultSelected={field.value}
                                onChange={(event, value) => {
                                    this.props.onFieldChange(field.id, value, true)
                                }}
                            >
                                    {field.items.map((item) =>
                                        <RadioButton
                                            value={item.value}
                                            label={item.label}
                                            key={item.value}
                                            style={style.radioItem}
                                        />
                                    )}
                            </RadioButtonGroup>
                        </div>
                    );
                case 'autocomplete':
                    if (field.id == 'artist' && this.props.subReady) {
                        return (
                            <AutoComplete
                                floatingLabelText={field.label}
                                style={style.autoComplete}
                                value={field.value}
                                searchText={field.value || ''}
                                key={field.id}
                                dataSource={this.props.data.map((artist) => artist.name)}
                                filter={(searchText, key) => {
                                    // Fuzzier search than the default
                                    const lowerCaseSearchText = searchText.toLowerCase();
                                    const lowerCaseKey = key.toLowerCase();
                                    return lowerCaseKey.indexOf(lowerCaseSearchText) > -1;
                            }}
                                maxSearchResults={10}
                                onNewRequest={(value) => {
                                    this.props.onFieldChange(field.id, value, value != '')
                            }}
                            />
                        )
                    }
                    return (
                        <AutoComplete
                            floatingLabelText={field.label}
                            style={style.autoComplete}
                            value={field.value}
                            searchText={field.value || ''}
                            key={field.id}
                            dataSource={field.items.map((item) => item.label)}
                            filter={(searchText, key) => {
                                // Fuzzier search than the default
                                const lowerCaseSearchText = searchText.toLowerCase();
                                const lowerCaseKey = key.toLowerCase();
                                return lowerCaseKey.indexOf(lowerCaseSearchText) > -1;
                            }}
                            maxSearchResults={10}
                            onNewRequest={(value) => {
                                this.props.onFieldChange(field.id, value, value != '')
                            }}
                        />
                    );
            }
        });
    }
    
    render() {
        return (
            <div style={this.props.style}>
                {this._renderFields(this.props.fields)}
            </div>
        )
    }
}

export default TattooDetailsTab = createContainer(({ params }) => {
    const subscription = Meteor.subscribe('artist');

    return {
        subReady: subscription.ready(),
        data: Artist.find().fetch()
    }
}, TattooDetailsTab);