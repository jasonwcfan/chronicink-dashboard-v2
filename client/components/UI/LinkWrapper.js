import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

const style = {
    textDecoration: 'inherit',
    color: 'inherit',
};

class LinkWrapper extends Component {
    render() {
        return ( this.props.url ?
                <div>
                    <a target='_blank' href={this.props.url} style={style}>{this.props.children}</a>
                </div> :
                <div>
                    <Link to={this.props.to} style={style} >{this.props.children}</Link>
                </div>
        );
    }
}

LinkWrapper.propTypes = {
    to: PropTypes.object,
    url: PropTypes.string
};

export default LinkWrapper;