'use strict';

module.exports = function(dbServer) {
	return dbServer.define('teams',
		dbServer.conventions.newFieldSet([
			{ name: 'name', type: 'string', allowedNull: true },
			{ name: 'number', type: 'integer', allowedNull: false }
		]),
		dbServer.conventions.newTable('team')
	);
};