'use strict';

module.exports = function(db) {
	return {
		teams: require('./teams')(db),
		events: require('./events')(db),
		matches: require('./matches')(db)
	};
};