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
				
			})
			.then(function(createdMatch) {
                var autoTotal = (details.autoHigh + details.autoBreach) * 10 + details.autoLow * 5 + details.autoReach * 2,
                    teleTotal = (details.crossTotal + details.teleHigh) * 5 + details.teleLow * 2,
                    endTotal = details.scaled * 15 + details.challenged * 5;

				c.domain.teamsMatches.create({
					match_uid: createdMatch.id,
					team_number: details.teamNumber,
					match_number: createdMatch.matchNumber,
                    
                    auto_high: details.autoHigh || 0,
			        auto_low: details.autoLow || 0,
			        auto_points: autoTotal || 0,
		            outer_works_breach: details.autoBreach || 0,
			        outer_works_category: details.autoBreachCategory || '',
			        outer_works_reach: details.autoReach || 0,
                    /* Tele Op Columns */
                    boulder_pickup: details.telePickup || 0,
                    scoring_angle: details.scoringAngle || 'none',
                    scoring_range: details.scoringRange || 'none',
                    tele_high: details.teleHigh || 0,
                    tele_low: details.teleLow || 0,
                    /* Tele Op Outerworks Columns */
                    outerworks_A: details.categoryA || false,
                    outerworks_A_count: details.categoryA ? details.categoryACount : 0,
                    outerworks_B: details.categoryB || false,
                    outerworks_B_count: details.categoryB ? details.categoryBCount : 0,
                    outerworks_C: details.categoryC || false,
                    outerworks_C_count: details.categoryC ? details.categoryCCount : 0,
                    outerworks_D: details.categoryD || false,
                    outerworks_D_count: details.categoryD ? details.categoryDCount : 0,
                    outerworks_E: details.categoryE || false,
                    outerworks_E_count: details.categoryE ? details.categoryECount : 0,
                    /* Tele Op Score Columns */
                    tele_points: teleTotal,
                    /* End Game Columns */
                    challenge: details.challenged || 0,
                    scale: details. scaled|| 0,
                    endgame_pts: endTotal,
                    /* Penalty Columns */
                    dq: details.dq || false,
                    fouls: details.fouls || 0,
                    tech_fouls: details.techFouls || 0,
                    /* End Match Columns */
                    bonus_breach: details.breached || 0,
                    bonus_capture: details.captured || 0,
                    comments: details.comments || '',
                    result: details.result || 'loss',
                    total_points: autoTotal + teleTotal + endTotal
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