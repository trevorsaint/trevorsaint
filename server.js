// Core dependencies
const path = require('path');


// NPM dependencies
const express    = require('express');
const nunjucks   = require('nunjucks');
const bodyParser = require('body-parser');
const app        = express();


// Local dependencies
const config = require('./app/config.js');


// Routing
const routes = require('./app/routes.js');


// Port
const port = process.env.PORT || config.port;


// Setup application
const appViews = [
	path.join(__dirname, '/app/views'),
	path.join(__dirname, '/app/views/layout'),
  path.join(__dirname, '/app/views/partials'),
  path.join(__dirname, '/src'),
  path.join(__dirname, '/src/components')
];


// Configurations
const nunjucksEnvironment = nunjucks.configure(appViews, {
  autoescape: true,
  express: app,
  noCache: true,
  watch: true
});


// Set view engine
app.set('view engine', 'html');


// Support for parsing data in POSTs
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));


// Middleware to serve static assets
app.use('/', express.static(path.join(__dirname, 'public')));


// Use routes
app.use(routes);


// Add variables that are available in all views
app.locals.serviceName = config.serviceName;
app.locals.assetPath = config.assetPath;


// Start app
app.listen(port, (err) => {

  if (err) {
    throw err;
  } else {
    console.log('Listening on port 3000 url: http://localhost:3000');
  }

});


module.exports = app;
