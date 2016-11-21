import { connect } from 'react-redux';
import ConsultationForm from '../components/ConsultationForm';
import { addSession, submitConsultationForm } from '../actions/ConsultationForm';
import { setField } from '../actions';

const mapStateToProps = (state) => ({
    fields: state.consultationForm.fields,
    sessions: state.consultationForm.sessions,
    isSaved: state.consultationForm.isSaved,
    savingForm: state.consultationForm.savingForm,
    formID: state.consultationForm.formID,
    clientID: state.consultationForm.clientID
});

const mapDispatchToProps = (dispatch) => ({
    onSubmitSession: (session) => {
        dispatch(addSession(session));
    },
    onSubmitConsultationForm: (form) => {
        dispatch(submitConsultationForm(dispatch, form))
    },
    onFieldChange: (id, value, valid) => {
        dispatch(setField(id, value, valid))
    }
});

const ConsultationFormContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ConsultationForm);

export default ConsultationFormContainer;