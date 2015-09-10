var q = require('q');

module.exports = function (db) {
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
		
		findByEventCode: function(eventCode) {
			var deferred = q.defer();

			db.server.context.connect()
			.then(function(connection) {
				return connection.domain.events.searchByEventCode(eventCode);
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