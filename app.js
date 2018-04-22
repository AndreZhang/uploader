
const express = require('express');
const bodyParser = require('body-parser');
const formidable = require('formidable');
const path = require('path');
const util = require('util');

const db = require('./app/config');
const Files = require('./app/collections/files');
const File = require('./app/models/file');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
  res.sendfile(path.join(__dirname, 'public/index.html'));
});

app.post('/upload', function (req, res) {

  var form = new formidable.IncomingForm();
  //Formidable uploads to operating systems tmp dir by default
  form.uploadDir = "./upload";       //set upload directory
  form.keepExtensions = true;     //keep file extension
  form.parse(req, function (err, fields, files) {
    res.writeHead(200, { 'content-type': 'text/plain' });
    res.write('upload Succeed:\n\n');

    var name = files.fileUploaded.name;
    var path = files.fileUploaded.path;

    new File({ name }).fetch().then((found) => {
      if (found) {
        res.status(200).send(found.attributes);
        Files.reset().fetch().then((files) => {
          res.end(util.inspect(Files.models));
        });
      } else {
          Files.create({
            name,
            path
          })
          .then(function(newFile) {

            Files.reset().fetch().then((files) => {
              res.end(util.inspect(Files.models));
            });
          });
      }
    });

  });
})

app.listen(3000);
