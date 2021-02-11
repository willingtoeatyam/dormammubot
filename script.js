const twit = require('twit');
const config = require('./config')

const T = new twit(config)

function tweet(text){
    T.post('statuses/update', { status: text }, function(error, tweet, response) {
        if(error){
            console.log(error)
        } else {
            console.log(tweet);
        }
    })
}

setInterval(function () {tweet(`Dormammu, I've come to bargain`); }, 7200000)