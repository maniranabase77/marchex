var express = require('express');
var router = express.Router();
var twilio = require('twilio');
var VoiceResponse = require('twilio').twiml.VoiceResponse;
var dig = require('node-dig');
const knex = require('../db/knex')


router.post('/', async function(req, res, next) {
	
	    var twiml = new VoiceResponse();
		var blockCalls = false;
		//console.log(req.body);

		const addOns = 'AddOns' in req.body && JSON.parse(req.body['AddOns']);
		if (addOns && addOns['status'] === 'successful')
		{ 
			var results = addOns['results'];
			blockCalls = should_be_blocked_by_marchex(results['marchex_cleancall']) ||
			should_be_blocked_by_nomorobo(results['nomorobo_spamscore']) ||
			should_be_blocked_by_whitepages(results['whitepages_pro_phone_rep']);
		}

		if (blockCalls) {
		  twiml.reject();
		} else {
		 // twiml.say('Welcome to the jungle
		 twiml.play({
			loop: 10
		}, 'CleanCalls.mp3');
		  twiml.hangup();
		}
		 
		 //console.log(twiml.toString());		
		res.writeHead(200, {'Content-Type': 'text/xml'});
		//res.end(twiml.toString());

		let resposne_data = results['marchex_cleancall'];
		//console.log(resposne_data.request_sid);
		let request_sid =resposne_data.request_sid;
		//console.log(resposne_data.status);
		let call_status =resposne_data.status;
		//console.log(resposne_data.message);
		let message =resposne_data.message;
		//console.log(resposne_data.code);
		let code =resposne_data.code;
		let result = resposne_data.result 
		//console.log(result.result.recommendation);
		let recommendation =result.result.recommendation;
		//console.log(result.result.reason);
		let reason =result.result.reason;

		try {
			 const rows = await knex('twilio_call').insert({createdAt: knex.fn.now(),requestid:request_sid,message:message,call_status:call_status,reason:reason,recommendation:recommendation,code:code});				
            } catch(e) {
				console.log('Error caught');
			}
				
	
});


		var should_be_blocked_by_nomorobo = function(nomorobo) {
			if (!nomorobo || nomorobo['status'] !== 'successful') {
			  return false;
			}

			return dig(nomorobo, ['result', 'score']) == 1;
		  }

		var should_be_blocked_by_whitepages = function(whitepages) {
			debugger
			if (!whitepages || whitepages['status'] !== 'successful') {
			  return false;
			}

			return whitepages.result.reputation_level >= 4
		  }

		var should_be_blocked_by_marchex = function(marchex) {
			if (!marchex || marchex['status'] !== 'successful') {
			  return false;
			}

			return dig(marchex, ['result', 'result', 'recommendation']) === 'BLOCK';
		  };


module.exports = router;
