module.exports = function(dbServer) {
	'use strict';

	return dbServer.define('events_teams',
		dbServer.conventions.newFieldSet([]),
		dbServer.conventions.newTable('events_teams')
	);
};