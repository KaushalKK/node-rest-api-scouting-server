'use strict';

var q = require('q');

module.exports = function (app, domain) {
	
	var getRequests = require('./api-get-requests')(domain);
	var postRequests = require('./api-post-requests')(domain);
	
	return {
		/**
		 * Configures API routes.
		 */
		configureRoutes: function () {
			var routePrefix = '/api/scouting';
			
			/* Team Requests */
			app.get(routePrefix + '/team/:team', getRequests.team);
			app.get(routePrefix + '/team/:team/events', getRequests.teamEvents);
			app.get(routePrefix + '/team/:team/:event/matches', getRequests.teamEventMatches);
			
			app.post(routePrefix + '/team', postRequests.team);
			
			/* Event Specific Requests */
			app.get(routePrefix + '/event/:event', getRequests.event);
			app.get(routePrefix + '/event/:event/teams', getRequests.eventTeams);
			app.get(routePrefix + '/event/:event/awards', getRequests.eventAwards);
			app.get(routePrefix + '/event/:event/matches', getRequests.eventMatches);
			app.get(routePrefix + '/event/:event/matches/:match', getRequests.eventMatchByNumber);

			app.post(routePrefix + '/event', postRequests.event);
			app.post(routePrefix + '/event/:event/match', postRequests.eventMatch);
			app.post(routePrefix + '/event/:event/teams', postRequests.registerTeams);
		}
	};
};