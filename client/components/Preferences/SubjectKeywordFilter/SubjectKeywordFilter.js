import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Chip from 'material-ui/Chip';

const style = {
    styleSlidersContainer: {
        display: 'flex',
        height: 124,
        flexDirection: 'row',
        justifyContent: 'space-around',
        flexWrap: 'wrap'
    },
    chipContainer: {
        display: 'flex',
        flexWrap: 'wrap'
    },
    chip: {
        margin: 5
    }
};

class SubjectKeywordFilter extends Component {
    constructor(props) {
        super(props);

        this.state = {
            // The currently selected artist. Will be a string representing the artist's _id in MongoDB
            selectedArtist: null,
            preferredKeywords: [],
            refusedKeywords: []
        };

        this._handleArtistChange = this._handleArtistChange.bind(this);
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
            preferredKeywords: artist.preferences.preferredKeywords || [],
            refusedKeywords: artist.preferences.refusedKeywords || []
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

    _handleDeleteSubject(idx, type) {
        console.log('delete', idx, type);

        Meteor.call('artist.setKeywordPreferences', this.state.selectedArtist, preferred, refused, (err) => {
            if (err) {console.log(err)};
            this.setState({
                preferredKeywords: preferred,
                refusedKeywords: refused
            })
        })

        this.setState({
            [type]: this.state[type].slice().splice(idx, 1)
        });
    }

    _renderKeywords(subjects, type) {
        return subjects.map((subject, idx) =>
            <Chip
                style={style.chip}
                key={idx}
                onRequestDelete={(event) => this._handleDeleteSubject(idx, type)}
            >
                {subject}
            </Chip>
        )
    }

    _renderAddKeywordField(type) {
        return <div>
            <TextField hintText='Add new...' ref={type}/>
            <FlatButton label='Submit' onTouchTap={() => {
                const value = this.refs[type].input.value;
                const preferred = this.state.preferredKeywords.slice();
                const refused = this.state.refusedKeywords.slice();

                if (type == 'preferredKeywords') {
                    preferred.push(value);
                }
                if (type == 'refusedKeywords') {
                    refused.push(value);
                }

                Meteor.call('artist.setKeywordPreferences', this.state.selectedArtist, preferred, refused, (err) => {
                    if (err) {console.log(err)};
                    this.setState({
                        preferredKeywords: preferred,
                        refusedKeywords: refused
                    })
                })
            }} />
        </div>
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
                {this.state.selectedArtist ? <div>
                    <h3>
                        I prefer these subjects
                    </h3>
                    <div style={style.chipContainer}>
                        {this._renderKeywords(this.state.preferredKeywords, 'preferredKeywords')}
                    </div>
                    {this._renderAddKeywordField('preferredKeywords')}
                    <h3>
                        I don't want to do these subjects
                    </h3>
                    <div style={style.chipContainer}>
                        {this._renderKeywords(this.state.refusedKeywords, 'refusedKeywords')}
                    </div>
                    {this._renderAddKeywordField('refusedKeywords')}
                </div> : null}
            </div>
        ) : null;
    }
};

export default SubjectKeywordFilter;