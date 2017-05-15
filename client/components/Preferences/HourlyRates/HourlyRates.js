import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { TextField, RaisedButton, SelectField, MenuItem } from 'material-ui';

const style = {
};

class HourlyRates extends Component {
    constructor(props) {
        super(props);

        this.state = {
            artist: null,
            fieldsChanged: false,
        };

        this._handleArtistChange = this._handleArtistChange.bind(this);
        this._handleSaveRate = this._handleSaveRate.bind(this);
    }

    /**
     * Handle when the user picks a different artist from the dropdown
     * **/
    _handleArtistChange(event, key, artistId) {
        const artist = this.props.artists.filter((elem) => {
            return elem._id._str == artistId;
        })[0];

        artist.hourlyRate = artist.hourlyRate || 0;
        artist.minimumDeposit = artist.minimumDeposit || 0;

        this.setState({
            artist: artist,
            fieldsChanged: false,
        });
    }

    /**
     * Handle when user attempts to save the artist
     * **/
    _handleSaveRate() {
        console.log('rendered')
        if(!this.state.artist) {
            return;
        }

        Meteor.call('artist.update', this.state.artist._id, {
            hourlyRate: this.state.artist.hourlyRate,
            minimumDeposit: this.state.artist.minimumDeposit,
        }, (error, count) => {
            if(error) {
                throw error;
            }

            this.setState({fieldsChanged: false});
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

    render() {
        return this.props.subReady ? (
            <div style={style.root}>
                <h3>Select an artist from the list</h3>
                <SelectField
                    style={{margin: 'auto'}}
                    onChange={this._handleArtistChange}
                    value={this.state.artist ? this.state.artist._id._str : ''}
                    floatingLabelText='Artist'
                >
                    {this._renderArtistSelect(this.props.artists)}
                </SelectField>
                {this.state.artist ? <div>
                    <div>
                        <TextField
                            hintText='Hourly rate ($)'
                            label='Hourly rate ($)'
                            value={this.state.artist.hourlyRate}
                            onChange={(_, value) => {
                                const artist = this.state.artist;
                                artist.hourlyRate = value;
                                
                                this.setState({
                                    fieldsChanged: true, 
                                    artist: artist
                                });
                            }}
                        />
                    </div>
                    <div>
                        <TextField
                            hintText='Minimum deposit'
                            label='Minimum deposit'
                            value={this.state.artist.minimumDeposit}
                            onChange={(_, value) => {
                                const artist = this.state.artist;
                                artist.minimumDeposit = value;

                                this.setState({
                                    fieldsChanged: true, 
                                    artist: artist
                                });
                            }}
                        />
                    </div>
                    <div> 
                        <RaisedButton
                            label='Save'
                            disabled={!this.state.fieldsChanged}
                            onTouchTap={() => this._handleSaveRate()}
                        />
                    </div>
                </div> : null}
            </div>
        ) : null;
    }
};

export default HourlyRates;
