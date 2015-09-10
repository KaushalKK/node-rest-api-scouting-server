module.exports = function (dbContext) {
	'use strict';

	return require('./db-record')(dbContext.models.matches, dbContext);
};