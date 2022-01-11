//required installations 
const express = require("express");
const fs = require("fs");

//required apis
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

//sets up express middleware and port location to create a server 
const app = express();
const PORT = process.env.PORT || 3001;
app.use(express.static('public'));


app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});

