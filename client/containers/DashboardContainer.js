import { connect } from 'react-redux';
import Dashboard from '../components/Dashboard';
import { loadWidgetData } from '../actions/Dashboard/Widgets';

const mapStateToProps = (state) => ({
    widgets: state.dashboard.widgets
});

const mapDispatchToProps = (dispatch) => ({
    loadDataForWidget: (id) => {
        dispatch(loadWidgetData(dispatch, id));
    },
});

const DashboardContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Dashboard);

export default DashboardContainer;