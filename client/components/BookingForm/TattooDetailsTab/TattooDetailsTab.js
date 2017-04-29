import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import Toggle from 'material-ui/Toggle';
import ValidatedTextField from '../../Inputs/ValidatedTextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import { ValidatedAutoComplete } from '../../Inputs';
import ArtistSelector from '../ArtistRecommendations';

const style = {
    flexedDivContainer: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'baseline'
    },
    switch: {
        width: '250px',
        marginLeft: 5,
        marginRight: 5,
        marginTop: 15
    },
    textField: {
        display: 'block'
    },
    autoComplete: {
        display: 'block'
    },
    radioGroup: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start'
    },
    radioButton: {
        display: 'inline-block',
        padding: 10,
    },
    radioItem: {
        width: 'initial',
        padding: 10,
    },
    depositContainer: {

    },
    otherDeposit: {
        position: 'relative',
        width: 240,
        bottom: 45,
        left: 100
    }
};

class TattooDetailsTab extends Component {
    constructor(props) {
        super(props);
        this._renderForm = this._renderForm.bind(this);
        this.processSizeWidthAndHeight = this._processSizeWidthAndHeight.bind(this);
        this.parseWidthAndHeight = this._parseWidthAndHeight.bind(this);
        this.sizeWidthAndHeight = {
            width: {
                errorText: '',
                touched: false,
                value: '',
                label: 'Width (Inches)',
            },
            height: {
                errorText: '',
                touched: false,
                value: '',
                label: 'Height (Inches)',
            },
        };
        this.state = {
            useActualSize: false,
            otherDeposit: '',
            otherDepositError: 'Please enter a deposit'
        }
    }
    
