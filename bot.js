// require the twit package, which will allow us to talk to Twitter
var twit = require('twit');

// import the config file with account security information
var config = require('./config.js');

// declare our Twitter handler
var Twitter = new twit(config);

// set up stream to interact with users
var stream = Twitter.stream('user');

// when someone follows, call the followed function
stream.on('follow', followed)

// get user info, trigger callback
function followed(event) {
    console.log('New follower detected');

    // get user's twitter info
    var name = event.source.name,
    screenName = event.source.screen_name;

    // call function to reply to new follower
    tweetNow('@' + screenName + ' Thank you for following!');
}

// function that updates status based on user following
function tweetNow(tweetTxt) {
    
    // set up tweet
    var tweet = {
        status: tweetTxt
    }

    // post tweet
    Twitter.post('statuses/update', tweet, function(err, data, response) {
        
        // notify whether error occurred or successfully replied
        if (err) {
            console.log("Error replying to new follower.");
        }
        else {
            console.log("Successfully tweeted to new follower.");
        }
    });

}

// retweet function
var retweet = function() {

    // set the parameters of the search - result_type can be 'recent', 'mixed', or 'popular'
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
                    console.log('Retweeting ...');
                }
                if (err) {
                    console.log('Something went wrong while RETWEETING - possibly a duplicate.');
                }
                else {
                    console.log('Success!');
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