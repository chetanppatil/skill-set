const express = require('express');
const app = express();
var bodyParser = require('body-parser');
var cors = require('cors');

global.q = require('q');
global._ = require('underscore');
global.config = require('./config/config.json');
global.dbQuery = require('./services/mysqlCon');
global.queries = require('./services/queryFile');

const BASE_URL = config.BASE_URL;


app.use(cors());

app.use(bodyParser.raw({
  limit: '50mb'
}));
app.use(bodyParser.json({
  limit: '50mb'
}));
app.use(bodyParser.urlencoded({
  limit: '50mb',
  extended: true
}));

app.use(express.static(__dirname + '/public'));

/* PING FOR TESTING API STATUS */
app.get(BASE_URL + '/ping', (req, res) => {
  res.status(200).send("Pong");
});

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/public/ui/index.html');
});

/* SKILL SET APIs */
app.post(BASE_URL + '/skills', require('./api/controllers/addSkill').start);
app.get(BASE_URL + '/skills', require('./api/controllers/getSkills').start);
app.put(BASE_URL + '/skills/:id/update', require('./api/controllers/updateSkill').start);
app.put(BASE_URL + '/skills/:id/approve', require('./api/controllers/updateStatus').start);

app.use((err, req, res, next) => {
  console.log('-----Something broke!---', err);
  res.status(500).send('Something broke!');
});

/* 404 ROUTE NOT FOUND */
app.get('*', (req, res) => {
  // console.log("no route found,throwing 404 error." + req.url);
  res.status(404).send({
    code: 404,
    error: "404 PAGE not found >" + req.url + '<<'
  });
});


/* SERVER START */
let port = process.env.PORT || 3000;
let server = app.listen(port);
server.timeout = 600000;
module.exports = exports;

module.exports = exports;

console.log('API is running on port: ' + port);
console.log('try this: curl http://localhost:' + port + BASE_URL + '/ping');
