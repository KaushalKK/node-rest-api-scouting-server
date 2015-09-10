module.exports = function(dbServer) {
	'use strict';

	return dbServer.define('events',
		dbServer.conventions.newFieldSet([
			{ name: 'week', type: 'integer', allowedNull: false },
			{ name: 'code', type: 'string', allowedNull: false, unique: true },
			{ name: 'name', type: 'string', allowedNull: false },
			{ name: 'location', type: 'string', allowedNull: true },
			{ name: 'district', type: 'boolean', allowedNull: false }
		]),
		dbServer.conventions.newTable('events')
	);
};