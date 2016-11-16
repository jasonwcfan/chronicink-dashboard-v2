import React, { Component, PropTypes } from 'react';
import Paper from 'material-ui/Paper';

const style = {
    intakeWidget: {
        width: 300,
        height: 600,
        margin: 20
    }
};

class Dashboard extends Component {
    constructor(props) {
        super(props);
        console.log(props);
    }

    _renderWidgets() {
            return (<Paper style={style.intakeWidget} zDepth={3}>

            </Paper>)
    }

    render() {
        return (
            <div>
                {this._renderWidgets(this.props.widgets)}
            </div>
        );
    }
}


export default Dashboard;