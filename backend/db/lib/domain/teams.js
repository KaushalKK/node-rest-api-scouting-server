module.exports = function (dbContext, dbDomain) {
	'use strict';

	var record = require('./db-record')(dbContext.models.teams, dbContext);
	
	return record.utils.extend({
		searchByNumber: function(teamNum) {
			return dbContext.models.teams.findOne({
				where: {
					'team_number': teamNum
				}
			})
			.then(function(resp) {
				return resp.dataValues || resp;
			})
			.catch(function(err) {
				return err;
			});
		},
		
		getEvents: function(teamNum) {
			return dbContext.models.eventsTeams.findAll({
				where: {
					'team_number': teamNum
				}
			})
			.then(function(teamEvents) {
				var events = [];
				teamEvents.forEach(function(eventForTeam) {
					events.push(eventForTeam.dataValues.event_code);
				});

				return dbDomain.events.search({
					'event_code': events
				});
			})
			.then(function(resp) {
				return resp.dataValues || resp;
			})
			.catch(function(err) {
				return err;
			});
		},
		
		getEventMatches: function(teamNum, eventCode) {
			return dbDomain.matches.search({
				'team_number': teamNum,
				'event_code': eventCode
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