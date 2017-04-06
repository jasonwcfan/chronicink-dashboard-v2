import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Slider from 'material-ui/Slider';
import Artist from '../../../../imports/Artist/artist';
import tattooStyles from '../../../constants/styles';

const style = {
    root: {

    },
    styleSlidersContainer: {
        display: 'flex',
        height: 124,
        flexDirection: 'row',
        justifyContent: 'space-around',
        flexWrap: 'wrap'
    },
    sliderContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: '100%',
        width: 72,
        margin: 24,
        marginBottom: 48
    },
    slider: {
        height: '100%'
    },
    sliderLabel: {
        marginTop: 10,
        textAlign: 'center'
    }
};

class ArtistStyleGuide extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedArtist: null
        };

        this._handleArtistChange = this._handleArtistChange.bind(this);
    }

    _handleArtistChange(event, key, value) {
        this.setState({
            selectedArtist: value
        })
    }

    _renderArtistSelect(artists) {
        return artists.map((artist) =>
            <MenuItem
                primaryText={artist.name}
                value={artist._id}
                key={artist._id}
            />
        )
    }

    _renderStyleGuide(tattooStyles) {
        return tattooStyles.map((tattooStyle) =>
            <div style={style.sliderContainer} key={tattooStyle.value}>
                <Slider
                    style={style.slider}
                    sliderStyle={{margin: 0}}
                    axis='y'
                />
                <div style={style.sliderLabel}>{tattooStyle.label}</div>
            </div>
        )

    }

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
                <h3>
                    Use the sliders to indicate how often you would like to be booked for each style
                </h3>
                <p>
                    The closer you drag each slider to the top, the more often you will be booked for that style.
                    <br/>
                    <br/>
                    Drag to top = As often as possible
                    <br/>
                    Drag to bottom = Never
                </p>
                <div style={style.styleSlidersContainer}>
                    {this._renderStyleGuide(tattooStyles)}
                </div>
            </div>
        ) : null;
    }
};

export default ArtistStyleGuide = createContainer(({ params }) => {
    const subscription = Meteor.subscribe('artist');

    return {
        subReady: subscription.ready(),
        artists: Artist.find({}).fetch()
    }
}, ArtistStyleGuide);