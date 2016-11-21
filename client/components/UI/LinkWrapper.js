import React, { Component } from 'react';
import { Link } from 'react-router';

const style = {
    textDecoration: 'inherit',
    color: 'inherit',
};

class LinkWrapper extends Component {
    render() {
        return (
            <div>
                <Link to={this.props.to} style={style} >{this.props.children}</Link>
            </div>
        );
    }
}

export default LinkWrapper;