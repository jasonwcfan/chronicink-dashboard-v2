import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Paper from 'material-ui/Paper';
import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import DashboardIcon from 'material-ui/svg-icons/action/dashboard';
import FormsIcon from 'material-ui/svg-icons/action/assignment';
import IntakeIcon from 'material-ui/svg-icons/action/assignment-ind';
import ChecklistIcon from 'material-ui/svg-icons/action/assignment-turned-in';
import ActionCheckCircle from 'material-ui/svg-icons/action/check-circle';
import StoreIcon from 'material-ui/svg-icons/action/store';
import PreferencesIcon from 'material-ui/svg-icons/action/settings';

const style = {
    sideNavBarContainer: {
        maxWidth: 360,
        minWidth: 240,
        minHeight: '100vh',
    },
    menuList: {
        position: 'absolute',
        width: 240,
        top: 64,
        bottom: 0
    },
    link: {
        textDecoration: 'none'
    },
    logo: {
        height: 72*5/8,
        display: 'block',
        margin: '10px 10px 10px 10px',
        '@media (maxWidth: 768px)': {
            height: 54*5/8
        }
    }
};

class SideNavBar extends Component {
    constructor() {
        super();
    }

    _handleChangeApp(appName) {
        this.props.onChangeApp(appName);
    }

    render() {
        return(
            <Paper style={style.sideNavBarContainer} >
                <div>
                    <img key='logo' src={'/images/chronicink_logo.png'} style={style.logo}/>
                </div>
                <List style={style.menuList}>
                    <Divider />
                    <NavLink
                        style={style.link}
                        to='/dashboard'>
                        <ListItem name='dashboard' leftIcon={<DashboardIcon />}>Dashboard</ListItem>
                    </NavLink>
                    <NavLink
                        style={style.link}
                        to='/intakeform'>
                        <ListItem name='intakeForm' leftIcon={<IntakeIcon />}>Intake Form</ListItem>
                    </NavLink>
                    <NavLink
                        style={style.link}
                        to='/preferences'>
                        <ListItem name='preferences' leftIcon={<PreferencesIcon />}>Preferences</ListItem>
                    </NavLink>
                    <ListItem
                        primaryTogglesNestedList={true}
                        leftIcon={<FormsIcon />}
                        primaryText='Front Desk Forms'
                        nestedItems={[
                            <ListItem
                                name='managerChecklist'
                                key={1}
                                primaryText='Manager Checklist'
                                leftIcon={<ChecklistIcon />}
                                onTouchTap={() => {window.open('https://docs.google.com/forms/d/e/1FAIpQLSfngr-wkl007bJo1dVQtjHy4GkHwToXOKpOKxEb_ZJRKW6SXw/viewform', '_blank')}}
                            />,
                            <ListItem
                                name='openCloseForm'
                                key={2}
                                primaryText='Open/Close Form'
                                leftIcon={<StoreIcon />}
                                onTouchTap={() => {window.open('https://docs.google.com/forms/d/e/1FAIpQLSc8Oseu3nb8fdnQVX2STdoSfZttefY2MuWMU_gtfXRtcGdUnA/viewform?c=0&w=1', '_blank')}}
                            />,
                            <ListItem
                                name='openCloseForm'
                                key={3}
                                primaryText='Shop Duties Checklist'
                                leftIcon={<ActionCheckCircle />}
                                onTouchTap={() => {window.open('https://goo.gl/forms/KnyhiO43VYpTvVRU2', '_blank')}}
                            />
                        ]}
                    />
                    <Divider />
                </List>
            </Paper>
        )
    }
}

export default SideNavBar;