'use strict';

var q = require('q');

module.exports = function (app, config, domain) {
	var processRequest = function(method, res) {
		q.when()
		.then(function() {
			return method;
		})		
		.then(function(resp) {
			return res.send(resp);
		})
		.catch(function(err) {
			return res.sendStatus(400);	
		});
	};
	
	var getTeam = function(req, res) {
		processRequest(domain.teams.findByNum(req.params.team), res);
	},
	
	getTeamMatches = function(req, res) {
		var teamNum = req.params.team;
		console.log('Team: ' + teamNum + ' Matches requested');
		return res.send({'message': 'Team: ' + teamNum + ' Matches requested'});
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
	};
	
	return {
		/**
		 * Configures API routes.
		 */
		configureRoutes: function () {
			var routePrefix = '/api/scouting';
			
			/* Team Requests */
			app.get(routePrefix + '/:team', getTeam);
			app.get(routePrefix + '/:team/matches', getTeamMatches);
			
			/* Event Specific Requests */
			app.get(routePrefix + '/:event/teams', getEventTeams);
			app.get(routePrefix + '/:event/awards', getEventAwards);
			app.get(routePrefix + '/:event/matches', getEventMatches);
		}
	};
};