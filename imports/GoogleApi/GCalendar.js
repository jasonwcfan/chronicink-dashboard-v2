import { HTTP } from 'meteor/http';

export function insertEvent(event, artist) {

    HTTP.call(
        'POST',
        `https://www.googleapis.com/calendar/v3/calendars/${encodeURI(artist.calendarID)}/events`,
        {data: event}
    )
}