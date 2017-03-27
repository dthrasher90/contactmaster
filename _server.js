var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var mongojs = require('mongojs');
var MongoClient = require('mongodb').MongoClient;
var db = mongojs('url',['url']);
var ObjectId = require('mongodb').ObjectId;
var path=require('path');
var config = require('./config');


app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

MongoClient.connect(config.db, function(err, db){
  console.log("Connected correctly to server");
});

app.get('/url/', function(req, res){
    console.log("i received a get request");

    db.contactlist.find(function(err, data){
      console.log(data);
      res.json(data);
      });
    });


// app.get('/', function(req, res){
//   res.sendFile(__dirname +'./public/index.html');
//   });
//
// app.get('*', function(req, res) {
//   res.sendFile(__dirname +'./public/index.html');
//    });



 app.post('/url/', function(req, res){
    console.log(req.body);
     db.url.insert(req.body, function(err, data){
     res.json(data);
      });
     });


app.delete('/url/:id', function(req, res){
      var id = req.params.id;
      console.log("i recieved a delete request", id);
      db.contactlist.remove( { _id: mongojs.ObjectId(id) }, function(err, data){
      res.json(data);
    });
  });


app.get('/url/:id', function(req, res){
     var id = req.params.id;
     console.log(id);
     db.contactlist.findOne({_id: mongojs.ObjectId(id)}, function(err, data){
     res.json(data);
     console.log(data);
          });
      });

      app.put('/url/:id', function (req, res) {
        var id = req.params.id;
        console.log(req.body.name);
        db.contactlist.findAndModify({
          query: {_id: mongojs.ObjectId(id)},
          update: {$set: {firstname: req.body.firstname, lastname: req.body.lastname, email: req.body.email, phone: req.body.phone}},
          new: true}, function (err, doc) {
            res.json(doc);
          }
        );
      });







app.listen(config.port);
console.log('Now listening at port '+config.port);
