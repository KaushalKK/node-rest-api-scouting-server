var q = require('q');

module.exports = function (dbServer) {
	'use strict';

	var me = {
		/* Input Models */
		teams: require('./teams')(dbServer),
		awards: require('./awards')(dbServer),
		events: require('./events')(dbServer),
		matches: require('./matches')(dbServer)
		
		/* System Management Models */
		// users: require('./users')(dbServer)
	};
	
	me.events.hasOne(me.matches, {
		foreignKey: 'event_code',
		as: 'Event'
	});
	
	me.teams.hasMany(me.matches, {
		foreignKey: 'team_number',
		as: 'Team'
	});
	
	return me;
};