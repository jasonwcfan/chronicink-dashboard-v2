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
        cursor: 'pointer'
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
            // A list of all artists returned by the recommendation engine
            recommendationResult: null
        };

        this._handleClickRecommendButton = this._handleClickRecommendButton.bind(this);
        this._renderRecommendations = this._renderRecommendations.bind(this);
        this._handleClickShowAll = this._handleClickShowAll.bind(this);
        this._handleCloseDialog = this._handleCloseDialog.bind(this);
        this._handleClickArtistTile = this._handleClickArtistTile.bind(this);
    }

    /**
     * Shows all artists in order of their recommendation score
     * @private
     */
    _handleClickShowAll() {
        this.setState({
            showAll: true
        })
    }

    /**
     * Opens up the recommendation dialog and calls the Meteor method to run the recommendation script, then writes
     * the results to the state
     * @private
     */
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

    /**
     * Closes the dialog and changes the artist field on the BookingForm to be the selected artist
     * @param artist
     * @private
     */
    _handleClickArtistTile(artist) {
        this._handleCloseDialog();
        this.props.onFieldChange('artist', artist._id, null);
    }

    /**
     * Renders the list of GridTiles that represent recommended artists, including images. Start by rendering only
     * the top 3 artists
     * @param result the raw results returned by the artist recommendation script (array of artists)
     * @returns {*}
     * @private
     */
    _renderRecommendations(result) {
        // Stupid thing with this GridTile component: if the key of an element is the same on a re-render, that
        // element won't appear for some reason. So we have to duplicate the code and assign the key to the index
        // if we are displaying only the first 3 results, otherwise assign the key to be artist._id.
        return this.state.showAll ?
            result.map((artist) => {
                return (
                    <GridTile
                        style={style.gridTile}
                        key={artist._id}
                        title={artist.name}
                        titleBackground="linear-gradient(to top, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
                        onTouchTap={() => this._handleClickArtistTile(artist)}
                    >
                        <img style={style.avatar} src={'/images/default_avatar.png'}/>
                    </GridTile>
                )
            }) :
            result.slice(0, 3).map((artist, idx) => {
                return (
                    <GridTile
                        style={style.gridTile}
                        key={idx}
                        title={artist.name}
                        titleBackground="linear-gradient(to top, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
                        onTouchTap={() => this._handleClickArtistTile(artist)}
                    >
                        <img style={style.avatar} src={'/images/default_avatar.png'}/>
                    </GridTile>
                )
            })

    }

    /**
     * Close the recommendation dialog
     * @private
     */
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
                    <GridList style={style.gridList} cols={1}>
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