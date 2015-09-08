module.exports = function (dbContext) {
	'use strict';

	return require('./db-record')(dbContext.models.teams, dbContext);
};