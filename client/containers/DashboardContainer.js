import { connect } from 'react-redux';
import Dashboard from '../components/Dashboard';

const mapStateToProps = (state) => ({
    widgets: state.dashboard.widgets
});

const mapDispatchToProps = (dispatch) => ({
    fetchWidgetData: (id) => {
        // dispatch(addSession(session));
    },
});

const DashboardContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Dashboard);

export default DashboardContainer;