import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import DashboardIcon from 'material-ui/svg-icons/action/dashboard';
import FormsIcon from 'material-ui/svg-icons/action/assignment';
import IntakeIcon from 'material-ui/svg-icons/action/assignment-ind';
import ChecklistIcon from 'material-ui/svg-icons/action/assignment-turned-in';
import StoreIcon from 'material-ui/svg-icons/action/store';
import PreferencesIcon from 'material-ui/svg-icons/action/settings';
import LinkWrapper from '../UI/LinkWrapper';

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
        height: 100,
        width: 100
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
                <List style={style.menuList}>
                    <Divider />
                    <LinkWrapper to={{pathname: '/dashboard'}}><ListItem name='dashboard' leftIcon={<DashboardIcon />}>Dashboard</ListItem></LinkWrapper>
                    <LinkWrapper to={{pathname: '/intakeform'}}><ListItem name='intakeForm' leftIcon={<IntakeIcon />}>Intake Form</ListItem></LinkWrapper>
                    <LinkWrapper to={{pathname: '/preferences'}}><ListItem name='preferences' leftIcon={<PreferencesIcon />}>Preferences</ListItem></LinkWrapper>
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