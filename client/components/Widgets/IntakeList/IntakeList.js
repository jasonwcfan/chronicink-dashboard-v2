import React, { Component, PropTypes } from 'react';
import Paper from 'material-ui/Paper';
import Colors from 'material-ui/styles/colors';
import Divider from 'material-ui/Divider';
import { List, ListItem } from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import EditIcon from 'material-ui/svg-icons/content/create';
import LinkWrapper from '../../UI/LinkWrapper';
import { startConsultation } from '../../../actions/Dashboard/Widgets/IntakeList';
import IntakeForm from '../../../../imports/IntakeForm/intakeForm';

const style = {
    intakeListContainer: {
        width: 300,
        height: 600,
        margin: 20,
        borderStyle: 'solid',
        borderColor: Colors.grey600,
    },
    header: {
        margin: 10
    },
    listItemContainer: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%'
    },
    listItemLabel: {
        display: 'inline'
    },
    listItemIconButton: {
        position: 'absolute',
        padding: 0,
        height: 24,
        width: 24,
        right: 10,
        bottom: 12
    }
};

class IntakeList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            observer: null,
            data: null
        }
    }

    componentWillMount(props) {
        Meteor.subscribe('intakeForm');
        const observer = IntakeForm.find().observe(({
            added: () => {
                this.setState({
                    data: IntakeForm.find().fetch()
                })
            }
        }));
        this.setState({
            observer: observer
        });
    }

    componentWillUnmount(props) {
        if (this.state.observer) {
            this.state.observer.stop();
        }
    }

    _handleListIconPressed(clientID) {
        this.props.primaryWidgetAction('intakeList', startConsultation, [clientID]);
    }

    _renderIntakeList() {
        if (this.state.data) {
            return this.state.data.map((form) => (
                <ListItem key={form._id}>
                    <div style={style.listItemContainer}>
                        <div style={style.listItemLabel}>{form.clientName}</div>
                        <LinkWrapper to='consultationform'>
                            <IconButton
                                style={style.listItemIconButton}
                                tooltip='Start Consultation'
                                tooltipPosition='top-right'
                                onTouchTap={this._handleListIconPressed.bind(this, form.clientID)}
                            >
                                <EditIcon />
                            </IconButton>
                        </LinkWrapper>
                    </div>
                </ListItem>
            ));
        }
        return null;
    }

    render() {
        return (
            <Paper style={style.intakeListContainer} zDepth={3}>
                <h3 style={style.header} >Intake List</h3>
                <Divider />
                <List>
                    {this._renderIntakeList(this.props.widget)}
                </List>
            </Paper>
        )
    }
}

export default IntakeList;