var fs = require('fs');
var path = require('path');

var express = require('express');
var multer = require('multer');
var SizeCountingStorage = require('./storage');

var upload = multer({
  storage: new SizeCountingStorage()
});
var app = express();

app.get('/', function (req, res) {
  var index = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
  res.send(index);
});

app.post('/size', upload.single('file'), function (req, res) {
  delete req.file.buffer;
  res.json({size: req.file.size});
});

var port = process.env.PORT || 8080;
app.listen(port, function () {
  console.log('App listening on port ' + port + '!');
});
