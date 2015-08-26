'use strict';

var q = require('q');

module.exports = function (app, config) {
	
	var domain = require('./lib/domain/api-domain');
	
	var getTeam = function(req, res) {
		domain.teams.single(req.params.team);
		return {'message': 'Team: ' + req.params.team};
	},
	
	getTeamMatches = function(req, res) {
		return {'message': 'Team: ' + req.params.team + ' Matches requested'};
	},
	
	getEventTeams = function(req, res) {
		return {'message': 'Event: ' + req.params.event + ' Teams requested'};
	},
	
	getEventAwards = function(req, res) {
		return {'message': 'Event: ' + req.params.event + ' Awards requested'};
	},
	
	getEventMatches = function(req, res) {
		return {'message': 'Event: ' + req.params.event + ' Matches requested'};
	};
	
	return {
		/**
		 * Configures API routes.
		 */
		configureRoutes: function () {
			var routePrefix = '/api/catalog';
			
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