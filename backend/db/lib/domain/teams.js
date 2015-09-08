module.exports = function (dbContext) {
	'use strict';

	var record = require('./db-record')(dbContext.models.teams, dbContext);
	
	return record.utils.extend({
		search: function(teamNum) {
			return dbContext.models.teams.findAll({
				where: {
					'number': teamNum
				}
			})
			.then(function(resp) {
				return resp;
			})
			.catch(function(err) {
				return err;
			});
		}
	});
};