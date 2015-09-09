var q = require('q');

module.exports = function (model, dbContext) {
	'use strict';

	var me = {
		model: model,

		utils: {
			/**
			 * Extends the given object with database record methods.
			 * @param target {object} Object to extend.
			 * @returns {object} Extended object.
			 */
			extend: function (target) {
				var ret = target;

				for (var prop in me) {
					if (me.hasOwnProperty(prop) && prop !== 'utils' && prop !== 'model' && typeof(ret[prop]) === 'undefined') {
						ret[prop] = me[prop];
					}
				}

				return ret;
			}
		},
		
		/**
		 * Returns all matching record.
		 * @param criteria {object} Search criteria.
		 * @param attributes {array=} Optional array to only return certain columns from table
		 * @returns {*|Promise.<Array.<Instance>>} A promise which, when resolves, passes the result of an operation.
		 */
		search: function (criteria, joins, /**array=*/attributes) {
			var effectiveCriteria = {},
				deferred = q.defer(),
				findOpts = {};

			if (criteria) {
				for (var prop in criteria) {
					if (criteria[prop] !== undefined && criteria.hasOwnProperty(prop)) {
						effectiveCriteria[prop] = criteria[prop];
					}
				}
			}

			findOpts.where = effectiveCriteria;
			findOpts.attributes = attributes ?  attributes : [];
			findOpts.include = joins ? joins : [];

			model.findAll(findOpts)
			.then(function (result) {
console.log(result);
				deferred.resolve(
					result.map(function (item) {
						return item.dataValues || item;
					})
				);
			})
			.catch(function(err) {
				deferred.reject(err);	
			});
			
			return deferred.promise;
		},
		
		/**
		 * Returns information about single record.
		 * @param id {number} Category Id.
		 * @returns {*|Promise.<Array.<Instance>>} A promise which, when resolves, passes the result of an operation.
		 */
		single: function (id) {
			var deferred = q.defer();

			model.find({
				where: {
					id: id
				}
			}).then(function (result) {
				deferred.resolve(result.dataValues || result);
			}, deferred.reject);

			return deferred.promise;
		},

		/**
		 * Creates new record.
		 * @param details {object} Record.
		 * @returns {*|Promise.<Array.<Instance>>} A promise which, when resolves, passes the result of an operation.
		 */
		create: function (details) {
			var deferred = q.defer();

			/* Generating unique identifier for a new record. */
			details.id = dbContext.server.Utils.generateUUID();

			model.create(details).then(function (record) {
				deferred.resolve(record.dataValues);
			}, deferred.reject);

			return deferred.promise;
		},

		upsert: function (details) {
			return model.upsert(details)
				.then(function (record) {
					return record.dataValues || record;
				});
		},

		/**
		 * Updates the given record.
		 * @param id {number} Record Id.
		 * @param details {object} Record.
		 * @returns {*|Promise.<Array.<Instance>>} A promise which, when resolves, passes the result of an operation.
		 */
		update: function (id, details) {
			return q.when()
				.then(function () {
					return model.find(id);
				})
				.then(function (result) {
					return result.update(details);
				})
				.then(function (result) {
					return result.dataValues || result;
				});
		},

		/**
		 * Deletes the given record.
		 * @param id {number} Record Id.
		 * @returns {*|Promise.<Array.<Instance>>} A promise which, when resolves, passes the result of an operation.
		 */
		delete: function (id) {
			var deferred = q.defer();

			model.destroy({
				where: {
					id: id
				}
			}).then(function (result) {
				deferred.resolve(result);
			}, deferred.reject);

			return deferred.promise;
		}
	};

	/**
	 * Returns all records.
	 * @returns {*|Promise.<Array.<Instance>>} A promise which, when resolves, passes the result of an operation.
	 */
	me.all = function () {
		return me.search.apply(me, arguments);
	};

	return me;
};