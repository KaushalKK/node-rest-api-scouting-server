module.exports = function(dbServer) {
	'use strict';

	return dbServer.define('matches',
		dbServer.conventions.newFieldSet([
			{ name: 'team', type: 'integer', allowNull: false },
			{ name: 'match_number', type: 'integer', allowNull: false },
			{ name: 'penalties', type: 'integer', allowNull: true },
			{ name: 'auto_points', type: 'integer', allowNull: true },
			{ name: 'tele_points', type: 'integer', allowNull: true },
			{ name: 'endgame_pts', type: 'integer', allowNull: true },
			{ name: 'total_points', type: 'integer', allowNull: true }
		]),
		dbServer.conventions.newTable('matches')
	);
};