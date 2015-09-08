'use strict';

var http = require('http');
var path = require('path');
var morgan = require('morgan');
var express = require('express');
var bodyParser = require('body-parser');
var errorhandler = require('errorhandler');
var methodOverride = require('method-override');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride());
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' === app.get('env')) {
	app.use(errorhandler());
}

/* Backend Setup */
var config = require('./config');
var db = require('./backend/db/db-index')(config.db);
var domain = require('./backend/api-router/lib/domain/api-domain')(db);
var api = require('./backend/api-router/api-router')(app, config, domain);

api.configureRoutes();
/* End Backend Setup */

http.createServer(app).listen(app.get('port'), function () {
	console.log('com.td.oca.itmProductCatalogApiServer server listening on port ' + app.get('port'));
});

/* ONLY UNCOMMENT TO UPDATE DB SCHEMA */
/*var q = require('q');

q.when()
.then(function() {
	return db.server.context.connect();
})
.then(function(connection) {
	return connection.underlyingContext.context.updateSchema(true);
})
.then(function() {
	console.log('success');
	return;
})
.catch(function(err) {
	console.log(err);
	return err;	
});
/* END SCHEMA UPDATE BLOCK */