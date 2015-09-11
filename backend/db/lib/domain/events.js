module.exports = function (dbContext) {
	'use strict';

	var record = require('./db-record')(dbContext.models.events, dbContext);
	
	return record.utils.extend({
		searchByEventCode: function(eventCode) {
			return dbContext.models.events.findOne({
				where: {
					'event_code': eventCode
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