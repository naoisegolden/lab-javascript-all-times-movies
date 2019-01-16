/* eslint no-restricted-globals: 'off' */
// Turn duration of the movies from hours to minutes 
function turnHoursToMinutes(movies) {
    return movies.map(function (movie) {
        var totalMinutes;
        var hours = 0;
        var minutes = 0;
        var durationSplit = movie.duration.split(" ");
        if (durationSplit.length > 1) {
            hours = durationSplit[0].split("h")[0];
            minutes = durationSplit[1].split("min")[0];
        } else if (durationSplit.length === 1 && durationSplit[0].indexOf("h") > 0) {
            hours = durationSplit[0].split("h")[0];
        } else if (durationSplit.length === 1 && durationSplit[0].indexOf("h") < 0) {
            minutes = durationSplit[0].split("min")[0];
        }

        minutes = parseInt(minutes, 10);
        hours = parseInt(hours, 10);
        totalMinutes = hours * 60 + minutes;

        var movieClone = Object.assign({}, movie); // make a clone of the `movie` object
        movieClone.duration = totalMinutes;

        return movieClone;
    });
}

// Get the average of all rates with 2 decimals 
function ratesAverage(movies) {
    if (!movies.length) return;

    var addedRates = movies.reduce(function(accum, movie) {
        return accum + (movie.rate ? parseFloat(movie.rate) : 0);
    }, 0);

    var average = addedRates / movies.length;

    return Math.round(average * 100) / 100;
}

// Get the average of Drama Movies
function dramaMoviesRate(movies) {
    var dramaMovies = movies.filter(function(movie) {
        return movie.genre.includes("Drama");
    });

    return ratesAverage(dramaMovies);
}

// Order by time duration, in growing order
function orderByDuration(movies) {
    return movies.sort(function(a, b) {
        // Sort alphabetically if identical duration
        if (a.duration === b.duration) {
            if (a.title < b.title) { return -1; }
            if (a.title > b.title) { return 1; }
            return 0;
        };

        return a.duration - b.duration;
    });
}

// How many movies did STEVEN SPIELBERG
// FIXME: the description is wrong
function howManyMovies(movies) {
    if (!movies.length) return;

    var filtered = movies.filter(function(movie) {
        return movie.director === "Steven Spielberg" && movie.genre.includes("Drama");
    });

    return `Steven Spielberg directed ${filtered.length} drama movies!`;
}

// Order by title and print the first 20 titles
function orderAlphabetically(movies) {
    var sorted = movies.sort(function (a, b) {
        if (a.title < b.title) { return -1; }
        if (a.title > b.title) { return 1; }
        return 0;
    });

    return sorted.splice(0, 20).map(function(movie) { return movie.title; });
}

// Best yearly rate average
