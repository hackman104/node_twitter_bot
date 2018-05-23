const twit = require('twit');
const config = require('./config');

const Twitter = new twit(config);

// define class with methods search (look up tweets) and retweet (for retweeting what we find)
class TwitterService {
    
    // searches based on the parameters passed and returns a promise (allows control of asynchronous execution)
    search(params) {
        return new Promise((resolve, reject) => {
            Twitter.get('search/tweets', params, function(err, data) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(data.statuses);
                }
            });
        });
    }

    // attempts to retweet, promises boolean response based on whether successful or not
    retweet(retweetId) {
        return new Promise((resolve, reject) => {
            Twitter.post('statuses/retweet/:id', {
                id: retweetId
            }, function(err, response) {
                
               if (err) {
                   console.log('Error retweeting: possible duplicate', err);
                   resolve(false);
               }
               else {
                   console.log('Retweeted!');
                   resolve(true);
               }
            });
        })
    }
}

module.exports = TwitterService;