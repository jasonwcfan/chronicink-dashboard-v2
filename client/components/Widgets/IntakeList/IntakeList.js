import React, { Component, PropTypes } from 'react';
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
            inDeleteMode: false
        }
    }

    _handleListIconPressed(clientID) {
        this.props.primaryWidgetAction('intakeList', startBooking, [clientID]);
    }

    _handleDeleteFromIntakeList(intakeID) {
        Meteor.call('intake.markBookingCompleted', null, intakeID);
    }

    _renderIntakeList() {
        if (this.props.subReady) {
            return this.props.data.map((form) => {
                if (form.bookingPending) {
                    return (
                        <ListItem
                            key={form._id}
                            primaryText={form.clientName}
                        >
                            {this.state.inDeleteMode ?
                                <IconButton
                                    style={style.listItemIconButton}
                                    tooltipPosition='top-right'
                                    onTouchTap={this._handleDeleteFromIntakeList.bind(this, form._id)}
                                >
                                    <DeleteIcon />
                                </IconButton>
                                :
                                <LinkWrapper to={{pathname: '/booking', query: {clientID: form.clientID}}}>
                                    <IconButton
                                        style={style.listItemIconButton}
                                        tooltip='Create Booking'
                                        tooltipPosition='top-left'
                                        onTouchTap={this._handleListIconPressed.bind(this, form.clientID)}
                                    >
                                        <EditIcon />
                                    </IconButton>
                                </LinkWrapper>
                            }
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
}, IntakeList);