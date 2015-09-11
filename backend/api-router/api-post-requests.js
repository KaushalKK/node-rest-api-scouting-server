var q = require('q');

module.exports = function(domain) {
	'use strict';

	var processRequest = function(method, res) {
		q.when()
		.then(function() {
			return method;
		})		
		.then(function(resp) {
			return res.send(resp);
		})
		.catch(function(err) {
			var error = '';

			if (err.name.indexOf('Sequelize') > -1) {
				error += err.message ? err.message + '.' : '';
				err.errors.forEach(function(errList) {
					error += (error.length > 0 ? ' ' : '') + errList.message + '.';
				});
			} else {
				error = err;
			}
			
			return res.status(400).send({'error': error});
		});
	},

	createTeam = function(req, res) {
		processRequest(domain.teams.create(req.body), res);
	},
	
	createEvent = function(req, res) {
		processRequest(domain.events.create(req.body), res);
	},
	
	createEventMatch = function(req, res) {
		processRequest(domain.matches.create(req.params.event, req.body), res);
	};
	
	return {
		/* Team Requests */
		team: createTeam,

		/* Event Requests */
		event: createEvent,
		eventMatch: createEventMatch
	};
};