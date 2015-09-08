var Sequelize = require('sequelize');

module.exports = function(dbConfig) {
	'use strict';

	var options = {
		host: dbConfig.dbHost,
		dialect: dbConfig.dbDialect || 'mysql',
		logging: dbConfig.dbLogging	
	};
	
	var dbServer = new Sequelize(
		dbConfig.dbName,
		dbConfig.dbUser,
		dbConfig.dbPass,
		options
	);
	
	/* Defining conventions used to create tables in this context. */
	dbServer.conventions = {
		/*
			* Returns a database convention description for new field set.
			* @param {Array} fields Fields.
			*/
		newFieldSet: function (fields) {
			var ret = {};

			/* Record Id is always there. */
			ret.id = {
				type: Sequelize.UUID,
				primaryKey: true
			};

			fields.forEach(function (field) {
				var definition = {
					type: Sequelize[field.type.toUpperCase()]
				};

				/* Underscore notation for DB field names. */
				definition.field = field.name.replace(/([a-z][A-Z])/g, function (g) {
					return g[0] + '_' + g[1].toLowerCase();
				});

				if (typeof (field.allowNull) !== 'undefined') {
					definition.allowNull = !!field.allowNull;
				}

				if (typeof (field.unique) !== 'undefined') {
					definition.unique = !!field.unique;
				}

				if (typeof (field.values) !== 'undefined') {
					definition.values = field.values;
				}

				ret[field.name] = definition;
			});

			return ret;
		},

		/*
			* Returns a database convention description for new tables.
			* @param {string} tableName Name of the table.
			*/
		newTable: function (tableName) {
			return {
				underscored: true,
				freezeTableName: true,
				tableName: tableName
			};
		}
	};
	
	dbServer.context = require('./db-context')(dbServer);

	var models = require('./lib/models/db-models')(dbServer);

	return {
		models: models,
		server: dbServer
	};
}