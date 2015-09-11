var q = require('q');

module.exports = function (dbServer) {
	'use strict';

	var me = {
		/* Input Models */
		teams: require('./teams')(dbServer),
		awards: require('./awards')(dbServer),
		events: require('./events')(dbServer),
		matches: require('./matches')(dbServer)
		
		/* System Management Models */
		// users: require('./users')(dbServer)
	};
	
	return me;
};