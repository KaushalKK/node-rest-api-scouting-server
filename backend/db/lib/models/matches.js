module.exports = function(dbServer) {
	'use strict';

	return dbServer.define('matches',
		dbServer.conventions.newFieldSet([
			{ name: 'match_number', type: 'integer', allowNull: false },
			{ name: 'dq', type: 'boolean', allowNull: false },
			{ name: 'auto_points', type: 'integer', allowNull: false },
			{ name: 'tele_points', type: 'integer', allowNull: false },
			{ name: 'endgame_pts', type: 'integer', allowNull: false },
			{ name: 'total_points', type: 'integer', allowNull: false },
			{ name: 'penalties', type: 'integer', allowNull: false },
			{ name: 'team_number', type: 'integer', allowNull: false, 
				references: {
					model: dbServer.models.teams,
					key: 'team_number'
				}
			},
			{ name: 'event_code', type: 'string', allowNull: false, 
				references: {
					model: dbServer.models.events,
					key: 'event_code'
				}
			}
		]),
		dbServer.conventions.newTable('matches')
	);
};