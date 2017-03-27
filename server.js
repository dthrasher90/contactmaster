var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var cors = require('cors');
// mongoose.Promise = global.Promise;


var config = require('./config');
var app = express();

app.use(express.static(__dirname + "/public"));
app.use(cors());
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

var Contact = require('./contact');

mongoose.connect(config.db);
mongoose.connection.on('connected', function () {
  console.log('Mongoose default connection open to ' + config.db);
});

app.get('/contactlist', function(req, res){
  console.log('inside contact get');
  Contact.find(function(err, contacts){
    res.json(contacts);
  });
});


app.get('/', function(req, res){
  res.sendFile(__dirname +'./public/index.html');
});

app.get('*', function(req, res) {
  res.sendFile(__dirname +'./public/index.html');
});

app.post('/contactlist/', function(req, res){
  // console.log(req.body);
  // db.contactlist.insert(req.body, function(err, data){
  //  res.json(data);
  // });

  var newContact = new Contact(req.body);
		newContact.save(function(err, contact){
			if(err){
				res.json({status: false, error: "Error in saving"});
				return;
			}
			// res.json({status: true, contact: contact});
      res.json(contact);
		});

});



app.delete('/contactlist/:id', function(req, res){
  var id = req.params.id;
  // console.log("i recieved a delete request", id);
  // db.contactlist.remove({ "_id" : ObjectId(id) }, function(err, data){
  //   res.json(data);
  // });

  Contact.remove({_id : id }, function(err, data){
    res.json(data);
  });

});

app.listen(config.port);
console.log('Now listening at port' + config.port);
