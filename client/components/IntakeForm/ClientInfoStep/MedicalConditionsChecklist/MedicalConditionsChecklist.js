import React, { Component } from 'react';
import Checkbox from 'material-ui/Checkbox';

const style = {
    container: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '100%'

    },
    item: {
        width: 200,
        padding: 10
    }
};

class MedicalConditionsChecklist extends Component {
    constructor(props) {
        super(props);
    }

    _handleChange(event) {
        this.props.onToggleMedicalCondition(event.target.name);
    }
    
    _renderConditionsList(medicalConditions) {
        return medicalConditions.map((condition) => {
            return (
                <Checkbox style={style.item} name={condition.id} key={condition.id} label={condition.id} checked={condition.value} onCheck={this._handleChange.bind(this)} />
            )
        })
    }

    render() {
        return(
            <div style={style.container}>
                {this._renderConditionsList(this.props.medicalConditions)}
            </div>
        )
    }
}

export default MedicalConditionsChecklist;