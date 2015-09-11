var q = require('q');

module.exports = function (dbServer) {
	'use strict';

	var me = {
		/* Input Models */
		teams: require('./teams')(dbServer),
		awards: require('./awards')(dbServer),
		events: require('./events')(dbServer),
		matches: require('./matches')(dbServer),

		/* Join Models */
		eventsTeams: require('./eventsTeams')(dbServer)

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
	
	me.teams.belongsToMany(me.events, {
		through: me.eventsTeams,
		foreignKey: 'team_number'
	});

	me.events.belongsToMany(me.teams, {
		through: me.eventsTeams,
		foreignKey: 'event_code'
	});

	return me;
};