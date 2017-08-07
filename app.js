const express = require('express');
const bodyParser = require('body-parser');

const router = require('./route');

const app = express();

bodyParser.json();
bodyParser.urlencoded({ urlencoded: false });

app.all('*', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
    if(req.method === "OPTIONS") {
      res.send(200);
    } else {
      next();
    }
});

app.use('/static', express.static('public'));
app.use('/upload', router);

app.get('/', (req, res) => {
  res.send('上传');
});

app.listen(5656, () => {
  console.log('http://localhost:5656');
});
