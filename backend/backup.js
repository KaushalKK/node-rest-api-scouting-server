var sequelize = require('sequelize');
var q = require('q');

module.exports = function(app) {
  'use strict';

  var sequelDB = new sequelize('tddb', 'root', 'report', {
    host: 'localhost',
    dialect: 'mysql',

    pool: {
      max: 5,
      min: 0,
      idle: 10000
    }
  });

  var Project = sequelDB.define('Project', {
    idproject: {
      type: sequelize.INTEGER(11),
      primaryKey: true,
      autoIncrement: true
    },
    projectname: sequelize.STRING(70),
    it: sequelize.STRING(45),
    cc: sequelize.STRING(45),
    description: sequelize.TEXT('long'),
    idlob: sequelize.INTEGER(11),
    idportfolio: sequelize.INTEGER(11),
    idtier: sequelize.INTEGER(11),
    budget: sequelize.DECIMAL(15, 2),
    idphase: sequelize.INTEGER(11),
    target: sequelize.DATE,
    idstatus: sequelize.INTEGER(11),
    mpr: sequelize.STRING(45),
    mprmin: sequelize.TEXT('long'),
    nda: sequelize.STRING(45),
    clarityid: sequelize.STRING(45),
    type: sequelize.INTEGER(11),
    idcomplexity: sequelize.INTEGER(11),
    idarch: sequelize.INTEGER(11),
    gtacDate: sequelize.STRING(45),
    gtacMin: sequelize.TEXT('long'),
    itscorecard: sequelize.TEXT('long'),
    gtacDateInput: sequelize.TEXT('long')
  },{
    freezeTableName: true,
    timestamps: false
  });

  var Employee = sequelDB.define('Employee', {
    idemployee: {
      type: sequelize.INTEGER(11),
      primaryKey: true,
      autoIncrement: true
    },
    name: sequelize.STRING(45),
    idACF2: sequelize.STRING(45),
    managedkey: sequelize.TEXT('long'),
    title: sequelize.TEXT('long'),
    email: sequelize.STRING(45),
    idkey: sequelize.TEXT('long'),
    managedBy: sequelize.INTEGER(11),
    permissions: sequelize.INTEGER(11)
  },{
    freezeTableName: true,
    timestamps: false
  });

  /*var insert = function(table, object) {
    switch(table) {
      case 'project':
        Project.sync({force: true}).then(function () {
          // Table created
          return Project.create(object);
        });
        return;
      default:
        return;
    }
  };*/

  var select = function(options) {
    return Project.findAll({
      where: {
        projectname: options
      }
    }).then(function(response){
      return response[0].dataValues;
    });
  };

  return {
    registerRoutes: function () {
      app.get('/sequelize-service/project/select/:options', function (req, res) {
        console.log("PARAMS HERE: ", req.params.options);
        return select(req.params.options)
          .then(function(resp) {
            res.send(resp);
          });
      });
      app.get('/sequelize-service/employee/load/permissions/:num', function (req, res) {
        console.log("PARAMS HERE: ", req.params.num);
        return select(req.params.num)
          .then(function(resp) {
            res.send(resp);
          });
      });
    }
  };
};