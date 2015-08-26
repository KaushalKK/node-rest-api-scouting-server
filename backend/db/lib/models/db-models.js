'use strict';

var q = require('q');

module.exports = function (dbServer) {
	var me = {
		/* Input Models */
		teams: require('./teams')(dbServer),
		awards: require('./awards')(dbServer),
		events: require('./events')(dbServer),
		matches: require('./matches')(dbServer),
		
		/* System Management Models */
		users: require('./users')(dbServer)
	};
	
	/* Team Relationships */
	me.teams.hasMany(me.awards, {
		foreignKey: 'award_name',
		as: 'award'
	});
	
	me.teams.hasMany(me.events, {
		foreignKey: 'event_code',
		as: 'event'
	});
	
	me.teams.hasMany(me.matches, {
		foreignKey: 'match_number',
		as: 'match'
	});
	
	return me;
};