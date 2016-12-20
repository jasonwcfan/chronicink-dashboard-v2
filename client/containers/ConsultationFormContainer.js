import { connect } from 'react-redux';
import ConsultationForm from '../components/ConsultationForm';
import { addSession, saveConsultationForm, setArtist } from '../actions/ConsultationForm';
import { setField } from '../actions';

const mapStateToProps = (state) => ({
    fields: state.consultationForm.fields,
    sessions: state.consultationForm.sessions,
    isSaved: state.consultationForm.isSaved,
    savingForm: state.consultationForm.savingForm,
    formID: state.consultationForm.formID,
    client: state.consultationForm.client,
    artist: state.consultationForm.artist
});

const mapDispatchToProps = (dispatch) => ({
    onSubmitSession: (session) => {
        dispatch(addSession(session));
    },
    onSaveConsultationForm: (form) => {
        dispatch(saveConsultationForm(dispatch, form))
    },
    onFieldChange: (id, value, valid) => {
        dispatch(setField(id, value, valid))
    },
    onArtistChange: (artistName, artistList) => {
        dispatch(setArtist(artistName, artistList))
    }
});

const ConsultationFormContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ConsultationForm);

export default ConsultationFormContainer;