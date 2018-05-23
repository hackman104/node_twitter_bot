This is as basic twitter bot that will allow you to retweet items basic on a search string. It is based on the walkthrough found here:
https://hackernoon.com/create-a-simple-twitter-bot-with-node-js-5b14eb006c08

N. B. The file "config.js" has been excluded for security reasons. If you wish to run this program, you must create this file in the base project directory, and format it as follows:

//config.js
/** TWITTER APP CONFIGURATION
 * consumer_key
 * consumer_secret
 * access_token
 * access_token_secret
 */

module.exports = {
    consumer_key: '',  
    consumer_secret: '',
    access_token: '',  
    access_token_secret: ''
  }

Fill in the quotes with your app information for twitter.