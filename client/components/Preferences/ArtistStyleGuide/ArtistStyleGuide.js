import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Slider from 'material-ui/Slider';
import RaisedButton from 'material-ui/RaisedButton';
import tattooStyles from '../../../constants/styles';

const style = {
    root: {
        
    },
    styleSlidersContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        flexWrap: 'wrap'
    },
    sliderContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        // alignItems: 'center',
        height: 24,
        width: '100%',
        margin: 12
    },
    slider: {
        width: '100%'
    },
    sliderLabel: {
        width: 224
    }
};

class ArtistStyleGuide extends Component {
    constructor(props) {
        super(props);

        this.state = {
            // The currently selected artist. Will be a string representing the artist's _id in MongoDB
            selectedArtist: null,
            // An object where keys are styles and values are integers from 0 to 100 representing the selected artist's
            // preference for that style
            styleValues: {},
            saveDisabled: false,
        };

        this._handleArtistChange = this._handleArtistChange.bind(this);
        this._handleSliderStop = this._handleSliderStop.bind(this);
    }

    /**
     * Since the onDragStop callback doesn't provide the value, we have to temporarily store the value in the state
     * and assign it to the right style after the slider stops moving
     * **/
    _handleSliderStop(tattooStyle) {
        const nextValue = this.refs[tattooStyle].state.value;
        const nextStyleValues = Object.assign({}, this.state.styleValues);
        nextStyleValues[tattooStyle] = nextValue;

        Meteor.call('artist.setStylePreferences', this.state.selectedArtist, nextStyleValues);
        this.setState({
            styleValues: nextStyleValues
        });
    }

    /**
     * Handle when the user picks a different artist from the dropdown
     * **/
    _handleArtistChange(event, key, artistId) {
        let artist = null;
        this.props.artists.forEach((elem) => {
            if (elem._id._str == artistId) {
                artist = elem;
            }
        });

        this.setState({
            selectedArtist: artistId,
            styleValues: artist.preferences.styles
        })
    }

    /**
     * Renders the Select field for picking the artist
     * **/
    _renderArtistSelect(artists) {
        return artists.map((artist) =>
            <MenuItem
                primaryText={artist.name}
                value={artist._id._str}
                key={artist._id}
            />
        )
    }

    /**
     * Renders all the sliders
     * **/
    _renderStyleGuide(tattooStyles) {
        return tattooStyles.map((tattooStyle) => {
            // Get the value of this current slider based on the styleValue state, and bind it to the Slider's value.
            // This is so that when setState is called to update the styleValue state, the Slider also updates itself
            let sliderValue = 0;
            if (this.state.styleValues) {
                sliderValue = this.state.styleValues[tattooStyle.value] || 0;
            }
            return (
                <div style={style.sliderContainer} key={tattooStyle.value}>
                    <div style={style.sliderLabel}>{tattooStyle.label}</div>
                    <Slider
                        ref={tattooStyle.value}
                        style={style.slider}
                        sliderStyle={{margin: 0}}
                        min={0}
                        max={100}
                        step={1}
                        axis='x'
                        value={sliderValue}
                        onDragStop={() => this._handleSliderStop(tattooStyle.value)}
                    />
                </div>
            );
        });

    }

    /**
     * Render the Select field to pick an artist.
     * Render the sliders and instructions only if an artist has been selected .
     * **/
    render() {
        return this.props.subReady ? (
            <div style={style.root}>
                <h3>Select an artist from the list</h3>
                <SelectField
                    style={{margin: 'auto'}}
                    onChange={this._handleArtistChange}
                    value={this.state.selectedArtist}
                    floatingLabelText='Artist'
                >
                    {this._renderArtistSelect(this.props.artists)}
                </SelectField>
                {this.state.selectedArtist ? <div>
                    <h3>
                        Use the sliders to indicate how often you would like to be booked for each style
                    </h3>
                    <p>
                        The closer you drag each slider to the end, the more often you will be booked for that style.
                        <br/>
                        <br/>
                        Drag to right = As often as possible
                        <br/>
                        Drag to left = Never
                    </p>
                    <div style={style.styleSlidersContainer}>
                        {this._renderStyleGuide(tattooStyles)}
                    </div>
                    <RaisedButton
                        label='Save'
                        primary={true}
                        disabled={this.state.saveDisabled}
                        onTouchTap={() => {this.setState({saveDisabled: true})}}
                    />
                </div> : null}
            </div>
        ) : null
    }
};

export default ArtistStyleGuide;