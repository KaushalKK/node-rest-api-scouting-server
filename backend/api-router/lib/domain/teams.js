var q = require('q');

module.exports = function (db) {
	'use strict';
	
	return {
		search: function(teamNumOrName) {
			var searchOptions = {
				where: {}
			};
			
			var teamNum = parseInt(teamNumOrName);
			searchOptions.where = (teamNum !== NaN) ? { 'number': teamNum } : { name: teamNumOrName }; 
console.log(searchOptions);
			q.when()
			.then(function() {
				return db.server.context.connect();
			})
			.then(function(connection) {
				return connection.domain.teams.search(searchOptions);
			})
			.then(function(resp) {
console.log(resp);
				return resp;
			})
			.catch(function(err) {
				return err;
			});
		}
	};
};