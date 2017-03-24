import React, { Component, PropTypes } from 'react';
import Checkbox from 'material-ui/Checkbox';
import TextField from 'material-ui/TextField';
import colors from '../../../../theme/colors';

const style = {
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap',
        width: '100%'

    },
    checkbox: {
        width: 174,
        paddingBottom: 10,
    },
    checkboxIcon: {
        // fill: colors.CitGold
    },
    otherConditionContainer: {
        display: 'flex'
    },
    otherConditionCheckBox: {
        paddingBottom: 0,
        width: 'auto'
    },
    otherConditionTextField: {
        width: 'auto',
        marginLeft: '10px',
        height: '34px'
    },
    otherConditionInput: {
        height: 'initial'
    }
};

class MedicalConditionsChecklist extends Component {
    constructor(props) {
        super(props);

        this.state = {
            checked: false
        };

        this._handleChangeOtherCondition = this._handleChangeOtherCondition.bind(this);
        this._handleToggleChecked = this._handleToggleChecked.bind(this);
    }

    _handleChange(idx, event) {
        this.props.onToggleMedicalCondition(idx, event.target.name);
    }

    _handleChangeOtherCondition(event, condition) {
        if (!this.state.checked && condition.length > 0) {
            this.setState({
                checked: true
            });
        } else if (condition.length == 0) {
            this.setState({
                checked: false
            });
        }
        this.props.onChangeOtherCondition(condition);
    }

    _handleToggleChecked() {
        if (this.state.checked) {
            this.setState({
                checked: false
            });
            this.props.onChangeOtherCondition('');
        } else {
            this.setState({
                checked: true
            });
        }
    }
    
    _renderConditionsList(medicalConditions) {
        return medicalConditions.map((condition, idx) => {
            return (
                <Checkbox
                    style={style.checkbox}
                    iconStyle={style.checkboxIcon}
                    name={condition.id}
                    key={condition.id}
                    label={condition.id}
                    checked={condition.value}
                    onCheck={this._handleChange.bind(this, idx)} />
            )
        })
    }

    render() {
        return(
            <div style={style.container} className='medicalConditionsContainer'>
                {this._renderConditionsList(this.props.medicalConditions)}
                <div style={style.otherConditionContainer}>
                    <Checkbox
                        style={style.otherConditionCheckBox}
                        iconStyle={style.checkboxIcon}
                        checked={this.state.checked}
                        onCheck={this._handleToggleChecked}
                        name='other'
                        label='Other:'
                    />
                    <TextField
                        style={style.otherConditionTextField}
                        inputStyle={style.otherConditionInput}
                        name='otherCondition'
                        value={this.props.otherCondition || ''}
                        onChange={this._handleChangeOtherCondition}
                    />
                </div>
            </div>
        )
    }
}

MedicalConditionsChecklist.propTypes = {
    otherCondition: PropTypes.string,
    medicalConditions: PropTypes.array
};

export default MedicalConditionsChecklist;