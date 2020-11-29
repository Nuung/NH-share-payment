const express = require('express');
const axios = require("axios");
const router = express.Router();

// Check every empty condtion
const isAllEmpty = function (value) {
  if (value == "" || value == null || value == undefined || (value != null && typeof value == "object" && !Object.keys(value).length)) {
    return true;
  } else {
    return false;
  }
};

//────────────────────────────────────────────────────────────────────────────────────────────//

// login page
router.get('/', function (req, res, next) {
  res.render('index');
});


module.exports = router;
