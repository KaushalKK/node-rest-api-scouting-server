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
	
	/* Team Relationships */
	me.matches.belongsToMany(me.teams, {
		foreignKey: 'match_number',
		through: 'team_matches',
		as: 'teamMatches'
	});
	
	/* Event Relationships */
	me.events.hasMany(me.matches, {
		foreignKey: 'event_code'
	});
	
	me.matches.hasOne(me.events, { constraints: false });

	return me;
};