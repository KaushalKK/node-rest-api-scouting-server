module.exports = function (dbContext, dbDomain) {
	'use strict';

	var record = require('./db-record')(dbContext.models.matches, dbContext);
	
	return record.utils.extend({
		createSchedule: function(eventCode, totalMatches) {
			var matchesInSchedule = [];

			for(var i = 1; i <= totalMatches; i++) {
				matchesInSchedule.push({
					'event_code': eventCode,
					'match_number': i,
					'red_score': 0,
					'red_penalties': 0,
					'blue_score': 0,
					'blue_penalties': 0
				});
			}
			
			return dbContext.models.matches.bulkCreate(matchesInSchedule)
			.then(function(resp) {
				return resp.dataValues || resp;
			})
			.catch(function(err) {
				return err;
			});
		}
	});
};