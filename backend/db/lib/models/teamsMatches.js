module.exports = function(dbServer) {
	'use strict';

	return dbServer.define('teams_matches',
		dbServer.conventions.newFieldSet([
			/* General Match Columns */
            { name: 'match_number', type: 'integer', allowNull: false },
            /* Auto Columns */
			{ name: 'auto_high', type: 'boolean', allowNull: false },
			{ name: 'auto_low', type: 'boolean', allowNull: false },
			{ name: 'auto_points', type: 'integer', allowNull: false },
			{ name: 'outer_works_breach', type: 'boolean', allowNull: false },
			{ name: 'outer_works_category', type: 'string', allowNull: false },
			{ name: 'outer_works_reach', type: 'boolean', allowNull: false },
            /* Tele Op Columns */
			{ name: 'boulder_pickup', type: 'integer', allowNull: false },
			{ name: 'scoring_angle', type: 'string', allowNull: false },
			{ name: 'scoring_range', type: 'string', allowNull: false },
			{ name: 'tele_high', type: 'integer', allowNull: false },
			{ name: 'tele_low', type: 'integer', allowNull: false },
            /* Tele Op Outerworks Columns */
			{ name: 'outerworks_A', type: 'boolean', allowNull: false },
			{ name: 'outerworks_A_count', type: 'integer', allowNull: false },
			{ name: 'outerworks_B', type: 'boolean', allowNull: false },
			{ name: 'outerworks_B_count', type: 'integer', allowNull: false },
			{ name: 'outerworks_C', type: 'boolean', allowNull: false },
			{ name: 'outerworks_C_count', type: 'integer', allowNull: false },
			{ name: 'outerworks_D', type: 'boolean', allowNull: false },
			{ name: 'outerworks_D_count', type: 'integer', allowNull: false },
			{ name: 'outerworks_E', type: 'boolean', allowNull: false },
			{ name: 'outerworks_E_count', type: 'integer', allowNull: false },
			/* Tele Op Score Columns */
            { name: 'tele_points', type: 'integer', allowNull: false },
			/* End Game Columns */
            { name: 'challenge', type: 'boolean', allowNull: false },
			{ name: 'scale', type: 'boolean', allowNull: false },
			{ name: 'endgame_pts', type: 'integer', allowNull: false },
            /* Penalty Columns */
			{ name: 'dq', type: 'boolean', allowNull: false },
            { name: 'fouls', type: 'integer', allowNull: false },
			{ name: 'tech_fouls', type: 'integer', allowNull: false },
            /* End Match Columns */
			{ name: 'bonus_breach', type: 'boolean', allowNull: false },
			{ name: 'bonus_capture', type: 'boolean', allowNull: false },
			{ name: 'comments', type: 'string' },
			{ name: 'result', type: 'string', allowNull: false },
			{ name: 'total_points', type: 'integer', allowNull: false }
		]),
		dbServer.conventions.newTable('teams_matches')
	);
};