module.exports = function(dbContext) {
	'use strict';

	var me = {};
	
	me.teams = require('./teams')(dbContext, me);
	me.events = require('./events')(dbContext, me);
	me.matches = require('./matches')(dbContext, me);
	
	return me;
};