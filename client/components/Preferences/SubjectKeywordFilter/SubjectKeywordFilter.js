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

    _handleDeleteSubject(idx) {
        console.log('delete', idx)
    }

    _renderpreferredKeywords(subjects) {
        return subjects.map((subject, idx) =>
            <Chip
                onRequestDelete={(event) => this._handleDeleteSubject(idx, 'preferredKeywords')}
            >
                {subject}
            </Chip>
        )
    }

    _renderrefusedKeywords(subjects) {
        return subjects.map((subject, idx) =>
            <Chip
                onRequestDelete={(event) => this._handleDeleteSubject(idx, 'refusedKeywords')}
            >
                {subject}
            </Chip>
        )
    }

    _renderAddSubjectField(type) {
        return <div>
            <TextField hintText='Add new...' ref={type}/>
            <FlatButton label='Submit' onTouchTap={() => {
                console.log('add', this.refs[type].input.value);
                Meteor.call('artist.setKeywordPreferences', (err, res) => {

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
                        {this._renderpreferredKeywords(this.state.preferredKeywords)}
                        {this._renderAddSubjectField('preferred-subject')}
                    </div>
                    <h3>
                        I don't want to do these subjects
                    </h3>
                    <div style={style.chipContainer}>
                        {this._renderrefusedKeywords(this.state.refusedKeywords)}
                        {this._renderAddSubjectField('refused-subject')}
                    </div>
                </div> : null}
            </div>
        ) : null;
    }
};

export default SubjectKeywordFilter;