    _renderForm(fields) {
        return fields.map((field) => {
            switch (field.inputType) {
                case 'size':
                    const textFieldStyle = Object.assign({ width: '256px' }, style.textField);
                    const widthIsEmpty = this.sizeWidthAndHeight.width.value ==  null || !this.sizeWidthAndHeight.width.value.length;
                    const heightIsEmpty = this.sizeWidthAndHeight.height.value ==  null || !this.sizeWidthAndHeight.height.value.length;
                    const sizeIsNotEmpty = this.props.formValues[field.id].value != null && !!this.props.formValues[field.id].value.length;

                    if(sizeIsNotEmpty && widthIsEmpty && heightIsEmpty) {
                        const dimensions = this.parseWidthAndHeight(this.props.formValues[field.id].value);
                        if(dimensions.length) {
                            this.sizeWidthAndHeight.width.value = dimensions[0];
                            this.sizeWidthAndHeight.height.value = dimensions[1];
                        }
                    }

                    return (
                        <div style={style.flexedDivContainer} key={'some-key'}>
                            {this.state.useActualSize ?
                                <div style={style.flexedDivContainer} key={'some-key-2'}>
                                    <ValidatedTextField
                                        style={Object.assign({ width: '123px' }, textFieldStyle)}
                                        defaultValue={this.sizeWidthAndHeight.width.value}
                                        name={'size_width'}
                                        key={'size_width'}
                                        floatingLabelText={this.sizeWidthAndHeight.width.label}
                                        onFieldChange={this.processSizeWidthAndHeight}
                                        required={field.required}
                                        mask={[/\d/, /\d/]}
                                        errorText={this.sizeWidthAndHeight.width.errorText}
                                        touched={this.sizeWidthAndHeight.width.touched}
                                    />
                                    <ValidatedTextField
                                        style={Object.assign({ width: '123px' }, textFieldStyle)}
                                        defaultValue={this.sizeWidthAndHeight.height.value}
                                        name={'size_height'}
                                        key={'size_height'}
                                        floatingLabelText={this.sizeWidthAndHeight.height.label}
                                        onFieldChange={this.processSizeWidthAndHeight}
                                        required={true}
                                        mask={[/\d/, /\d/]}
                                        errorText={this.sizeWidthAndHeight.height.errorText}
                                        touched={this.sizeWidthAndHeight.height.touched}
                                    />
                                </div>
                            :
                                <ValidatedTextField
                                    style={textFieldStyle}
                                    defaultValue={this.props.formValues[field.id].value}
                                    name={field.id}
                                    key={field.id}
                                    floatingLabelText={field.label}
                                    onFieldChange={this.props.onFieldChange}
                                    required={field.required}
                                    errorText={this.props.formValues[field.id].errorText}
                                    touched={this.props.formValues[field.id].touched}
                                />

                            }
                            <Toggle
                                name={'use_actual_size'}
                                key={'use_actual_size'}
                                label="Use Exact Measurements"
                                defaultToggled={this.state.useActualSize}
                                style={style.switch}
                                labelStyle={{width: 'auto'}}
                                labelPosition={'right'}
                                onToggle={(event, checked) => {
                                    this.setState({'useActualSize': checked});
                                }}
                            />
                        </div>
                    );
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
                                style={style.radioGroup}
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
                            onFieldChange={this.props.onFieldChange}
                        />
                    );
                case 'deposit':
                    const value = this.props.formValues[field.id].value;
                    return (
                        <div key={field.id}>
                            <h3>{field.label}</h3>
                            <RadioButtonGroup
                                style={style.radioGroup}
                                name={field.id}
                                valueSelected={value}
                                onChange={(event, v) => {
                                    if (v != 80 && v != 150 && v != 350) {
                                        this.props.onFieldChange(field.id, v, this.state.otherDepositError)
                                    } else {
                                        this.props.onFieldChange(field.id, v, null)
                                    }
                                }}
                            >
                                <RadioButton
                                    value={80}
                                    label='$80'
                                    style={style.radioItem}
                                />
                                <RadioButton
                                    value={150}
                                    label='$150'
                                    style={style.radioItem}
                                />
                                <RadioButton
                                    value={350}
                                    label='$350'
                                    style={style.radioItem}
                                />
                                <RadioButton
                                    value={this.state.otherDeposit}
                                    label='Other:'
                                    style={style.radioItem}
                                />
                            </RadioButtonGroup>
                            <TextField
                                style={style.otherDeposit}
                                name='otherDeposit'
                                onChange={(_, v) => {
                                    // If a deposit value is entered, call onFieldChange with no errors
                                    const error = v.length ? null : 'Please enter a deposit';
                                    this.setState({
                                            otherDeposit: v,
                                            otherDepositError: error
                                        });
                                    this.props.onFieldChange('deposit', v, error);
                                }}
                            />
                        </div>
                    )
            }
        });
    }

    _processSizeWidthAndHeight(id, value, errorText) {
        if(id == 'size_width') {
            this.sizeWidthAndHeight.width.value = value;
            this.sizeWidthAndHeight.width.errorText = errorText;
            this.sizeWidthAndHeight.width.touched = true;
        } else if(id == 'size_height') {
            this.sizeWidthAndHeight.height.value = value;
            this.sizeWidthAndHeight.height.errorText = errorText;
            this.sizeWidthAndHeight.height.touched = true;
        }


        const size = `${this.sizeWidthAndHeight.width.value} x ${this.sizeWidthAndHeight.height.value} (Inches)`;
        const widthHasError = this.sizeWidthAndHeight.width.errorText != null && this.sizeWidthAndHeight.width.errorText.length;
        const heightHasError = this.sizeWidthAndHeight.height.errorText != null && this.sizeWidthAndHeight.height.errorText.length;
        let error = '';

        if(widthHasError || heightHasError) {
            error = 'Size is required';
        }

        this.props.onFieldChange('size', size, error);

    }
    
    _parseWidthAndHeight(input) {
        const dimensions = input.replace(' (Inches)', '').split(' x ');

        if(dimensions.length == 2 && !isNaN(dimensions[0]) && !isNaN(dimensions[1])) {
            return dimensions;
        }

        return [];
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
