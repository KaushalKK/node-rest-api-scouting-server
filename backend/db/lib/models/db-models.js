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
		eventsTeams: require('./eventsTeams')(dbServer),
		teamMatches: require('./teamsMatches')(dbServer)

		/* System Management Models */
		// users: require('./users')(dbServer)
	};
	
	me.events.hasOne(me.matches, {
		foreignKey: 'event_code',
		as: 'Event'
	});
	
	me.teams.belongsToMany(me.events, {
		through: me.eventsTeams,
		foreignKey: 'team_number'
	});

	me.events.belongsToMany(me.teams, {
		through: me.eventsTeams,
		foreignKey: 'event_code'
	});
	
	me.teams.belongsToMany(me.matches, {
		through: me.teamMatches,
		foreignKey: 'team_number'
	});

	me.matches.belongsToMany(me.teams, {
		through: me.teamMatches,
		foreignKey: 'match_uid'
	});
    
    me.events.hasOne(me.teamMatches, {
		foreignKey: 'event_code',
		as: 'Event'
	});

	return me;
};