const twit = require('twit');
const ordinal = require('number-to-words');
const config = require('./config');
const knex = require('knex');

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

let count = 1;

botActivity();
setInterval(botActivity, 1800000); //30 minutes

function botActivity(){
    db('counter').where({id: '1'}).select('item').then(data => {
        if(true){
            count = data[0].item;
            console.log(count, 'read from database');
            tweetIt();
        }
    });

   function tweetIt(){
        const text = {status: `Dormammu, I've come to bargain. This is the ${ordinal.toWordsOrdinal(count)} time.`}
        T.post('statuses/update', text , function(error, tweet, response) {
            if(error){
                console.log(error)
            } else {
                console.log(text);
                console.log('value tweeted', count);
                db('counter').where('id', '=', 1).increment('item', 1).then(data => {
                    console.log('succesfully increased by 1');
                })   
            }
        })
    }


}