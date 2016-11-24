import React, { Component, PropTypes } from 'react';
import IntakeList from './IntakeList';

class Widget extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        switch(this.props.widget.id) {
            case 'intakeList':
                return <IntakeList {...this.props} />
        }
    }
}

Widget.propTypes = {
    widget: PropTypes.object.isRequired,
};

export default Widget;