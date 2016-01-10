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
		},
        
        getMatchByNumber: function(eventCode, matchNumber) {
            var resp = {};

            return record.search({
                'event_code': eventCode,
                'match_number': matchNumber
            })
            .then(function(eventMatch) {
                resp = eventMatch[0];
                return dbDomain.teamsMatches.search({
                    match_uid: resp.id
                });
            })
            .then(function(teamPerformanceInMatch) {
                resp.teams = teamPerformanceInMatch;
                return resp;
            })
            .catch(function(err) {
                return err;
            });
        }
	});
};