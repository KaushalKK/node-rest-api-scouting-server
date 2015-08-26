'use strict';

module.export = function(app, config) {
	var db = require('../../db/db-index');
	
	return {
		teams: require('./teams')(db),
		events: require('./events')(db)
	};
};