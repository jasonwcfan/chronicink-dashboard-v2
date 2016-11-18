import React, { Component, PropTypes } from 'react';
import Paper from 'material-ui/Paper';
import Colors from 'material-ui/styles/colors';
import Divider from 'material-ui/Divider';
import { List, ListItem } from 'material-ui/List';

const style = {
    intakeListContainer: {
        width: 300,
        height: 600,
        margin: 20,
        borderStyle: 'solid',
        borderColor: Colors.grey600,
    },
    header: {
        margin: 10
    }

};

class IntakeList extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.startWidgetObserver('intakeList');
    }

    componentWillUnmount() {
        this.props.widget.observer.stop();
    }

    _renderIntakeList(widget) {
        return widget.data.map((form) => (
            <ListItem key={form._id}>{form.clientID}</ListItem>
        ));
    }

    render() {
        return (
            <Paper style={style.intakeListContainer} zDepth={3}>
                <h3 style={style.header} >Intake List</h3>
                <Divider />
                <List>
                    {this._renderIntakeList(this.props.widget)}
                </List>
            </Paper>
        )
    }
}

IntakeList.propTypes = {
    widget: PropTypes.object.isRequired
};

export default IntakeList;