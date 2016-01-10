var q = require('q');

module.exports = function (db, apiDomain) {
	'use strict';
	
	return {
		create: function(details) {
			var deferred = q.defer();

			db.server.context.connect()
			.then(function(connection) {
				return connection.domain.events.create({
					name: details.name,
					week: details.week,
					district: details.isDistrict,
					event_code: details.eventCode,
					location: details.location || ''
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
		
		findByEventCode: function(eventCode) {
			var deferred = q.defer();

			db.server.context.connect()
			.then(function(connection) {
				return connection.domain.events.searchByEventCode(eventCode);
			})
			.then(function(event) {
				deferred.resolve(event);
			})
			.catch(function(err) {
				deferred.reject(err);
			});
			
			return deferred.promise;
		},
		
		registerTeams: function(eventCode, details) {
			var deferred = q.defer();

			db.server.context.connect()
			.then(function(connection) {
				return connection.domain.events.registerTeams(eventCode, details.teams);
			})
			.then(function(eventTeams) {
				deferred.resolve(eventTeams);
			})
			.catch(function(err) {
				deferred.reject(err);
			});
			
			return deferred.promise;
		},
		
		getRegisteredTeams: function(eventCode) {
			var deferred = q.defer();

			db.server.context.connect()
			.then(function(connection) {
				return connection.domain.events.getTeams(eventCode);
			})
			.then(function(teamsAtEvent) {
				deferred.resolve(teamsAtEvent);
			})
			.catch(function(err) {
				deferred.reject(err);
			});

			return deferred.promise;
		},
		
		getMatches: function(eventCode) {
			var deferred = q.defer();

			db.server.context.connect()
			.then(function(connection) {
				return connection.domain.events.getMatches(eventCode);
			})
			.then(function(eventMatches) {
				deferred.resolve(eventMatches);
			})
			.catch(function(err) {
				deferred.reject(err);
			});

			return deferred.promise;
		},
        
        getMatchByNumber: function(eventCode, matchNumber) {
            var deferred = q.defer();

			db.server.context.connect()
			.then(function(connection) {
				return connection.domain.matches.getMatchByNumber(eventCode, matchNumber);
			})
			.then(function(matchAtEvent) {
				deferred.resolve(matchAtEvent);
			})
			.catch(function(err) {
				deferred.reject(err);
			});

			return deferred.promise;
        }
	};
};