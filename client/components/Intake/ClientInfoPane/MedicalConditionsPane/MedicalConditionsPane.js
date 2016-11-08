import React, { Component } from 'react';
import Checkbox from 'material-ui/Checkbox';
import conditions from '../../../../constants/conditions';

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

class MedicalConditionsPane extends Component {
    constructor(props) {
        super(props);
    }

    _handleChange(event) {
        console.log(event.target.name);
        this.props.onToggleCondition(event.target.name);
    }
    
    _renderConditionsList(conditions) {
        return conditions.map((condition) => {
            return (
                <Checkbox style={style.item} name={condition.id} key={condition.id} label={condition.id} checked={condition.value} onCheck={this._handleChange.bind(this)} />
            )
        })
    }

    render() {
        return(
            <div style={style.container}>
                {this._renderConditionsList(this.props.conditions)}
            </div>
        )
    }
}

export default MedicalConditionsPane;