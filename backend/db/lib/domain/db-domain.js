module.exports = function(dbContext) {
	'use strict';

	return {
		teams: require('./teams')(dbContext)
	};
};