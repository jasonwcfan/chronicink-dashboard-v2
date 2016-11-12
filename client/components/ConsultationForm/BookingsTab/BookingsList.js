import React, { Component } from 'react';
import { List, ListItem } from 'material-ui/List';
import Paper from 'material-ui/Paper';
import BookingsSheet from '../../UI/BookingsSheet';
import BookingDialog from './BookingDialog';
import moment from 'moment';

class BookingsList extends Component {
    constructor() {
        super();
    }

    _renderSessions(sessions) {
        return sessions.map((session) =>
            <ListItem
                primaryText={session.sessionType + ' ' + session.sessionIndex + 1}
                secondaryText={moment(session.date).format('MMM Do YYYY')} />
        )
    }

    render() {
        const style = {
            root: {
                marginBottom: 24,
                marginRight: 24,
                maxWidth: 360,
                width: '100%',
            },
            listContainer: {
                backgroundColor: '#404040',
                height: this.props.height,
                overflow: 'hidden',
            },
            dialogContainer: {
                backgroundColor: '#404040',
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'flex-end',
                alignItems: 'flex-end'
            }
        };

        return (
            <Paper style={style.root} zDepth={5}>
                <List style={style.listContainer}>
                    {this._renderSessions(this.props.sessions)}
                </List>
                <div style={style.dialogContainer}>
                    <BookingDialog />
                </div>
            </Paper>
        )
    }
}

BookingsList.defaultProps = {
    height: 500,
};

export default BookingsList;