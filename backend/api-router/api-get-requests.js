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
		console.log('GET Team ' + req.params.team);
		processRequest(domain.teams.findByNum(req.params.team), res);
	},
	
	getTeamEventMatches = function(req, res) {
		console.log('GET Matches for Team ' + req.params.team + ' at Event ' + req.params.event);
		processRequest(domain.teams.getMatchesByEvent(req.params.team, req.params.event), res);
	},
	
	getEvent = function(req, res) {
		console.log('GET Event ' + req.params.event);
		processRequest(domain.events.findByEventCode(req.params.event), res);
	},
	
	getEventTeams = function(req, res) {
		var eventCode = req.params.event;
		console.log('GET Teams for Event ' + eventCode);
		return {'message': 'GET Teams for Event ' + eventCode};
	},
	
	getEventAwards = function(req, res) {
		var eventCode = req.params.event;
		console.log('GET Awards for Event ' + eventCode);
		return {'message': 'GET Awards for Event ' + eventCode};
	},
	
	getEventMatches = function(req, res) {
		var eventCode = req.params.event;
		console.log('GET Matches for Event: ' + eventCode);
		return {'message': 'GET Matches for Event: ' + eventCode};
	},
	
	getEventMatchByNumber = function(req, res) {
		var eventCode = req.params.event;
		var matchNum = req.params.match;
		console.log('GET Match ' + matchNum + ' for Event ' + eventCode);
		return {'message': 'GET Match ' + matchNum + ' for Event ' + eventCode};
	};
	
	return {
		/* Team Requests */
		team: getTeam,
		teamEventMatches: getTeamEventMatches,
		
		/* Event Requests */
		event: getEvent,
		eventTeams: getEventTeams,
		eventAwards: getEventAwards,
		eventMatches: getEventMatches,
		eventMatchByNumber: getEventMatchByNumber
	};
};