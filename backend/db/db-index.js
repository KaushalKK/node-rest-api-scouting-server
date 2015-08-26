'use strict';
var Sequelize = require('sequelize');

module.export = function(dbConfig) {
	var options = {
		host: dbConfig.host,
		dialect: dbConfig.dialect || 'mysql',
		logging: dbConfig.logging	
	};
	
	var dbServer = new Sequelize(
		dbConfig.dbName,
		dbConfig.username,
		dbConfig.password,
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

	return {
		server: dbServer,
		models: require('./lib/models/db-models')(dbServer)
	};
};