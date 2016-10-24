import React, { Component } from 'react';

class Tabs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: this.props.selected
        };

    }

    handleClick(index, event) {
        event.preventDefault();
        this.setState({
            selected: index
        });
    }

    _renderContent() {
        return (
            <div className="tabs_content">
                {this.props.children[this.state.selected]}
            </div>
        );
    }

    _renderTitles() {
        function labels(child, index) {
            let activeClass = (this.state.selected === index ? 'active' : '');
            return (
                <li key={index}>
                    <a
                        href="#"
                        className={activeClass}
                        onClick={this.handleClick.bind(this, index)}
                    >
                        {child.props.label}
                    </a>
                </li>
            );
        }
        return (
            <ul className="tabs_labels">
                {this.props.children.map(labels.bind(this))}
            </ul>
        );
    }

    render() {
        return (
            <div className="tabs">
                {this._renderTitles()}
                {this._renderContent()}
            </div>
        );
    }
}

Tabs.defaultProps = {
    selected: 0
};

Tabs.propTypes = {
    selected: React.PropTypes.number,
    children: React.PropTypes.oneOfType([
        React.PropTypes.array,
        React.PropTypes.element
    ])
};

export default Tabs;