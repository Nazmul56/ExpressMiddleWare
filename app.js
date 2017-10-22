var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();
var app = express();
var mongoose = require('mongoose');

app.set('view engine', 'pug');
app.set('views','./views');
mongoose.connect('mongodb://127.0.0.1:27017/test', {
  useMongoClient: true,
  /* other options */
});
var personSchema = mongoose.Schema({
   name: String,
   age: Number,
   nationality: String
});
var Person = mongoose.model("Person", personSchema);
app.get('/person', function(req, res){
   res.render('person');
});
var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.post('/person',urlencodedParser, function(req, res){

var personInfo = req.body; //Get the parsed information
   if(!personInfo.name || !personInfo.age || !personInfo.nationality){
      res.render('show_message', {
         message: "Sorry, you provided worng info", type: "error"});
   } else {
      var newPerson = new Person({
         name: personInfo.name,
         age: personInfo.age,
         nationality: personInfo.nationality
      });
		
      newPerson.save(function(err, Person){
         if(err)
            res.render('show_message', {message: "Database error", type: "error"});
         else
            res.render('show_message', {
               message: "New person added", type: "success", person: personInfo});
      });
   }
});

//var Person = mongoose.model("Person", personSchema);

app.get('/people', function(req, res){
   Person.find(function(err, response){
      res.json(response);
   });
});

app.listen(3000);
