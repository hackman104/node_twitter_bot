const twit = require('twit');
const config = require('./config');

const Twitter = new twit(config);

class TwitterService {
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

    retweet(retweetId) {
        return new Promise((resolve, reject) => {
            Twitter.post('statuses/retweet/:id', {
                id: retweetId
            }, function(err, response) {
                
               if (err) {
                   resolve(false);
               }
               else {
                   resolve(true);
               }
            });
        })
    }
}

module.exports = TwitterService;