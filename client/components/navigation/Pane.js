import React, { Component } from 'react';

class Pane extends Component {
    render() {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
}

Pane.propTypes = {
    label: React.PropTypes.string.isRequired,
    children: React.PropTypes.element.isRequired
};

export default Pane;