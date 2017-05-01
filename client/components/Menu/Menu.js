import React, { Component } from 'react';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';


class Menu extends Component {
    constructor() {
        super();
    }

    logOut() {
        Meteor.logout(function(err) {
            if (!err) {
                window.location.reload();
            }
        });
    }

    render() {
        return (
            <IconMenu
                {...this.props}
                iconButtonElement={
                    <IconButton><MoreVertIcon color="white" /></IconButton>
                }
                targetOrigin={{horizontal: 'right', vertical: 'top'}}
                anchorOrigin={{horizontal: 'right', vertical: 'top'}}
            >
                <MenuItem primaryText='Sign Out' onTouchTap={this.logOut} />
            </IconMenu>
        )
    }
}

export default Menu;