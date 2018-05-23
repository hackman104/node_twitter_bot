// require the twit package, which will allow us to talk to Twitter
var twit = require('twit');

// import the config file with account security information
var config = require('./config.js');
console.log(config);

// declare our Twitter handler
var Twitter = new twit(config);

// retweet function
var retweet = function() {

    // set the parameters of the search - result_type can be changed to 'recent' to prioritize recent tweets
    var params = {
        q: 'Pittsburgh OR PittsburghWeather OR PittsburghTraffic OR PittsburghConstruction',
        result_type: 'mixed',
        lang: 'en'
    };

    // perform search based on parameters
    Twitter.get('search/tweets', params, function(err, data) {
        
        // check for error
        if (!err) {

            // access data statuses element in json response, get ID of first tweet. console.log if you wish to see structure
            var retweetId = data.statuses[0].id_str;
            
            // retweet with ID just obtained
            Twitter.post('statuses/retweet/:id', {
                id: retweetId
            }, function(err, response) {
                
                // inform if retweet was successful or if error occurred
                if (response) {
                    console.log('Retweeted!');
                }
                if (err) {
                    console.log('Something went wrong while RETWEETING!');
                }
            });
        }

        // inform if error in search
        else {
            console.log('Something went wrong while SEARCHING');
        }
    });
}

// retweet as soon as execution begins
retweet();

// wait and repeat - time interval set in milliseconds, defaults here to once every hour
setInterval(retweet, 3600000);