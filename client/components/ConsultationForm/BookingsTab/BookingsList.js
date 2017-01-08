import React, { Component } from 'react';
import { List, ListItem } from 'material-ui/List';
import Paper from 'material-ui/Paper';
import DeleteIcon from 'material-ui/svg-icons/action/delete-forever';
import IconButton from 'material-ui/IconButton';
import BookingDialog from './BookingDialog';
import moment from 'moment';

class BookingsList extends Component {
    constructor() {
        super();
    }

    _renderSessions(sessions) {
        return sessions.map((session, idx) => {
            const _handleDeleteBooking = (event) => {
                this.props.deleteBooking(idx);
            };
            return (
                <ListItem
                    primaryText={session.sessionType + ' ' + (idx + 1)}
                    secondaryText={moment(session.date).format('MMM Do YYYY: ') + moment(session.startTime).format('h:mm A') + ' to ' + moment(session.endTime).format('h:mm A')}
                    key={idx}
                    rightIconButton={<IconButton onClick={_handleDeleteBooking}><DeleteIcon /></IconButton>}
                />
            )
        })
    }

    render() {
        const style = {
            root: {
                marginBottom: 200,
                marginRight: 24,
                maxWidth: 360,
                width: '100%',
            },
            listContainer: {
                backgroundColor: '#404040',
                height: this.props.sessions.length * 72 || 144,
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
                    <BookingDialog onSubmitSession={this.props.onSubmitSession} />
                </div>
            </Paper>
        )
    }
}

export default BookingsList;