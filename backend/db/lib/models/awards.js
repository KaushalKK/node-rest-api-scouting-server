module.exports = function(dbServer) {
	'use strict';

	return dbServer.define('awards',
		dbServer.conventions.newFieldSet([
			{ name: 'name', type: 'string', allowedNull: false },
			{ name: 'winner', type: 'string', allowedNull: true }
		]),
		dbServer.conventions.newTable('awards')
	);
};