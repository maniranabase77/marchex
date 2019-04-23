var express = require('express');
var twilio = require('twilio');
var VoiceResponse = require('twilio').twiml.VoiceResponse;
var dig = require('node-dig');

var router = express.Router();
const accountSid = 'AC8b4f5b72f511f0263398909b26739121';
const authToken = 'f9aaf94c942c89549d67f1f127f43f96';
const client = require('twilio')(accountSid, authToken);
var knex = require('../db/knex');
/* GET home page. */


router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.post('/',  function(req, res, next) {
 
   
    client.calls.create({
    url: 'http://demo.twilio.com/docs/voice.xml',
    to: '+18587925000',
    from: '+14159935276',
  }).then(call => process.stdout.write(call.sid));
  

   
 
});




const routes = [
  'contacts',
  'users',
  'twilio_spam_call',
]

module.exports = (app) => {
  app.use('/', router);
  for (let routeName of routes) {
    const route = require(`./${routeName}`)
    app.use(`/${routeName}`, route)
  }
}