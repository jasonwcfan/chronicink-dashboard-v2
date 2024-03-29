import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import Divider from 'material-ui/Divider';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import Checkbox from 'material-ui/Checkbox';

const style = {
    container: {
        fontFamily: 'Roboto, sans-serif'
    },
    divider: {
        margin: '20px'
    },
    freeAnyTimeCheckboxContainer: {
        display: 'flex',
        justifyContent: 'center'
    },
    tableHeaderColumn: {
        fontSize: '16px'
    },
    tableHeaderTextLarge: {
        '@media (max-width: 549px)': {
            display: 'none'
        }
    },
    tableHeaderTextSmall: {
        '@media (min-width: 550px)': {
            display: 'none'
        }
    }
};

class FinishedStep extends Component {
    constructor(props) {
        super(props);

        this._handleToggleFreeAnyTime = this._handleToggleFreeAnyTime.bind(this);
        this._renderTableRows = this._renderTableRows.bind(this);
    }

    _handleToggle(day, time, event, value) {
        this.props.onToggleCancellationAvailability(day, time, value);
    }

    _handleToggleFreeAnyTime(event, value) {
        this.props.onToggleFreeAnyTime(value);
    }

    _renderTableRows() {
        const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

        return weekDays.map((day) => {
            const lowerCaseDay = day.toLowerCase();
            return (
                <TableRow key={lowerCaseDay}>
                    <TableRowColumn>{day}</TableRowColumn>
                    <TableRowColumn>
                        <Checkbox
                            checked={this.props.cancellationAvailability[lowerCaseDay]['afternoon']}
                            onCheck={this._handleToggle.bind(this, lowerCaseDay, 'afternoon')}
                        />
                    </TableRowColumn>
                    <TableRowColumn>
                        <Checkbox
                            checked={this.props.cancellationAvailability[lowerCaseDay]['evening']}
                            onCheck={this._handleToggle.bind(this, lowerCaseDay, 'evening')} />
                    </TableRowColumn>
                </TableRow>
            )
        })
    }

    render() {
        return (
            <div style={style.container}>
                <h2 style={{textAlign: 'center'}}>My availability if a spot opens up</h2>
                <p>
                    Sometimes, we will have last minute openings when there is a cancellation, so we may be able to get
                    started on your piece earlier than expected.
                </p>
                <p>
                    If you would like to be notified in case space opens
                    up, please let us know what times you are typically available to come in.
                </p>
                <div style={style.weekDaysContainer}>
                    <Divider style={style.divider} />
                    <div style={style.freeAnyTimeCheckboxContainer}>
                        <Checkbox
                            label='Super flexible, free any time'
                            onCheck={this._handleToggleFreeAnyTime}
                        />
                    </div>
                    <Table selectable={false}>
                        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                            <TableRow>
                                <TableHeaderColumn style={style.tableHeaderColumn}><p>Day</p></TableHeaderColumn>
                                <TableHeaderColumn style={style.tableHeaderColumn}><p style={style.tableHeaderTextLarge}>Afternoon (12PM-5PM)</p><p style={style.tableHeaderTextSmall}>12PM-5PM</p></TableHeaderColumn>
                                <TableHeaderColumn style={style.tableHeaderColumn}><p style={style.tableHeaderTextLarge}>Evening (5PM-8PM)</p><p style={style.tableHeaderTextSmall}>5PM-8PM</p></TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody displayRowCheckbox={false}>
                            {this._renderTableRows()}
                        </TableBody>
                    </Table>
                </div>
            </div>
        )
    }
}

FinishedStep.propTypes = {
    cancellationAvailability: PropTypes.object
};

export default Radium(FinishedStep);