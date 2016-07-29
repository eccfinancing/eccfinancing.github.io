/**
 * @fileoverview This is the server app script.
 * @author alvin.lin.dev@gmail.com (Alvin Lin)
 */

// Constants
var IP = process.env.IP || 'localhost';
var PORT_NUMBER = process.env.PORT || 5000;

// Dependencies.
var assert = require('assert');
var bodyParser = require('body-parser');
var express = require('express');
var gmailSend = require('gmail-send');
var http = require('http');
var morgan = require('morgan');
var swig = require('swig');

// Initialization.
var app = express();
var email = gmailSend({
  user: process.env.GMAIL_ACCOUNT,
  pass: process.env.GMAIL_APPLICATION_PASSWORD,
  to: process.env.GMAIL_ACCOUNT
});
var server = http.Server(app);

app.engine('html', swig.renderFile);

app.set('port', PORT_NUMBER);
app.set('view engine', 'html');
app.use(morgan(':date[web] :method :url :req[header] :remote-addr :status'));
app.use('/public', express.static(__dirname + '/public'));
app.use('/scripts', express.static(__dirname + '/scripts'));
// Use request.query for GET request params.
// Use request.body for POST request params.
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(request, response) {
  response.redirect('/index');
});

app.get('/:page', function(request, response, next) {
  var pages = ['index', 'about', 'investment', 'portfolio', 'contact'];
  if (pages.indexOf(request.params.page) >= 0) {
    response.render(request.params.page + '.html');
  } else {
    next();
  }
});

app.post('/message', function(request, response) {
  /**
   * The POST request must contain three fields:
   * email - The sender email that we can reply to.
   * name - The name of the person.
   * message - The message content.
   */
  if (DEV_MODE) {
    setTimeout(function() {
      response.send({
        error: null,
        result: null
      });
    }, 2500);
  } else {
    var sender = request.body.email.strip();
    var name = request.body.name.strip();
    var message = request.body.message.strip();
    if (!sender || !name || !message) {
      response.send({
        error: 'One of your message fields was blank!',
        result: null
      });
      return;
    }
    email({
      from: request.body.email,
      replyTo: request.body.email,
      subject: 'eccfinancing - Message from ' + request.body.name,
      text: request.body.message
    }, function(error, result) {
      response.send({
        error: error,
        result: result
      });
    });
  }
});

app.use(function(request, response) {
  response.status(400).render('404.html');
});

// Starts the server.
server.listen(PORT_NUMBER, function() {
  console.log('STARTING SERVER ON PORT ' + PORT_NUMBER);
  if (!process.env.GMAIL_ACCOUNT) {
    throw new Error('No Gmail account specified!');
  }
  if (!process.env.GMAIL_APPLICATION_PASSWORD) {
    throw new Error('No Gmail application password specified!');
  }
});