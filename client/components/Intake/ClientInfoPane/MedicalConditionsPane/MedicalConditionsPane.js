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
    constructor() {
        super();
    }

    _handleChange(event, isChecked) {
        console.log(isChecked);
    }

    render() {
        const conditionsList = [];
        for (let i = 0; i < conditions.length; i++) {
            conditionsList.push(<Checkbox style={style.item} key={i} label={conditions[i]} onCheck={this._handleChange.bind(this)}/>);
        }
        return(
            <div style={style.container}>
                {conditionsList}
            </div>
        )
    }
}

export default MedicalConditionsPane;