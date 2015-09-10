var q = require('q');

module.exports = function (db) {
	'use strict';
	
	return {
		create: function(eventCode, details) {
			var deferred = q.defer();
			
			db.server.context.connect()
			.then(function(connection) {
				return connection.domain.matches.create({
					team: details.teamNumber,
					penalties: details.penalties,
					auto_points: details.autoPoints,
					tele_points: details.telePoints,
					match_number: details.matchNumber,
					total_points: details.totalPoints,
					endgame_pts: details.endgamePoints
				});
			})
			.then(function(createdMatch) {
				deferred.resolve(createdMatch);
			})
			.catch(function(err) {
				deferred.reject(err);
			});
			
			return deferred.promise;
		}
	};
};