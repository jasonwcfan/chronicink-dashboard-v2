import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import ValidatedTextField from '../../Inputs/ValidatedTextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { ValidatedAutoComplete } from '../../Inputs';
import ArtistSelector from '../ArtistRecommendations';

const style = {
    textField: {
        display: 'block'
    },
    autoComplete: {
        display: 'block'
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
    }
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
                            errorText={this.props.formValues[field.id].errorText}
                            touched={this.props.formValues[field.id].touched}
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
                            errorText={this.props.formValues[field.id].errorText}
                            touched={this.props.formValues[field.id].touched}
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
                                    this.props.onFieldChange(field.id, value, null)
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
                            errorText={this.props.formValues[field.id].errorText}
                            touched={this.props.formValues[field.id].touched}
                        />
                    );
                case 'select':
                    const currentFieldValue = this.props.formValues[field.id];
                    return (
                        <SelectField
                            key={field.id}
                            floatingLabelText={field.label}
                            value={currentFieldValue.value}
                            errorText={currentFieldValue.touched ? currentFieldValue.errorText : null}
                            onChange={(event, key, value) => this.props.onFieldChange(field.id, value, null)}
                        >
                            {field.items.map((style) => {
                                return (
                                    <MenuItem
                                        key={style.value}
                                        value={style.value}
                                        primaryText={style.label}
                                    />
                                )
                            })}
                        </SelectField>
                    );
                case 'artistSelect':
                    return (
                        <ArtistSelector
                            onFieldChange={this.props.onFieldChange}
                            onClickRecommendButton={this.props.onClickRecommendButton}
                            key={field.id}
                            artists={this.props.artists}
                            fieldTemplate={field}
                            fieldValue={this.props.formValues[field.id]}
                            formValues={this.props.formValues}
                            touched={this.props.formValues[field.id].touched}
                            errorText={this.props.formValues[field.id].errorText}
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
        errorText: PropTypes.string,
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
