import React, { Component, PropTypes } from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

const style = {
    dialogContent: {
        width: '100%'
    },
    gridList: {
        display: 'flex',
        flexWrap: 'nowrap',
        overflowX: 'auto'
    },
    gridTile: {

    },
    showAllButtonContainer: {
        display: 'flex',
        justifyContent: 'center',
    },
    avatar: {
        width: '200px',
        display: 'block',
        margin: '0 auto'
    }
};

class ArtistRecommendation extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dialogOpen: false,
            showAll: false,
            recommendationResult: null
        };

        this._handleClickRecommendButton = this._handleClickRecommendButton.bind(this);
        this._renderRecommendations = this._renderRecommendations.bind(this);
        this._handleClickShowAll = this._handleClickShowAll.bind(this);
        this._handleCloseDialog = this._handleCloseDialog.bind(this);
    }

    _handleClickShowAll() {
        this.setState({
            showAll: true
        })
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
        const displayedResult = this.state.showAll ? result : result.slice(0, 3);
        return (
            displayedResult.map((artist) => {
                return (
                    <GridTile
                        style={style.gridTile}
                        key={artist._id}
                        title={artist.name}
                        titleBackground="linear-gradient(to top, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
                    >
                        <img style={style.avatar} src={'/images/default_avatar.png'}/>
                    </GridTile>
                )
            })
        )
    }

    _handleCloseDialog() {
        this.setState({
            dialogOpen: false,
            showAll: false
        })
    }

    render() {
        return (

            <div>
                <FlatButton
                    style={style.recommendButton}
                    label='Recommend'
                    onTouchTap={this._handleClickRecommendButton}
                />
                <Dialog
                    className='test'
                    contentStyle={style.dialogContent}
                    open={this.state.dialogOpen}
                    onRequestClose={this._handleCloseDialog}
                >
                    <GridList style={style.gridList} cols={1} onScroll={() => {console.log('scroll')}}>
                        {this.state.recommendationResult ? this._renderRecommendations(this.state.recommendationResult) : null}
                    </GridList>
                    <div style={style.showAllButtonContainer}>
                        <FlatButton onTouchTap={this._handleClickShowAll}
                                    label='Show All' disabled={this.state.showAll}/>
                    </div>
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