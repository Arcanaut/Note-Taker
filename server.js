//required installations 
const express = require("express");

//required apis
const apiRoutes = require('./Routes/apiRoutes');
const htmlRoutes = require('./Routes/htmlRoutes');


//sets up express middleware and port location to create a server 
const app = express();
const PORT = process.env.PORT || 3001;
app.use(express.json());

//required for post and put requests
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/api', apiRoutes)
app.use('/',htmlRoutes)

app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});

