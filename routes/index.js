var express = require('express');
var router = express.Router();

/* GET home page. */

router.get('/', function(req, res, next) {
  var slackappend = req.url;
  console.log("*********************");
  console.log(req.url);
  slackappend = slackappend.substr(2);
  console.log(slackappend);
  console.log("*********************");
  res.render('index', { title: 'Express', slackappend:slackappend });
});




module.exports = router;
