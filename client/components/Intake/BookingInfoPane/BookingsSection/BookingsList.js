import React, { Component } from 'react';
import { List, ListItem } from 'material-ui/List';
import Paper from 'material-ui/Paper';
import BookingsSheet from '../../../../components/UI/BookingsSheet';
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
            container: {
                backgroundColor: '#404040',
                height: this.props.height,
                overflow: 'hidden',
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'flex-end',
                alignItems: 'flex-end'
            },
            bottomTear: {
                display: 'block',
                position: 'relative',
                marginTop: -10,
                maxWidth: 360,
            },
        };

        return (
            <Paper style={style.root} zDepth={5}>
                <div style={style.container}>
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