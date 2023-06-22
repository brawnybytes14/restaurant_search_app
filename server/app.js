const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require("cors");
const route = require('./route');
const config = require("./config.json");
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 1000000 }));
app.use(bodyParser.json({ limit: "50mb" }));


//apis
app.use(route);
//end of apis

app.use('/', express.static(path.join(__dirname, 'www')));
app.use((req, res, next) => {
  console.log("Redirecting to",req.path)
  res.sendFile(path.join(__dirname, 'www', 'index.html'));
})

app.use((req, res, next) => {
  console.log(req.path);
  res.status(404).send('<h1>Page not found</h1>');
})

app.listen(config.PORT, () => {
  console.log("\nServer started:", config.HOST + ":" + config.PORT)
});
