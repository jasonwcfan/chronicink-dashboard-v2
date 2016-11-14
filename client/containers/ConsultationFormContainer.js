import { connect } from 'react-redux';
import ConsultationForm from '../components/ConsultationForm';
import { addSession } from '../actions/ConsultationForm';

const mapStateToProps = (state) => ({
    fields: state.consultationForm.fields,
    sessions: state.consultationForm.sessions,
    isSaved: state.consultationForm.isSaved,
    savingForm: state.consultationForm.savingForm,
    formID: state.consultationForm.formID
});

const mapDispatchToProps = (dispatch) => ({
    onSubmitSession: (session) => {
        dispatch(addSession(session));
    },
    onSubmitConsultationForm: (dispatch, form) => {
        // dispatch(submitIntakeForm(dispatch, form))
    },
    onFieldChange: (id, value, valid) => {
        // dispatch(setField(id, value, valid))
    }
});

const ConsultationFormContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ConsultationForm);

export default ConsultationFormContainer;