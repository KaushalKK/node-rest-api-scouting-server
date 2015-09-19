module.exports = function(dbServer) {
	'use strict';

	return dbServer.define('teams_matches',
		dbServer.conventions.newFieldSet([
			{ name: 'match_number', type: 'integer', allowNull: false },
			{ name: 'auto_points', type: 'integer', allowNull: false },
			{ name: 'tele_points', type: 'integer', allowNull: false },
			{ name: 'endgame_pts', type: 'integer', allowNull: false },
			{ name: 'total_points', type: 'integer', allowNull: false },
			{ name: 'penalties', type: 'integer', allowNull: false },
			{ name: 'dq', type: 'boolean', allowNull: false }
		]),
		dbServer.conventions.newTable('teams_matches')
	);
};