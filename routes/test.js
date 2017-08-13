/**
 * Created by lingl on 7/3/2016.
 */
var express = require('express');
var router = express.Router();
var key_info = require('./sf-keys.js');
var querystring = require("querystring");
var url = require("url");
var key_context = key_info.key_context;

var client_id = key_context.client_id;
var client_secret = key_context.client_secret;
var redirect_origin = key_context.redirect;
/* GET home page. */
var fs = require("fs");
var slack_access_token=""

router.get('/', function(req, res, next) {
  var query = url.parse(req.url).query;
  var jsonquery = querystring.parse(query);
  var user_id = jsonquery["user_id"];
  var appendurl = req.originalUrl;
  appendurl = appendurl.substr(1);
  if (! typeof jsonquery === 'object') return false;
  if ("access_token" in jsonquery)
  {
    var redirect = redirect_origin + appendurl;
    console.log("Already has access_token: sharefileoauth redirect_origin:"+redirect);
    res.render('test', { client_id: client_id,redirect:redirect });
  }else{
    fs.exists("token/"+user_id+".txt", function(result) {
      fs.readFile("token/"+user_id+".txt",'utf-8',function(err,data){
        if(err){
          console.log(data);
        }else{
          console.log(data);
          slack_access_token = data;

        }
        if(slack_access_token)
        {
          var redirect = redirect_origin + appendurl+"&access_token="+slack_access_token;
          console.log("Have no access_token: sharefileoauth redirect_origin:"+redirect);
          res.render('test', { client_id: client_id,redirect:redirect });
        }
        else{
          res.redirect("https://slashsf5.azurewebsites.net/signtoslack"+appendurl);
        }
      });
    });

  }


});


module.exports = router;
