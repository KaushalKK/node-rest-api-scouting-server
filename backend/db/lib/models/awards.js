module.exports = function(dbServer) {
	'use strict';

	return dbServer.define('awards',
		dbServer.conventions.newFieldSet([
			{ name: 'name', type: 'string', allowNull: false },
			{ name: 'award_winner', type: 'string', allowNull: true }
		]),
		dbServer.conventions.newTable('awards')
	);
};