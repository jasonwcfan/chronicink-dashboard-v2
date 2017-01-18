import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import DashboardIcon from 'material-ui/svg-icons/action/dashboard';
import FormsIcon from 'material-ui/svg-icons/action/assignment';
import IntakeIcon from 'material-ui/svg-icons/action/assignment-ind';
import ChecklistIcon from 'material-ui/svg-icons/action/assignment-turned-in';
import StoreIcon from 'material-ui/svg-icons/action/store';
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
                    <LinkWrapper to='/dashboard'><ListItem name='dashboard' leftIcon={<DashboardIcon />}>Dashboard</ListItem></LinkWrapper>
                    <LinkWrapper to='/intakeform'><ListItem name='intakeForm' leftIcon={<IntakeIcon />}>Intake Form</ListItem></LinkWrapper>
                    <ListItem
                        primaryTogglesNestedList={true}
                        leftIcon={<FormsIcon />}
                        nestedItems={[
                            <LinkWrapper
                                to='https://docs.google.com/forms/d/e/1FAIpQLSfngr-wkl007bJo1dVQtjHy4GkHwToXOKpOKxEb_ZJRKW6SXw/viewform'
                                external={true}
                            >
                                <ListItem name='managerChecklist' primaryText='Manager Checklist' leftIcon={<ChecklistIcon />} />
                            </LinkWrapper>,
                            <LinkWrapper
                                to='https://docs.google.com/forms/d/e/1FAIpQLSc8Oseu3nb8fdnQVX2STdoSfZttefY2MuWMU_gtfXRtcGdUnA/viewform?c=0&w=1'
                                external={true}
                            >
                                <ListItem name='openCloseForm' primaryText='Open/Close Form' leftIcon={<StoreIcon />} />
                            </LinkWrapper>
                        ]}
                    >Manager Forms</ListItem>
                    <Divider />
                </List>
            </Paper>
        )
    }
}

export default SideNavBar;