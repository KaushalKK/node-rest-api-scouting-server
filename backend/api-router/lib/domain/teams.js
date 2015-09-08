var q = require('q');

module.exports = function (db) {
	'use strict';
	
	return {
		search: function(teamNum) {
			q.when()
			.then(function() {
				return db.server.context.connect();
			})
			.then(function(connection) {
console.log(connection.domain.teams);
				return connection.domain.teams.single(teamNum);
			})
			.then(function(resp) {
console.log(resp);
				return resp;
			})
			.catch(function(err) {
console.log(err);
				return err;
			});
		}
	};
};