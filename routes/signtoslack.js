/**
 * Created by lingl on 7/14/2016.
 */
var express = require('express');
var router = express.Router();
var url = require('url');
var querystring = require('querystring');
/* GET home page. */

router.get('/', function(req, res, next) {
  var appendurl = req.originalUrl;
  appendurl = appendurl.substr(1);
  var query = url.parse(req.url).query;
  console.log("/signtoslack:"+query);
  var jsonquery = querystring.parse(query);
  var channelid = jsonquery["channel_id"];
  var channelname = jsonquery["channel_name"];
  var userid= jsonquery["user_id"];
  if(channelname=="directmessage")
  {
    channelid = userid;
  }
  res.render('signtoslack', { slackappend:channelid });
});




module.exports = router;

