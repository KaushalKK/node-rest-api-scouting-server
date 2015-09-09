var q = require('q');

module.exports = function(dbServer) {
	'use strict';

	var context = {
		underlyingContext: dbServer,
		domain: require('./lib/domain/db-domain')(dbServer)
	};

	/* Making it possible for resources to communicate with each other. */
	dbServer.domain = context.domain;

	var me = {
		/**
		 * Opens a connection to the database.
		 * @returns {q.Promise} A promise which, when resolves, passes the connection.
		 */
		connect: function () {
			var deferred = q.defer();

			/* No need to connect, our context is static. */
			deferred.resolve(context);

			return deferred.promise;
		},

		/**
		 * Updates database schema.
		 * @param force {boolean} Value indicating whether to drop existing schema.
		 * @returns {q.Promise} A promise which, when resolves, indicates of schema update.
		 */
		updateSchema: function (force) {
			return me.connect()
			.then(function (connection) {
				return connection.underlyingContext.sync({force: force});
			})
			.catch(function (error) {
				console.log(error);
				return q.reject(error);
			});
		}
	};
	
	return me;
};