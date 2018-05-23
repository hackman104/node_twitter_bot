// require twitter service class
const TwitterService = require('./twitter_service');

// require the twit package, which will allow us to talk to Twitter
const twit = require('twit');

// import the config file with account security information
const config = require('./config.js');

// declare our Twitter handler
const Twitter = new twit(config);

// set up stream to interact with users
const stream = Twitter.stream('user');

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
var retweet = async function() {

    // instantiate twitter service
    const twitterService = new TwitterService();

    // set the parameters of the search - result_type can be 'recent', 'mixed', or 'popular'
    var params = {
        q: 'Pittsburgh OR PittsburghWeather OR PittsburghTraffic OR PittsburghConstruction',
        result_type: 'mixed',
        lang: 'en'
    };

    try {
        let statuses = await twitterService.search(params);

        let n = statuses.length;

        for (let i = 0; i < n; i++) {
            let retweetId = statuses[i].id_str;

            let success = await twitterService.retweet(retweetId);

            if (success) {
                break;
            }
        }

    } catch(error) {
        console.error(error);
    }
};

(async () => {
    await retweet();

    setInterval(async () => await retweet(), 3600000);
})();