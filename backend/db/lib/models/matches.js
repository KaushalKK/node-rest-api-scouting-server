module.exports = function(dbServer) {
	'use strict';

	return dbServer.define('matches',
		dbServer.conventions.newFieldSet([
			{ name: 'match_number', type: 'integer', allowNull: false },
			{ name: 'red_score', type: 'integer', allowNull: false },
			{ name: 'red_penalties', type: 'integer', allowNull: false },
			{ name: 'blue_score', type: 'integer', allowNull: false },
			{ name: 'blue_penalties', type: 'integer', allowNull: false }
		]),
		dbServer.conventions.newTable('matches')
	);
};