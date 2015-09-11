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
		},
		
		getTeams: function(eventCode) {
			return dbContext.models.eventsTeams.findAll({
				where: {
					'event_code': eventCode
				}
			})
			.then(function(eventTeams) {
				var teams = [];
				eventTeams.forEach(function(teamsAtEvent) {
					teams.push(teamsAtEvent.dataValues.team_number);
				});

				return dbDomain.teams.search({
					'team_number': teams
				});
			})
			.then(function(resp) {
				return resp.dataValues || resp;
			})
			.catch(function(err) {
				return err;
			});
		},
		
		getMatches: function(eventCode) {
			return dbDomain.matches.search({
				'event_code': eventCode
			}, null, null, [['match_number', 'DESC']])
			.then(function(resp) {
				return resp.dataValues || resp;
			})
			.catch(function(err) {
				return err;
			});
		}
	});
};