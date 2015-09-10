var q = require('q');

module.exports = function(domain) {
	'use strict';

	var processRequest = function(method, res) {
		q.when()
		.then(function() {
			return method;
		})		
		.then(function(resp) {
			return res.send(resp);
		})
		.catch(function(err) {
			return res.status(400).send(err);
		});
	},
	
	createTeam = function(req, res) {
		processRequest(domain.teams.create(req.body), res);
	},
	
	createEvent = function(req, res) {
		processRequest(domain.events.create(req.body), res);
	},
	
	createEventMatch = function(req, res) {
		var teamNum = req.params.team;
		console.log('Team: ' + teamNum + ' Matches requested');
		return res.send({'message': 'Team: ' + teamNum + ' Matches requested'});
	};
	
	return {
		/* Team Requests */
		team: createTeam,

		/* Event Requests */
		event: createEvent,
		eventMatch: createEventMatch
	};
};