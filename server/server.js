const express = require('express');
const app = express();
const path = require('path');
// const bodyParser = require('body-parser');

// app.use(bodyParser.json());

// /Users/rodrigo/Data/DEV/CODESMITH/codesmith-solo-project/server
// app.use(express.static(path.join(__dirname, './../app')));
// app.use(express.static(path.join(__dirname, './../build')));
app.use(express.static(path.join(__dirname, './../')));

// app.get('/messages', messageController.getMessages);
// app.post('/messages', authController, messageController.postMessage);

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/../index.html'));
});


app.listen(8080);

module.exports = app;