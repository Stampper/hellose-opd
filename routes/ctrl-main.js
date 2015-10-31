var express = require('express');
var router = express.Router();
module.exports = router;


var mongoose = require('mongoose');
var Patient = mongoose.model('Patient');
var PhysicalRecord = mongoose.model('PhysicalRecord');

/* GET login page. */
router.get('/', function(req, res, next) {
  res.render('main/login');
});
/* GET home page. */
router.get('/home', function(req, res, next) {
  res.render('main/home');
});

/* GET register page. */
router.get('/register', function(req, res, next) {
  res.render('main/register');
});
router.get('/prescriptions', function(req, res, next) {
  res.render('pharmacist/prescription');
});