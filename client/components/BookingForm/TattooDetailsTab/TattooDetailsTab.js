import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import ValidatedTextField from '../../Inputs/ValidatedTextField';
import AutoComplete from 'material-ui/AutoComplete';
import { ArtistSelector, ValidatedAutoComplete } from '../../Inputs';

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
    dropdown: {
        marginLeft: 5
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
        this._renderForm = this._renderForm.bind(this);
    }
    
    _renderForm(fields) {
        return fields.map((field) => {
            switch (field.inputType) {
                case 'textField':
                    return (
                        <ValidatedTextField
                            style={style.textField}
                            defaultValue={this.props.formValues[field.id].value}
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
                            defaultValue={this.props.formValues[field.id].value}
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
                                style={style.group}
                                name={field.id}
                                valueSelected={this.props.formValues[field.id].value}
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
                    const fieldValue = this.props.formValues[field.id].value;
                    return (
                        <ValidatedAutoComplete
                            style={style.autoComplete}
                            key={field.id}
                            required={field.required}
                            fieldTemplate={field}
                            fieldValue={this.props.formValues[field.id]}
                            dataSource={field.items.map((item) => item.label)}
                            onFieldChange={this.props.onFieldChange}
                        />
                    );
                case 'artistSelect':
                    return (
                        <ArtistSelector
                            style={style.dropdown}
                            onFieldChange={this.props.onFieldChange}
                            key={field.id}
                            artists={this.props.artists}
                            fieldTemplate={field}
                            fieldValue={this.props.formValues[field.id]}
                        />
                    )
            }
        });
    }
    
    render() {
        return (
            <div style={this.props.style}>
                {this._renderForm(this.props.formTemplate)}
            </div>
        )
    }
}

TattooDetailsTab.propTypes = {
    formTemplate: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        label: PropTypes.string,
        inputType: PropTypes.string.isRequired,
        value: PropTypes.any,
        valid: PropTypes.bool.isRequired,
        required: PropTypes.bool.isRequired
    }).isRequired).isRequired,
    formValues: PropTypes.object,
    artists: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        calendarID: PropTypes.string
    })),
    subReady: PropTypes.bool,
    defaultArtist: PropTypes.shape({
        name: PropTypes.string,
        calendarID: PropTypes.string
    })
};

export default TattooDetailsTab;