if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

// Twitter App Configuration

module.exports = {
    consumer_key: process.env.CONSUMER_KEY,  
    consumer_secret: process.env.CONSUMER_SECRET,
    access_token: process.env.ACCESS_TOKEN,  
    access_token_secret: process.env.ACCESS_TOKEN_SECRET
  }