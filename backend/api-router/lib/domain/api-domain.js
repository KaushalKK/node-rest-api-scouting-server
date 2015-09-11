'use strict';

module.exports = function(db) {
	var me = {};
	
	me.teams = require('./teams')(db, me);
	me.events = require('./events')(db, me);
	me.matches = require('./matches')(db, me);
	
	return me;
};