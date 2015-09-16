module.exports = function(dbContext) {
	'use strict';

	var me = {};
	
	me.teams = require('./teams')(dbContext, me);
	me.events = require('./events')(dbContext, me);
	me.matches = require('./matches')(dbContext, me);
	me.eventsTeams = require('./eventsTeams')(dbContext, me);
	me.teamsMatches = require('./teamsMatches')(dbContext, me);

	return me;
};