module.exports = function(dbServer) {
	'use strict';

	return dbServer.define('events',
		dbServer.conventions.newFieldSet([
			{ name: 'week', type: 'integer', allowNull: false },
			{ name: 'code', type: 'string', allowNull: false, unique: true },
			{ name: 'name', type: 'string', allowNull: false },
			{ name: 'location', type: 'string', allowNull: true },
			{ name: 'district', type: 'boolean', allowNull: false }
		]),
		dbServer.conventions.newTable('events')
	);
};