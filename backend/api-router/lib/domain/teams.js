var q = require('q');

module.exports = function (db) {
	'use strict';
	
	return {
		create: function(details) {
			var deferred = q.defer();

			db.server.context.connect()
			.then(function(connection) {
				return connection.domain.teams.create({
					name: details.name,
					team_number: details.number
				});
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
		}
	};
};