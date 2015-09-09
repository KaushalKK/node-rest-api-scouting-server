var q = require('q');

module.exports = function (db) {
	'use strict';
	
	return {
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