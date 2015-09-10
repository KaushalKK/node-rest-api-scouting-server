module.exports = function(dbServer) {
	'use strict';

	return dbServer.define('matches',
		dbServer.conventions.newFieldSet([
			{ name: 'team', type: 'integer', allowedNull: false },
			{ name: 'number', type: 'integer', allowedNull: false },
			{ name: 'penalties', type: 'integer', allowedNull: true },
			{ name: 'auto_points', type: 'integer', allowedNull: true },
			{ name: 'tele_points', type: 'integer', allowedNull: true },
			{ name: 'endgame_pts', type: 'integer', allowedNull: true },
			{ name: 'total_points', type: 'integer', allowedNull: true }
		]),
		dbServer.conventions.newTable('matches')
	);
};