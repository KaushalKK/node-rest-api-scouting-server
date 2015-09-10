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
			var error = err.name.indexOf('sequelize') > -1 ? err.errors[0].message : err ;
			return res.status(400).send(error);
		});
	},
	
	createTeam = function(req, res) {
		processRequest(domain.teams.create(req.body), res);
	},
	
	createEvent = function(req, res) {
		processRequest(domain.events.create(req.body), res);
	},
	
	createEventMatch = function(req, res) {
		processRequest(domain.matches.create(req.params.event, req.body), res);
	};
	
	return {
		/* Team Requests */
		team: createTeam,

		/* Event Requests */
		event: createEvent,
		eventMatch: createEventMatch
	};
};