import React, { Component, PropTypes } from 'react';
import IntakeList from './IntakeList';
import ArtistStats from './ArtistStats';

class Widget extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        switch(this.props.widget) {
            case 'intakeList':
                return <IntakeList {...this.props} />;
            case 'artistStats':
                return <ArtistStats {...this.props} />;
        }
    }
}

Widget.propTypes = {
    widget: PropTypes.string.isRequired,
};

export default Widget;