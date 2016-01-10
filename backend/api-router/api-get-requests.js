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
			var error = '';

			if (err.name.indexOf('Sequelize') > -1) {
				error += err.message ? err.message + '.' : '';
				err.errors.forEach(function(errList) {
					error += (error.length > 0 ? ' ' : '') + errList.message + '.';
				});
			} else {
				error = err;
			}
			
			return res.status(400).send({'error': error});
		});
	},
	
	getTeam = function(req, res) {
		processRequest(domain.teams.findByNum(req.params.team), res);
	},
	
	getTeamEventMatches = function(req, res) {
		processRequest(domain.teams.getMatchesByEvent(req.params.team, req.params.event), res);
	},
	
	getTeamEvents = function(req, res) {
		processRequest(domain.teams.getRegisteredEvents(req.params.team), res);
	},
	
	getEvent = function(req, res) {
		processRequest(domain.events.findByEventCode(req.params.event), res);
	},
	
	getEventTeams = function(req, res) {
		processRequest(domain.events.getRegisteredTeams(req.params.event), res);
	},

	getEventAwards = function(req, res) {
		var eventCode = req.params.event;
		console.log('GET Awards for Event ' + eventCode);
		return {'message': 'GET Awards for Event ' + eventCode};
	},
	
	getEventMatches = function(req, res) {
		processRequest(domain.events.getMatches(req.params.event), res);
	},
	
	getEventMatchByNumber = function(req, res) {
		processRequest(domain.events.getMatchByNumber(req.params.event, req.params.match), res);
	};
	
	return {
		/* Team Requests */
		team: getTeam,
		teamEvents: getTeamEvents,
		teamEventMatches: getTeamEventMatches,
		
		/* Event Requests */
		event: getEvent,
		eventTeams: getEventTeams,
		eventAwards: getEventAwards,
		eventMatches: getEventMatches,
		eventMatchByNumber: getEventMatchByNumber
	};
};