const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
  res.render('index');
});

router.get('/about', function(req, res) {
  res.render('about/index');
});

router.get('/projects', function(req, res) {
  res.render('projects/index');
});

  router.get('/projects/judicial-case-manager', function(req, res) {
    res.render('projects/judicial-case-manager/index');
  });

  router.get('/projects/max-powder', function(req, res) {
    res.render('projects/max-powder/index');
  });

  router.get('/projects/hmcts-design-system', function(req, res) {
    res.render('projects/hmcts-design-system/index');
  });

  router.get('/projects/paramount-packaging', function(req, res) {
    res.render('projects/paramount-packaging/index');
  });

  router.get('/projects/rural-payments', function(req, res) {
    res.render('projects/rural-payments/index');
  });

  router.get('/projects/servelec', function(req, res) {
    res.render('projects/servelec/index');
  });

router.get('/feedback', function(req, res) {
  res.render('feedback/index');
});

router.get('/cookies', function(req, res) {
  res.render('cookies/index');
});

router.get('/privacy-policy', function(req, res) {
  res.render('privacy-policy/index');
});


// Page not found 404
router.get('*', function(req, res){
  res.render('page-not-found/index');
});


module.exports = router;
