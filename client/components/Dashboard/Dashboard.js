import React, { Component, PropTypes } from 'react';
import Widget from '../Widgets/Widget';

const style = {
    
};

class Dashboard extends Component {
    constructor(props) {
        super(props);
    }

    _renderWidgets(widgets) {
        return widgets.map((widget) => {
            return (
                <Widget
                    widget={widget}
                    key={widget.id}
                    startWidgetObserver={this.props.startWidgetObserver}
                    primaryWidgetAction={this.props.primaryWidgetAction}
                />
            );
        });
    }

    render() {
        return (
            <div>
                {this._renderWidgets(this.props.widgets)}
            </div>
        );
    }
}


Dashboard.propTypes = {
    widgets: PropTypes.arrayOf(PropTypes.object)
};

export default Dashboard;