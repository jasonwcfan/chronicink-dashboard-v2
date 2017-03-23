import React, { Component, PropTypes } from 'react';
import { withRouter } from 'react-router';
import Moment from 'moment-timezone';
import Paper from 'material-ui/Paper';
import Colors from 'material-ui/styles/colors';
import Divider from 'material-ui/Divider';
import { List, ListItem } from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import EditIcon from 'material-ui/svg-icons/content/create';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import DeleteIcon from 'material-ui/svg-icons/action/delete-forever';
import CheckIcon from 'material-ui/svg-icons/action/done';
import LinkWrapper from '../../UI/LinkWrapper';
import { startBooking } from '../../../actions/Dashboard/Widgets/IntakeList';
import { createContainer } from 'meteor/react-meteor-data';
import Intake from '../../../../imports/Intake/intake';

const style = {
    intakeListContainer: {
        width: 300,
        display: 'flex',
        flexDirection: 'column',
        margin: 20,
        borderStyle: 'solid',
        borderColor: Colors.grey600
    },
    headerContainer: {
        display: 'flex',
        minHeight: 50,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    header: {
        marginLeft: 10
    },
    menuIcon: {
        display: 'inline'
    },
    intakeList: {
        maxHeight: '70vh',
        minHeight: 600,
        overflow: 'auto',
        overflowX: 'hidden'
    },

};

class IntakeList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            inDeleteMode: false
        }
    }

    _handleListIconPressed(clientID) {
        this.props.router.push({
            pathname: '/booking',
            query: {clientID: clientID}
        })
    }

    _handleDeleteFromIntakeList(intakeID) {
        Meteor.call('intake.markBookingCompleted', null, intakeID);
    }

    _renderIntakeList() {
        if (this.props.subReady) {
            return this.props.data.map((form) => {
                let submitDate = form.date ? Moment(form.date).tz('America/Toronto').fromNow(): 'Submission date not available';
                let submitLocation = form.filledInternally ? 'In-store' : 'Online' ;
                let missedCall = form.missedCall ? ' - MISSED CALL' : '';

                if (form.bookingPending) {
                    return (
                        <ListItem
                            key={form._id}
                            primaryText={form.clientName + missedCall}
                            secondaryText={`${submitDate} ${submitLocation}`}
                            rightIconButton={this.state.inDeleteMode ?
                                <IconButton
                                    tooltipPosition='top-right'
                                    onTouchTap={this._handleDeleteFromIntakeList.bind(this, form._id)}
                                >
                                    <DeleteIcon />
                                </IconButton>
                                :
                                <IconButton
                                    tooltip='Create Booking'
                                    tooltipPosition='top-left'
                                    onTouchTap={this._handleListIconPressed.bind(this, form.clientID)}
                                >
                                    <EditIcon />
                                </IconButton>
                                }
                        >
                        </ListItem>
                    );
                }
                return null;
            });
        }
        return null;
    }

    render() {
        return (
            <Paper style={style.intakeListContainer} zDepth={3}>
                <div style={style.headerContainer}>
                    <h3 style={style.header} >Intake List</h3>
                    {this.state.inDeleteMode ?
                        <IconButton
                            onTouchTap={() => {this.setState({inDeleteMode: false})}}
                        >
                            <CheckIcon />
                        </IconButton>
                        :
                        <IconMenu
                            style={style.menuIcon}
                            iconButtonElement={<IconButton><MenuIcon /></IconButton>}
                            anchorOrigin={{horizontal: 'left', vertical: 'top'}}
                            targetOrigin={{horizontal: 'left', vertical: 'top'}}
                        >
                            <MenuItem
                                primaryText='Delete Items'
                                onTouchTap={() => {this.setState({inDeleteMode: true})}}
                            />
                        </IconMenu>
                    }
                </div>
                <Divider />
                <List style={style.intakeList}>
                    {this._renderIntakeList()}
                </List>
            </Paper>
        )
    }
}

export default IntakeList = createContainer(({ params }) => {
    const subscription = Meteor.subscribe('intake');

    return {
        subReady: subscription.ready(),
        data: Intake.find({}, {sort: {date: -1}}).fetch()
    }
}, withRouter(IntakeList));