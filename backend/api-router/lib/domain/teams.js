var q = require('q');

module.exports = function (db, apiDomain) {
	'use strict';
	
	return {
		create: function(details) {
			var deferred = q.defer();

			db.server.context.connect()
			.then(function(connection) {
				return connection.domain.teams.create({
					name: details.name,
					team_number: details.number
				}, false);
			})
			.then(function(createdTeam) {
				deferred.resolve(createdTeam);
			})
			.catch(function(err) {
				deferred.reject(err);
			});
			
			return deferred.promise;
		},
		
		findByNum: function(teamNum) {
			var deferred = q.defer();

			db.server.context.connect()
			.then(function(connection) {
				return connection.domain.teams.searchByNumber(parseInt(teamNum));
			})
			.then(function(team) {
				deferred.resolve(team);
			})
			.catch(function(err) {
				deferred.reject(err);
			});
			
			return deferred.promise;
		},
		
		getMatchesByEvent: function(teamNum, eventCode) {
			var deferred = q.defer();
			
			db.server.context.connect()
			.then(function(connection) {
				return connection.domain.matches.search({
					event_code: eventCode,
					team_number: parseInt(teamNum)
				});
			})
			.then(function(matches) {
				deferred.resolve(matches);
			})
			.catch(function(err) {
				deferred.reject(err);
			});
			
			return deferred.promise;
		}
	};
};