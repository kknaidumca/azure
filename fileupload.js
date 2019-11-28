const express = require('express');
const fileUpload = require('express-fileupload');
var path = require('path');
const app = express();

// default options
app.use(fileUpload({
useTempFiles : true,
    tempFileDir : '/tmp/'
}));

app.post('/upload', function(req, res) {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  let sampleFile = req.files.sampleFile;
  console.log(sampleFile, __dirname);
  // Use the mv() method to place the file somewhere on your server
  sampleFile.mv('/home/'+sampleFile.name, function(err) {
    if (err)
      return res.status(500).send(err);

    res.send('File uploaded!');
  });
});
app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname + '/index.html'));
})
module.exports = app;
