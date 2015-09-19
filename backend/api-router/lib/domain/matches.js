var q = require('q');

module.exports = function (db, apiDomain) {
	'use strict';
	
	return {
		create: function(eventCode, details) {
			var deferred = q.defer(),
				c = null;
			
			db.server.context.connect()
			.then(function(connection) {
				var c = connection;
				return c.domain.matches.search({
					event_code: eventCode,
					match_number: details.matchNumber
				});
			})
			.then(function(match) {
				return c.domain.matches.upsert({
					id: match.id,
					event_code: eventCode,
					match_number: details.matchNumber,
					red_score: details.redFinal || match.red_score,
					red_penalties: details.redPenalties || match.red_penalties,
					blue_score: details.blueFinal || match.blue_score,
					blue_penalties: details.bluePenalties || match.blue_penalties
				});
			})
			.then(function(createdMatch) {
				c.domain.teamsMatches.create({
					dq: details.dq || false,
					match_uid: createdMatch.id,
					team_number: details.teamNumber,
					penalties: details.penalties || 0,
					auto_points: details.autoPoints || 0,
					tele_points: details.telePoints || 0,
					total_points: details.totalPoints || 0,
					endgame_pts: details.endgamePoints || 0
				});
			})
			.then(function(createdMatch) {
				deferred.resolve(createdMatch);
			})
			.catch(function(err) {
				deferred.reject(err);
			});
			
			return deferred.promise;
		},
		
		fillEventSchedule: function(eventCode, details) {
			var deferred = q.defer();
			
			db.server.context.connect()
			.then(function(connection) {
				return connection.domain.matches.createSchedule(eventCode, details.totalMatches);
			})
			.then(function(matchesAtEvent) {
				deferred.resolve(matchesAtEvent);
			})
			.catch(function(err) {
				deferred.reject(err);
			});
			
			return deferred.promise;
		} 
	};
};