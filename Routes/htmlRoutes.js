//require the express router module for routes
const path = require('path')
const router = require('express').Router();


  // get route to notes.html
  //if the user clicks the get started button directs them to the notes page
  router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'));
  });

  
//default get route to home page
//if user navigates to the root url path take them to the index page
router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
  });
  
  //export all routes
  module.exports = router;