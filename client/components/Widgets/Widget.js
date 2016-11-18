import React, { Component, PropTypes } from 'react';
import IntakeList from './IntakeList';

class Widget extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.startWidgetObserver(this.props.name);
    }

    componentWillUnmount() {
        this.props.widget.observer.stop();
    }

    render() {
        switch(this.props.name) {
            case 'intakeList':
                return <IntakeList {...this.props} />
        }
    }
}

Widget.propTypes = {
    widget: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired
};

export default Widget;