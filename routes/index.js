var express = require('express');
var router = express.Router();
var site  = 'http://www.gazetaonline.com.br';
var controller = require('../controllers/index.js')();

/*noticias com taxonomia*/
router.post('/noticias/:id', function(req, res, next) {
  return controller.call(req,res);
});

/*noticias sem taxonomia*/
router.get('/noticias/:id', function(req, res, next) {
  return controller.call(req,res);
});

/*noticias com widget fixado*/
router.get('/noticias', function(req, res, next) {
  return controller.call(req,res);
});



module.exports = router;
