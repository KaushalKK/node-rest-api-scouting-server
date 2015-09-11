module.exports = function(dbServer) {
	'use strict';

	return dbServer.define('events',
		dbServer.conventions.newFieldSet([
			{ name: 'week', type: 'integer', allowNull: false },
			{ name: 'event_code', type: 'string', allowNull: false, unique: true, primaryKey: true },
			{ name: 'name', type: 'string', allowNull: false },
			{ name: 'location', type: 'string', allowNull: true },
			{ name: 'district', type: 'boolean', allowNull: false }
		], false),
		dbServer.conventions.newTable('events')
	);
};