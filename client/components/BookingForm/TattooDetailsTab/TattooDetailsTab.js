import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { RaisedButton, CircularProgress } from 'material-ui';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import Toggle from 'material-ui/Toggle';
import ValidatedTextField from '../../Inputs/ValidatedTextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
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
        justifyContent: 'flex-start',
        maxWidth: 650
    },
    radioButton: {
        display: 'inline-block',
        padding: 10,
    },
    radioItem: {
        display: 'inline-block',
        padding: 10,
        paddingLeft: 0,
        paddingRight: 5,
        marginRight: 20,
        width: 'auto'
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
            useActualSize: false
        }
    }
    
    _renderForm(fields) {
        return fields.map((field) => {
            switch (field.inputType) {
                case 'size':
                    const textFieldStyleCopy = Object.assign({}, style.textField);
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
                                        style={Object.assign(textFieldStyleCopy, { width: 123, marginRight: 20 })}
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
                                        style={Object.assign(textFieldStyleCopy, { width: 123 })}
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
                            <h4>{field.label}</h4>
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
                                            iconStyle={{marginRight: 10}}
                                            labelStyle={{width: 'auto'}}
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

                <ValidatedTextField
                    name='bookedBy'
                    defaultValue={this.props.bookedBy}
                    floatingLabelText='Booked by...'
                    onFieldChange={this.props.setBookedBy}
                    required={true}
                />
                <SelectField
                    style={style.bookedThruSelectField}
                    value={this.props.bookedThru}
                    onChange={this.props.setBookedThru}
                >
                    <MenuItem value='by phone' primaryText='By phone' />
                    <MenuItem value='in person' primaryText='In person' />
                </SelectField>


                <div>
                    {this.props.saveButton}
                    {this.props.isSubmitting
                        ?
                        <CircularProgress style={{ marginLeft: 28 }} size={16} />
                        :
                        <RaisedButton
                            secondary={true}
                            disabled={this.props.isSubmitted}
                            label={this.props.isSubmitted ? 'Done' : 'Submit'}
                            onTouchTap={this.props.handlePreSubmit}
                        />

                    }
                </div>
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
