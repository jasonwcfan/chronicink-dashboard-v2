import { connect } from 'react-redux';
import App from '../components/app';
import { changeApp } from '../actions';

const mapStateToProps = (state) => ({
    activeApp: state.activeApp
});

const mapDispatchToProps = (dispatch) => ({
    onChangeApp: (id) => {
        dispatch(changeApp(id))
    }
});

const AppContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(App);

export default AppContainer;