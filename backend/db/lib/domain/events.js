module.exports = function (dbContext, dbDomain) {
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
		},
		
		registerTeams: function(eventCode, teams) {
			var teamsToAdd = [];
			teams.forEach(function(team) {
				teamsToAdd.push({
					'team_number': team,
					'event_code': eventCode
				});
			});
			
			return dbContext.models.eventsTeams.bulkCreate(teamsToAdd)
			.then(function(resp) {
				return resp.dataValues || resp;
			})
			.catch(function(err) {
				return err;
			});
		}
	});
};