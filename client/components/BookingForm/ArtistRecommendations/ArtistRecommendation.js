import React, { Component, PropTypes } from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

const style = {
    root: {

    },
    dialog: {
        padding: 0
    },
    gridList: {
        display: 'flex',
        flexWrap: 'nowrap'
    },
    gridTile: {
        width: '200px'
    }
};

class ArtistRecommendation extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dialogOpen: false,
            recommendationResult: null
        };

        this._handleClickRecommendButton = this._handleClickRecommendButton.bind(this);
        this._renderRecommendations = this._renderRecommendations.bind(this);
    }

    _handleClickRecommendButton() {
        const tattooStyle = this.props.formValues.style.value;
        if (tattooStyle) {
            this.setState({
                dialogOpen: true
            });

            // Set up the data to pass to the recommendation engine
            const data = {
                tattooStyle
            };

            // Call the meteor method that spawns the python script to calculate artist recommendations
            Meteor.call('booking.getArtistRecommendation', data, (err, res) => {
                if (err) {console.log(err); return}
                this.setState({
                    recommendationResult: res
                })
            });
        } else {
            // tattooStyle is not set
            this.setState({
                dialogOpen: true
            })
        }
    }

    _renderRecommendations(result) {
        return (
            result.map((artist) => {
                return (
                    <GridTile
                        style={style.gridTile}
                        key={artist._id}
                        title={artist.name}
                        titleBackground="linear-gradient(to top, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
                    >

                    </GridTile>
                )
            })
        )
    }

    render() {
        return (

            <div style={style.root}>
                <FlatButton
                    style={style.recommendButton}
                    label='Recommend'
                    onTouchTap={this._handleClickRecommendButton}
                />
                <Dialog
                    className='test'
                    bodyStyle={style.dialog}
                    open={this.state.dialogOpen}
                    onRequestClose={() => {this.setState({dialogOpen: false})}}
                >
                    <GridList style={style.gridList} cols={2.2} onScroll={() => {console.log('scroll')}}>
                        {this.state.recommendationResult ? this._renderRecommendations(this.state.recommendationResult) : null}
                    </GridList>
                </Dialog>
            </div>
        )
    }
}

ArtistRecommendation.propTypes = {
    formValues: PropTypes.object,
    result: PropTypes.array
};

export default ArtistRecommendation;