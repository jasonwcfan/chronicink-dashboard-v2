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