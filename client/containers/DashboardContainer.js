import { connect } from 'react-redux';
import Dashboard from '../components/Dashboard';
import { fetchIntakeListData } from '../actions/Dashboard/Widgets/IntakeList';

const mapStateToProps = (state) => ({
    widgets: state.dashboard.widgets
});

const mapDispatchToProps = (dispatch) => ({
    onLoadWidget: (id) => {
        dispatch(fetchIntakeListData(dispatch, id));
    },
});

const DashboardContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Dashboard);

export default DashboardContainer;