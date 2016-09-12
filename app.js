var express = require('express');
var multer = express('multer');
var morgan = require('morgan');
var qr = require('qr-image');

var app = express();

var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var http = require('http');
var https = require('https');
var fs = require('fs');

app.use(bodyParser.json());
app.use(morgan('dev'));

//Connect to Mongoose
mongoose.connect('mongodb://localhost/qrcode');

var db = mongoose.connection;

var router = express.Router();
router.use(function(req, res, next){
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', "GET,PUT,POST,DELETE");
    res.header('Access-Control-Allow-Headers', "Content-Type");
    next();
});

router.get('/', function(req, res){
    res.send('e ae galera');
});

router.get('/qrcode', function(req, res){
    var code = qr.image("OI galera estou funcionando", {type: 'svg'});
    res.type('svg');
    code.pipe(res);
});


app.use('/', router);

var httpServer = http.createServer(app);
httpServer.listen(8080);
console.log("Working!");