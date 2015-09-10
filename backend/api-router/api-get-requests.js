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
	
	getTeam = function(req, res) {
		console.log('Team: ' + req.params.team + ' requested');
		processRequest(domain.teams.findByNum(req.params.team), res);
	},
	
	getTeamMatches = function(req, res) {
		var teamNum = req.params.team;
		console.log('Team: ' + teamNum + ' Matches requested');
		return res.send({'message': 'Team: ' + teamNum + ' Matches requested'});
	},
	
	getEvent = function(req, res) {
		console.log('Event: ' + req.params.event + ' requested');
		processRequest(domain.events.findByEventCode(req.params.event), res);
	},
	
	getEventTeams = function(req, res) {
		var eventCode = req.params.event;
		console.log('Event: ' + eventCode + ' Teams requested');
		return {'message': 'Event: ' + eventCode + ' Teams requested'};
	},
	
	getEventAwards = function(req, res) {
		var eventCode = req.params.event;
		console.log('Event: ' + eventCode + ' Awards requested');
		return {'message': 'Event: ' + eventCode + ' Awards requested'};
	},
	
	getEventMatches = function(req, res) {
		var eventCode = req.params.event;
		console.log('Event: ' + eventCode + ' Matches requested');
		return {'message': 'Event: ' + eventCode + ' Matches requested'};
	},
	
	getEventMatchByNumber = function(req, res) {
		var eventCode = req.params.event;
		var matchNum = req.params.match;
		console.log('Event: ' + eventCode + ' Match: ' + matchNum + ' requested');
		return {'message': 'Event: ' + eventCode + ' Match: ' + matchNum + ' requested'};
	};
	
	return {
		/* Team Requests */
		team: getTeam,
		teamMatches: getTeamMatches,
		
		/* Event Requests */
		event: getEvent,
		eventTeams: getEventTeams,
		eventAwards: getEventAwards,
		eventMatches: getEventMatches,
		eventMatchByNumber: getEventMatchByNumber
	};
};