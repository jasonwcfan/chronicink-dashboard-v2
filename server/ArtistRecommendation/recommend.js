recommendationEngine = {
    rankArtists: function (tattooStylePreference, hoursIn60Days, daysUntilEarliestOpening,
        min_booking_volume, max_booking_volume, min_soonest_opening, max_soonest_opening) {

        // normalize input variables between 0 and 1 so we can assign them weights
        let n_booking_volume = 1 - normalize(hoursIn60Days, max_booking_volume, min_booking_volume);
        console.log('#### n_booking_volume: ', n_booking_volume);

        // take 33 as the cut-off for penalizing lower preferences
        let n_style_preference = (tattooStylePreference - 33)/67;
        console.log('#### n_style_preference: ', n_style_preference);

        let n_soonest_opening = normalize(daysUntilEarliestOpening, max_soonest_opening, min_soonest_opening);
        console.log('#### n_soonest_opening: ', n_soonest_opening);
        // apply the weights here
        let score = (0.5 * n_booking_volume) + (1 * n_style_preference) + (2 * n_soonest_opening);

        return score;
    }

}

function normalize (x, maxVal, minVal) {

    // if all values are the same, the weight of each item might as well be 0
    let maxValTrunc = Math.round(maxVal*Math.pow(10,7))/Math.pow(10,7);
    let minValTrunc = Math.round(minVal*Math.pow(10,7))/Math.pow(10,7);

    if (maxValTrunc == minValTrunc) {
        return 0;
    }
    else {
        return (x - minVal) / (maxVal - minVal);
    }
}


