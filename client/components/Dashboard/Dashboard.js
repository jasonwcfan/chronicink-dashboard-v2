import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import Studio from '../../../imports/Studio/studio';
import App from '../app';
import Widget from '../Widgets/Widget';

const style = {
    container: {
        display: 'flex',
        flexDirection: 'row'
    },
    widget: {
        display: 'inline'
    }
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
                    key={widget}
                />
            );
        });
    }

    render() {
        return this.props.subReady ? (
            <App appName='Dashboard'>
                <div style={style.container} >
                    {this._renderWidgets(this.props.studio.widgets)}
                </div>
            </App>
        ): null ;
    }
}


Dashboard.propTypes = {
    studio: PropTypes.object
};

export default Dashboard = createContainer(({ params }) => {
    const subscription = Meteor.subscribe('studio');

    return {
        subReady: subscription.ready(),
        studio: Studio.findOne({})
    }
}, Dashboard);
