import React, { Component } from 'react';
import Checkbox from 'material-ui/Checkbox';
import colors from '../../../../constants/colors';

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
        paddingBottom: 10
    },
    checkboxIcon: {
        fill: colors.CitGold
    }
};

class MedicalConditionsChecklist extends Component {
    constructor(props) {
        super(props);
    }

    _handleChange(idx, event) {
        this.props.onToggleMedicalCondition(idx, event.target.name);
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
            </div>
        )
    }
}

export default MedicalConditionsChecklist;