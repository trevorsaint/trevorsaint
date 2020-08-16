const routes = require('express').Router();

routes.get('/', function(req, res) {
  res.render('index');
});

routes.get('/about', function(req, res) {
  res.render('about/index');
});

routes.get('/projects', function(req, res) {
  res.render('projects/index');
});

  routes.get('/projects/judicial-case-manager', function(req, res) {
    res.render('projects/judicial-case-manager/index');
  });

  routes.get('/projects/max-powder', function(req, res) {
    res.render('projects/max-powder/index');
  });

  routes.get('/projects/hmcts-design-system', function(req, res) {
    res.render('projects/hmcts-design-system/index');
  });

  routes.get('/projects/paramount-packaging', function(req, res) {
    res.render('projects/paramount-packaging/index');
  });

  routes.get('/projects/rural-payments', function(req, res) {
    res.render('projects/rural-payments/index');
  });

  routes.get('/projects/servelec', function(req, res) {
    res.render('projects/servelec/index');
  });

routes.get('/testimonials', function(req, res) {
  res.render('testimonials/index');
});

routes.get('/contact', function(req, res) {
  res.render('contact/index');
});

routes.post('/contact/thank-you', function(req, res) {
  res.render('contact/thank-you');
});

routes.get('/support/cookies', function(req, res) {
  res.render('support/cookies/index');
});

routes.get('/support/privacy', function(req, res) {
  res.render('support/privacy/index');
});

routes.get('/support/accessibility', function(req, res) {
  res.render('support/accessibility/index');
});


// Page not found
routes.get('*', function(req, res){
  res.render('page-not-found/index');
});


module.exports = routes;
