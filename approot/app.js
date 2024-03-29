
/**
 * Module dependencies.
 */

var express = require('express');

var handlebars = require( 'handlebars' );

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'handlebars');
  app.register('.handlebars', handlebars);
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// Routes

app.get('/', function(req, res){

  var anArray = [
    'foo',
    'bar',
    'baz'
  ];

  var people = [
    { "name" : "tom", "age" : 32 },
    { "name" : "dick", "age" : 23 },
    { "name" : "harry", "age" : 55 }
  ];

  res.render('index', {
    people : people,
    anArray : anArray,
    title: 'Express'
  });

});

// Only listen on $ node app.js

//if (!module.parent) {
  app.listen(8080);
  console.log("Express server listening on port %d", app.address().port);
//}
