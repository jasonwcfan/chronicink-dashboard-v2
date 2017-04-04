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
        justifyContent: 'space-around',
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
            <div style={style.sliderContainer}>
                <Slider
                    style={style.slider}
                    sliderStyle={{margin: 0}}
                    axis='y'
                    key={style.value}
                />
                <div style={style.sliderLabel}>{tattooStyle.label}</div>
            </div>
        )

    }

    render() {
        return this.props.subReady ? (
            <div style={style.root}>
                <SelectField
                    style={{margin: 'auto'}}
                    onChange={this._handleArtistChange}
                    value={this.state.selectedArtist}
                    floatingLabelText='Artist'
                >
                    {this._renderArtistSelect(this.props.artists)}
                </SelectField>
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