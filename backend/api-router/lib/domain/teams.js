var q = require('q');

module.exports = function (db) {
	'use strict';
	
	return {
		search: function(teamNum) {
			var ret = [];

			q.when()
			.then(function() {
				return db.server.context.connect();
			})
			.then(function(connection) {
				return connection.domain.teams.search(teamNum);
			})
			.then(function(resp) {
				ret = resp.map(function(team) {
					return team.dataValues || team;
				});

				return ret;
			})
			.catch(function(err) {
				return err;
			});
		}
	};
};