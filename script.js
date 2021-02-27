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

let q = 1;

botWork();
setInterval(botWork, 60000); //1800000

function botWork(){
    db('counter').where({id: '1'}).select('item').then(data => {
        if(data[0].item == q){
            let p = data;
            console.log('knex fixed', p[0].item);
            tweetIt();
        }
    });

    db.select('item').from('counter').then(data => {
        if(true){
            q = data[0].item;
            console.log('received', q);
        }
   });

   console.log('after received from db', q);

   function tweetIt(){
        const text = {status: `Dormammu, I've come to bargain. This is the ${ordinal.toWordsOrdinal(q)} time.`}
        T.post('statuses/update', text , function(error, tweet, response) {
            if(error){
                console.log(error)
            } else {
                console.log(text);
                console.log('value tweeted', q);
                db('counter').where('id', '=', 1).increment('item', 1).then(data => {
                    let c = data[0].item;
                    console.log('value after increase', c);
                })   
            }
        })
    }
}

function increaseCount(){
    db.select('item').from('counter').then(data => {
        if(data[0].item == q){
            let l = data[0].item;
            console.log('value before increase', l);
        }
    });
}
