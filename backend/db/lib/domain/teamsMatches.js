module.exports = function (dbContext, dbDomain) {
	'use strict';

	var record = require('./db-record')(dbContext.models.teamMatches, dbContext);
    
    return record.utils.extend({
        getEventMatches: function(teamNum, eventCode) {
			return record.search({
                team_number: teamNum,
                event_code: eventCode
            })
            .then(function(teamMatches) {
                return teamMatches;
            })
			.catch(function(err) {
				return err;
			});
		}
    });
};