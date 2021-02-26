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

let q = 0;
let l = 0;

tweetIt();
setInterval(tweetIt, 36000); //1800000

function tweetIt(){

    db.select('item').from('counter').then(data => {
        if(true){
            q = data[0].item[0];
            console.log('received', q);
        }
   });

   console.log('after received from db', q);

   const text = {status: `Dormammu, I've come to bargain. This is the ${ordinal.toWordsOrdinal(q)} time.`}
    T.post('statuses/update', text , function(error, tweet, response) {
        if(error){
            console.log(error)
        } else {
            console.log(text);
            console.log('value tweeted', q);
            increaseCount();
        }
    })
}

function increaseCount(){
    db('counter').where('id', '=', 1).increment('item', 1).then(data => {
        if(true){
            db.select('item').from('counter').then(data => {
                if(true){
                    l = data[0].item[0];
                    console.log('value after increase', l);
                }
           });
        }
    });
}