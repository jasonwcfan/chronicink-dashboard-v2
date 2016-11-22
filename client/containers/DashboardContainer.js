import { connect } from 'react-redux';
import Dashboard from '../components/Dashboard';
import { startWidgetObserver } from '../actions/Dashboard/Widgets';

const mapStateToProps = (state) => ({
    widgets: state.dashboard.widgets
});

const mapDispatchToProps = (dispatch) => ({
    startWidgetObserver: (id) => {
        dispatch(startWidgetObserver(dispatch, id));
    },
    primaryWidgetAction: (widgetID, action, args) => {
        dispatch(action(dispatch, ...args));
    }
});

const DashboardContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Dashboard);

export default DashboardContainer;