import React, {Component, PropTypes} from 'react';
import Paper from 'material-ui/Paper';

class MobileTearSheet extends Component {

    render() {

        const styles = {
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
                alignContent: 'flex-end'
            },
        };

        return (
            <Paper style={styles.root} zDepth={5}>
                <div style={styles.container}>
                    {this.props.children}
                </div>
            </Paper>
        );
    }
}

MobileTearSheet.propTypes = {
    children: PropTypes.node,
    height: PropTypes.number.isRequired,
};

MobileTearSheet.defaultProps = {
    height: 500,
};

MobileTearSheet.contextTypes = {
    muiTheme: PropTypes.object.isRequired,
};

export default MobileTearSheet;