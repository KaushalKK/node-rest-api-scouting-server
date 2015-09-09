module.exports = function (dbContext) {
	'use strict';

	var record = require('./db-record')(dbContext.models.teams, dbContext);
	
	return record.utils.extend({
		searchByNumber: function(teamNum) {
			return dbContext.models.teams.findOne({
				where: {
					'number': teamNum
				}
			})
			.then(function(resp) {
				return resp.dataValues || resp;
			})
			.catch(function(err) {
				return err;
			});
		}
	});
};