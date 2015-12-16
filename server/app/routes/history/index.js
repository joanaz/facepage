'use strict';
var router = require('express').Router();
module.exports = router;
var _ = require('lodash');
var mongoose = require('mongoose');
var History = mongoose.model('History');

router.get('/', function(req, res, next) {
  History.find(req.query).exec()
    .then(function(history) {
      res.json(history);
    })
    .then(null, next);
})

router.post('/', function(req, res, next) {
  var user = new History(req.body);
  user.save(function(err, savedHistory) {
    if (err) return next(err);
    res.status(201).json(savedHistory);
  });
})