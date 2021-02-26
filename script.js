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

// let n = 1;
tweetIt();
setInterval(tweetIt, 1800000);

// const handleProfileGet = (req, res, db) =>{
//     const { id } = req.params;
//     db.select('*').from('counter').where({id})
//     .then(user => {
//         if(user.length){
//             res.json(user[0])
//         } else {
//             res.status(400).json('Not found')
//         }
//     })
//     .catch(err => res.status(400).json('error getting user'))
// }

app.get('', (req, res) => {})
app.post('', (req, res) => {})

function tweetIt(){
    db.select('item').from('counter').then(data => {
        console.log('CDQ yeah yeah', data[0]);
   });
    let n = data;
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