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
// let n = db.select('item').from('counter').then(data => {
//     if(true){
//         console.log(data[0].item[0]);
//         q = data[0].item[0];
//         console.log('callNo', q);
//     }
// });




tweetIt();
setInterval(tweetIt, 36000); //1800000

function callNo(){
    db.select('item').from('counter').then(data => {
        if(true){
            console.log(data[0].item[0]);
            q = data[0].item[0];
            console.log('callNo', q);
        }
   });

function tweetIt(){
    callNo();

   const text = {status: `Dormammu, I've come to bargain. This is the ${ordinal.toWordsOrdinal(q)} time.`}
    T.post('statuses/update', text , function(error, tweet, response) {
        if(error){
            console.log(error)
        } else {
            console.log(text);
            console.log('tweetIt', q);
        }
    })
    increaseCount();
}

function increaseCount(){
    db('counter').where('id', '=', 1).increment('item', 1).then(data => {
        if(true){
            console.log('tnx');
        }
    })
    console.log('increaseCount', q);
}