const twit = require('twit');
const ordinal = require('number-to-words');
const config = require('./config')

const T = new twit(config)
let n = 1;
tweetIt();
setInterval(tweetIt, 1800000);

function tweetIt(){
    
    const text = {status: `Dormammu, I've come to bargain. This is the ${ordinal.toWordsOrdinal(n)} time.`}

    T.post('statuses/update', text , function(error, tweet, response) {
        if(error){
            console.log(error)
        } else {
            console.log(text);
        }
    })
    increaseCount();
}

function increaseCount(){
    n++;
}