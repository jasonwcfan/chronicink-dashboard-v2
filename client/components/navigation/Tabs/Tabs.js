import React, { Component } from 'react';
import Radium from 'radium';

@Radium
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
                <li key={index} style={styles.base.tabs_labels_li}>
                    <a
                        href="#"
                        className={activeClass}
                        onClick={this.handleClick.bind(this, index)}
                        style={styles.base.tabs_labels_li_a}
                    >
                        {child.props.label}
                    </a>
                </li>
            );
        }
        return (
            <ul className="tabs_labels" style={styles.base.tabs_labels}>
                {this.props.children.map(labels.bind(this))}
            </ul>
        );
    }

    render() {
        return (
            <div className="tabs" style={styles.base.tabs}>
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

const styles = {
    base: {
        tabs: {
            margin: '25px',
            background: '#fff',
            border: '1px solid #e5e5e5',
            borderRadius: '3px'
        },
        tabs_labels: {
            margin: '0',
            padding: '0'
        },
        tabs_labels_li: {
            display: 'inline-block'
        },
        tabs_labels_li_a: {
            padding: '8px 12px',
            display: 'block',
            color: '#444',
            textDecoration: 'none',
            borderBottom: '2px solid #f5f5f5',
            ':hover': {
                background: '#337ab7'
            }
        },
        tabs_labels_li_a_active: {},
        tabs_content: {}
    }
};

export default Tabs;