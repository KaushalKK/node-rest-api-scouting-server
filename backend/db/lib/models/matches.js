module.exports = function(dbServer) {
	'use strict';

	return dbServer.define('matches',
		dbServer.conventions.newFieldSet([
			{ name: 'number', type: 'integer', allowedNull: false },
			{ name: 'red_final', type: 'integer', allowedNull: false },
			{ name: 'blue_final', type: 'integer', allowedNull: false },
			{ name: 'red_penalty', type: 'integer', allowedNull: false },
			{ name: 'blue_penalty', type: 'integer', allowedNull: false },
			
			{ name: 'red_one', type: 'integer', allowedNull: false },
			{ name: 'red_one_score', type: 'integer', allowedNull: true },
			{ name: 'red_one_penalty', type: 'integer', allowedNull: true },
			
			{ name: 'red_two', type: 'integer', allowedNull: false },
			{ name: 'red_two_score', type: 'integer', allowedNull: true },
			{ name: 'red_two_penalty', type: 'integer', allowedNull: true },
			
			{ name: 'red_three', type: 'integer', allowedNull: false },
			{ name: 'red_three_score', type: 'integer', allowedNull: true },
			{ name: 'red_three_penalty', type: 'integer', allowedNull: true },
			
			{ name: 'blue_one', type: 'integer', allowedNull: false },
			{ name: 'blue_one_score', type: 'integer', allowedNull: true },
			{ name: 'blue_one_penalty', type: 'integer', allowedNull: true },
			
			{ name: 'blue_two', type: 'integer', allowedNull: false },
			{ name: 'blue_two_score', type: 'integer', allowedNull: true },
			{ name: 'blue_two_penalty', type: 'integer', allowedNull: true },
			
			{ name: 'blue_three', type: 'integer', allowedNull: false },
			{ name: 'blue_three_score', type: 'integer', allowedNull: true },
			{ name: 'blue_three_penalty', type: 'integer', allowedNull: true }
		]),
		dbServer.conventions.newTable('matches')
	);
};