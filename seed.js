/*

This seed file is only a placeholder. It should be expanded and altered
to fit the development of your application.

It uses the same file the server uses to establish
the database connection:
--- server/db/index.js

The name of the database used is set in your environment files:
--- server/env/*

This seed file has a safety check to see if you already have users
in the database. If you are developing multiple applications with the
fsg scaffolding, keep in mind that fsg always uses the same database
name in the environment files.

*/

var async = require('async');
var mongoose = require('mongoose');
var Promise = require('bluebird');
var connectToDb = require('./server/db');
var User = Promise.promisifyAll(mongoose.model('User'));
var History = Promise.promisifyAll(mongoose.model('History'));

var users = [{
    email: 'admin',
    password: 'admin'
}, {
    email: 'obama@gmail.com',
    password: 'potus'
}];

users = users.map(function(datum) {
    return new User(datum)
})

var date1 = new Date(2015, 10, 10)
var date2 = new Date(2015, 10, 19)
var date3 = new Date(2015, 10, 30)
var date4 = new Date(2015, 11, 9)

var history = [{
    url: "http://www.cnn.com/2015/12/09/politics/uk-donald-trump-ban-petition/",
    date: date4,
    entities: ["Donald Trump", "UK", "Trump", "Suzanne Kelly", "Aberdeen"],
    concepts: ["United Kingdom", "Conservative Party", "British Empire", "Boris Johnson", "President of the United States"]
}, {
    url: "https://www.washingtonpost.com/world/middle_east/netanyahu-to-meet-donald-trump-in-israel-this-month/2015/12/09/59601348-9e74-11e5-a3c5-c77f2cc5a43c_story.html",
    date: date3,
    entities: ["Donald Trump", "Israel", "Prime Minister Benjamin Netanyahu", "Trump", "United States"],
    concepts: ["Israel", "Benjamin Netanyahu", "Jerusalem", "Islam", "Prime Minister of Israel"]
}, {
    url: "http://www.nytimes.com/2015/11/20/world/europe/paris-attacks.html?rref=collection%2Fnewseventcollection%2Fattacks-in-paris",
    date: date2,
    entities: ["Abdelhamid Abaaoud", "Paris", "Europe", "Belgium", "VERVIERS"],
    concepts: ["Terrorism", "Attack", "France", "Attack!", "French people"]
}, {
    url: "http://www.nytimes.com/interactive/2015/11/20/world/europe/Paris-terror-victims-list.html?rref=collection%2Fnewseventcollection%2Fattacks-in-paris",
    date: date2,
    entities: ["Paris", "Bataclan concert hall", "Death Metal", "Bataclan", "France"],
    concepts: ["Paris ", "Rock music", "Eagles", "Clint Eastwood", "Attack"]
}, {
    url: "http://abc11.com/news/hillary-clinton-said-she-went-to-trumps-wedding-for-fun/919511/",
    date: date1,
    entities: ["Donald Trump", "Hillary Clinton", "Megyn Kelly", "GOP", "Melania Knauss"],
    concepts: ["Donald Trump", "Melania Trump", "George W. Bush", "Barack Obama", "Democratic Party"]
}]
history = history.reverse()
history = history.map(function(datum) {
    return new History(datum)
})

var all = users.concat(history);
var models = [User, History];

console.log('-removing-');
async.each(models,
    function(model, done) {
        model.remove({}, done);
    },
    function(err) {
        if (err) return console.error('error while removing documents', err);
        console.log('-done removing-');
        console.log('-saving-');
        async.each(all,
            function(doc, done) {
                doc.save(done);
            },
            function(err) {
                if (err) console.error('seed error', err);
                else console.log('-done saving-');
                console.log('---done seeding---');
                process.exit();
            }
        );
    }
);