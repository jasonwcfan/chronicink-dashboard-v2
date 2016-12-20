export default setArtist = (artistName, artistList) => {
    console.log(artistName);
    const artist = null;
    for (let i = 0; i < artistList.length; i++) {
        if (artistList[i].name == artistName) {
            return {
                type: 'SET_ARTIST',
                artistName: artistList[i].name,
                calendarID: artistList[i].calendarID
            }
        }
    }
    return {
        type: 'ARTIST_NOT_FOUND'
    }
}