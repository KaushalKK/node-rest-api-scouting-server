'use strict';

module.export = function(app, db) {
	return {
		teams: require('./teams')(db),
		events: require('./events')(db)
	};
};