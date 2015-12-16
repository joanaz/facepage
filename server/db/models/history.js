'use strict';
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    url: {
        type: String
    },
    date: {
        type: Date
    },
    entities: [{
        type: String
    }],
    concepts: [{
        type: String
    }]
});

mongoose.model('History', schema);