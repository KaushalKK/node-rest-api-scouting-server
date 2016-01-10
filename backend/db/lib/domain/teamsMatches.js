module.exports = function (dbContext, dbDomain) {
	'use strict';

	return require('./db-record')(dbContext.models.teamMatches, dbContext);
};