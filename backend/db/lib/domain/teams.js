module.exports = function (dbContext) {
	'use strict';

	var me = require('./db-record')(dbContext.models.teams, dbContext);
	
	me.utils.extend({
		search: function(teamNum) {
			return dbContext.models.teams.findAll({
				where: {
					number: teamNum
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
	
	return me;
};