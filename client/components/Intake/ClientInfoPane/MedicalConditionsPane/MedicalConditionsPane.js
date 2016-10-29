import React, { Component } from 'react';
import Checkbox from 'material-ui/Checkbox';
import conditions from './conditions';

const style = {
    container: {
        display: 'flex'
    },
    item: {
        width: 200
    }
};

const conditionsList = [];
for (let i = 0; i < conditions.length; i++) {
    conditionsList.push(<Checkbox label={conditions[i]} key={i} />);
}

class MedicalConditionsPane extends Component {
    render() {
        return(
            <div style={style.container}>
                <div style={style.item}>
                    {conditionsList}
                </div>
            </div>
        )
    }
}

export default MedicalConditionsPane;