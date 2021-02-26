const twit = require('twit');
const ordinal = require('number-to-words');
const express = require('express');
const config = require('./config');
const knex = require('knex');

const app = express();
const T = new twit(config)

const db = knex({
    client: 'pg',
    connection: {
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false
      }
    }
});

let q = 5;
let n = 1;
callNo();
tweetIt();
setInterval(tweetIt, 1800000);

app.get('', (req, res) => {})
app.post('', (req, res) => {})

function callNo(){
    db.select('item').from('counter').then(data => {
        if(true){
            console.log(data[0].item[0]);
            q = data[0].item[0];
        }
   });
}

function tweetIt(){
   const text = {status: `Dormammu, I've come to bargain. This is the ${ordinal.toWordsOrdinal(n)} time.`}
    T.post('statuses/update', text , function(error, tweet, response) {
        if(error){
            console.log(error)
        } else {
            console.log(text);
            console.log('please', q);
        }
    })
    increaseCount();
}

function increaseCount(){
    n++;
}