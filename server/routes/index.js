var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Home Page'
  });
});


router.get('/home', function(req, res, next) {
  res.render('index', {
    title: 'Home page'
  });
});


/* GET About Me page. */
router.get('/About', function(req, res, next) {
  res.render('index', { title: 'About '
 
 });
});





/* GET Contact Me page. */
router.get('/Contact', function(req, res, next) {
  res.render('index', { title: 'Contact Me'
});
});

router.get('/add', async (req, res, next) => {
  res.render('test/add', {
      title: 'Add Test'
  });
});

module.exports = router;
