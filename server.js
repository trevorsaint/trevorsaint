// core dependencies
const path = require('path');


// npm dependencies
const express    = require('express');
const nunjucks   = require('nunjucks');
const bodyParser = require('body-parser');
const app        = express();


// local dependencies
const config = require('./app/config.js');


// routing
const routes = require('./app/routes.js');


// paths
const configPaths = require('./config/paths.json');


// port
const port = process.env.PORT || config.port;


// setup application
const appViews = [
	path.join(__dirname, configPaths.views),
	path.join(__dirname, configPaths.layouts),
  path.join(__dirname, configPaths.partials),
  path.join(__dirname, configPaths.source),
  path.join(__dirname, configPaths.components)
];


// configurations
const nunjucksEnvironment = nunjucks.configure(appViews, {
  autoescape: true,
  express: app,
  noCache: true,
  watch: true
});


// set view engine
app.set('view engine', 'html');


// support for parsing data in POSTs
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));


// middleware to serve static assets
app.use('/', express.static(path.join(__dirname, configPaths.public)));


// use routes
app.use(routes);


// add variables that are available in all views
app.locals.serviceName = config.serviceName;
app.locals.rootPath = config.rootPath;


// start app
app.listen(port, (err) => {

  if (err) {
    throw err;
  } else {
    console.log('Listening on port 3000 url: http://localhost:3000');
  }

});


module.exports = app;