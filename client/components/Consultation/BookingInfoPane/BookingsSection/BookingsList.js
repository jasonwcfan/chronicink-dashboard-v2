import React, { Component } from 'react';
import { List, ListItem } from 'material-ui/List';
import Paper from 'material-ui/Paper';
import BookingsSheet from '../../../UI/BookingsSheet';
import BookingDialog from './BookingDialog';

class BookingsList extends Component {
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
                    <ListItem primaryText="Booking 1" />
                </List>
                <div style={style.dialogContainer}>
                    <BookingDialog style={style.dialogButton} />
                </div>
            </Paper>
        )
    }
}

BookingsList.defaultProps = {
    height: 500,
};

export default BookingsList;