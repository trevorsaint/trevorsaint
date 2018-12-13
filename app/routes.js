const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
  res.render('index');
});

router.get('/about', function(req, res) {
  res.render('about');
});

router.get('/projects', function(req, res) {
  res.render('projects');
});

  router.get('/projects/judicial-case-manager', function(req, res) {
    res.render('projects/judicial-case-manager');
  });

  router.get('/projects/max-powder', function(req, res) {
    res.render('projects/max-powder');
  });

  router.get('/projects/hmcts-design-system', function(req, res) {
    res.render('projects/hmcts-design-system');
  });

  router.get('/projects/paramount-packaging', function(req, res) {
    res.render('projects/paramount-packaging');
  });

router.get('/feedback', function(req, res) {
  res.render('feedback');
});

router.get('/contact', function(req, res) {
  res.render('contact');
});

router.get('/cookies', function(req, res) {
  res.render('cookies');
});

router.get('/privacy-policy', function(req, res) {
  res.render('privacy-policy');
});

module.exports = router;