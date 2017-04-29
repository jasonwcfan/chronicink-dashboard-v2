import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';
import Moment from 'moment-timezone';
import Paper from 'material-ui/Paper';
import Colors from 'material-ui/styles/colors';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import { List, ListItem } from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import EditIcon from 'material-ui/svg-icons/content/create';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import DeleteIcon from 'material-ui/svg-icons/action/delete-forever';
import CheckIcon from 'material-ui/svg-icons/action/done';
import { createContainer } from 'meteor/react-meteor-data';
import Intake from '../../../../imports/Intake/intake';


// Eventually move this style to "Widget" component
const style = {
    intakeListContainer: {
        width: 300,
        maxHeight: '80vh',
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
        marginLeft: 16
    },
    menuIcon: {
        display: 'inline'
    },
    intakeList: {
        overflow: 'auto',
        overflowX: 'hidden'
    },
    searchBar: {
        marginLeft:16,
        borderBottomStyle:'none'
    }

};

class IntakeList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            inDeleteMode: false,
            searchText: null
        }
        this._handleChange = this._handleChange.bind(this);
    }

    // Function that updates search text in intake list state
    _handleChange(event, newValue) {
        this.setState({searchText: newValue});
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

                // Only render list items if search text matches client name (case insensitive), or if search text is blank
                if (form.bookingPending && (!this.state.searchText || form.clientName.toLowerCase().includes(this.state.searchText.toLowerCase()))) {
                    return (
                        <ListItem
                            key={form._id}
                            primaryText={form.clientName + missedCall}
                            secondaryText={`${submitDate} ${submitLocation}`}
                            rightIconButton={this.state.inDeleteMode ? // If in Delete Mode: garbage can icon
                                <IconButton
                                    tooltipPosition='top-right'
                                    onTouchTap={this._handleDeleteFromIntakeList.bind(this, form._id)}
                                >
                                    <DeleteIcon />
                                </IconButton>
                                : // If NOT in Delete Mode: pencil icon

                                <IconButton
                                    tooltip='Create Booking'
                                    tooltipPosition='top-left'>
                                    <Link to={{
                                        pathname: `/bookingform/${form.clientID}`
                                    }}>
                                        <EditIcon/>
                                    </Link>
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
            // Intake List Header (title and menu button)
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

                {/* Intake List search bar*/}
                <TextField
                    style={style.searchBar}
                    onChange={this._handleChange}
                    underlineShow={false}
                    hintText="Type here to search"
                >
                </TextField>
                <Divider />

                {/* Actual list of intakes*/}
                <List style={style.intakeList}>
                    {this._renderIntakeList()}
                </List>
            </Paper>
        )
    }
}

export default IntakeList = createContainer(() => {
    const subscription = Meteor.subscribe('intake');

    return {
        subReady: subscription.ready(),
        data: Intake.find({bookingPending: true}, {sort: {date: -1}}).fetch()
    }
}, IntakeList);