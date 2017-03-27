var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var mongojs = require('mongojs');
var MongoClient = require('mongodb').MongoClient;
var db = mongojs('contactlist',['contactlist']);
var ObjectId = require('mongodb').ObjectId;
var path= require('path');

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

var url = 'mongodb://localhost:27017/';
MongoClient.connect(url, function(err, db) {
    console.log("Connected correctly to server");

  });

app.get('/contactlist', function(req, res){
    console.log("i received a get request");

  db.contactlist.find(function(err, data){
    console.log(data);
    res.json(data);
  });
    });


app.get('/', function(req, res){
  res.sendFile(__dirname +'./public/index.html');
  });

app.get('*', function(req, res) {
       res.sendFile(__dirname +'./public/index.html');
   });

 app.post('/contactlist/', function(req, res){
    console.log(req.body);
     db.contactlist.insert(req.body, function(err, data){
     res.json(data);
      });
     });



app.delete('/contactlist/:id', function(req, res){
      var id = req.params.id;
      console.log("i recieved a delete request", id);
      db.contactlist.remove({ "_id" : ObjectId(id) }, function(err, data){
      res.json(data);
    });
  });





app.listen(3000);
console.log('Now listening at port 3000');
