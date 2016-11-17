import React, { Component, PropTypes } from 'react';
import IntakeList from '../Widgets/IntakeList';

const style = {
    
};

class Dashboard extends Component {
    constructor(props) {
        super(props);
    }

    _renderWidgets(widgets) {
        return widgets.map((widget) => {
            switch (widget.id) {
                case 'intakeList':
                    return (
                        <IntakeList widget={widget} key={widget.id} loadDataForWidget={this.props.loadDataForWidget} />
                    );
            }
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

};

export default Dashboard;