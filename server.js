/**
 * @fileoverview This is the server app script.
 * @author alvin.lin.dev@gmail.com (Alvin Lin)
 */

// Constants
var DEV_MODE = false;
var PORT = process.env.PORT || 5000;

// Sets the DEV_MODE constant during development if we run 'node server --dev'
process.argv.forEach(function(value, index, array) {
  if (value == '--dev' || value == '--development') {
    DEV_MODE = true;
  }
});

// Dependencies
var assert = require('assert');
var bodyParser = require('body-parser');
var emailAlerts = require('email-alerts');
var express = require('express');
var http = require('http');
var morgan = require('morgan');

// Initialization
var app = express();
var server = http.Server(app);

app.set('port', PORT);
app.set('view engine', 'pug');
app.use(morgan(':date[web] :method :url :req[header] :remote-addr :status'));
app.use('/public', express.static(__dirname + '/public'));
// Use request.query for GET request params.
// Use request.body for POST request params.
app.use(bodyParser.urlencoded({ extended: true }));

// app.get('/', function(request, response) {
//    response.redirect('/index');
// });
//
// app.get('/:page', function(request, response, next) {
//   var pages = ['index', 'about', 'investment', 'portfolio', 'contact'];
//   if (pages.indexOf(request.params.page) >= 0) {
//     response.render(request.params.page);
//   } else {
//     next();
//   }
// });
//
// app.post('/message', function(request, response) {
//   /**
//    * The POST request must contain three fields:
//    * email - The sender email that we can reply to.
//    * name - The name of the person.
//    * message - The message content.
//    */
//   var name = (request.body.name || '').trim();
//   var email = (request.body.email || '').trim();
//   var ticker = (request.body.ticker || '').trim();
//   var message = (request.body.message || '').trim();
//   if (!name || !email || !message) {
//     response.send({
//       error: 'One of your message fields was blank!'
//     });
//   } else {
//     var alert1 = emailAlerts({
//       fromEmail: email,
//       toEmail: DEV_MODE ? process.env.DEV_EMAIL : process.env.TO_EMAIL_1,
//       apiKey: process.env.SENDGRID_API_KEY
//     });
//     var alert2 = emailAlerts({
//       fromEmail: email,
//       toEmail: DEV_MODE ? process.env.DEV_EMAIL : process.env.TO_EMAIL_2,
//       apiKey: process.env.SENDGRID_API_KEY
//     });
//     var subject = 'eccfinancing - Message from ' + request.body.name +
//     ' from ' + ticker;
//     alert1.alert(subject, request.body.message, function(error) {
//       alert2.alert(subject, request.body.message, function(error) {
//         response.send({
//           error: error
//         });
//       });
//     });
//   }
// });

app.use(function(request, response) {
  response.send('Website under construction!');
  // response.status(404).render('404');
});

// Starts the server.
server.listen(PORT, function() {
  console.log('STARTING SERVER ON PORT ' + PORT);
  if (!process.env.SENDGRID_API_KEY) {
    throw new Error('No SendGrid API Key specified!');
  }
});
