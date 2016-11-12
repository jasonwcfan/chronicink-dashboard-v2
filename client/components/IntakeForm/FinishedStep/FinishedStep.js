import React, { Component } from 'react';

const style = {
    header: {
        margin: 10
    }
};

class FinishedStep extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div>
                <h2 style={style.header}>Finished!</h2>
            </div>
        )
    }
}

export default FinishedStep;