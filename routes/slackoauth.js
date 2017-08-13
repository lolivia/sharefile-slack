/**
 * Created by lingl on 7/11/2016.
 */
/**
 * Created by lingl on 7/3/2016.
 */
var express = require('express');
var router = express.Router();
var url = require("url");
var querystring = require("querystring");
var fs = require("fs");
var request = require('request');
/* GET home page. */

var key_info = require('./sf-keys.js');
var key_context = key_info.key_context;
var client_id = key_context.slack_client_id;
var client_secret = key_context.slack_client_secret;
var redirect = key_context.slack_redirect
router.get('/', function(req, res, next) {
  var query = url.parse(req.url).query;
  console.log("/slackoauth: After install the App:"+query);
  var jsonquery = querystring.parse(query);
  var code = jsonquery["code"];
  var requrl = "https://slack.com/api/oauth.access"+"?"+"client_id="+client_id+"&client_secret="+client_secret+"&code="+code
  request({
    url: requrl,
    // url:responseurl,
    method: "Post"
  }, function (error, response, body){
    var querystring = eval('(' + body + ')');
    var ok = querystring["ok"];
    if (!error && response.statusCode == 200 && ok ==true) {
      console.log("OK")
      var  access_token = querystring["access_token"];
      var team_name = querystring["team_name"];
      var team_id = querystring["team_id"];
      var incoming_webhook =  querystring["incoming_webhook"];
      var requrl = incoming_webhook["url"];
      var botuser = querystring["bot"];
      var bot_user_id = botuser["bot_user_id"];
      var  channel = incoming_webhook["channel"];
      var  channel_id = incoming_webhook["channel_id"];
      var data={
        "text":  "Congrats, ShareFile is now ready to use in any of your channels. Simply type /sharefile to start file sharing.",
        "channel" : channel_id,
        "username" : bot_user_id,

      }
      request({
        url: requrl,
        // url:responseurl,
        method: "POST",
        json: true,   // <--Very important!!!
        body: data
      }, function (error, response, body){
        if (!error && response.statusCode == 200) {
          console.log("OK");
          var filename = team_name+".txt";

          fs.open("token/"+filename, "w",function(e,fd){
            console.log(fd+"open");
            if(e) throw e;
            fs.writeFile("token/"+filename,access_token,function(e,fd){
              console.log(fd+"Write");
              if(e) throw e;
              console.log("Write the file ok");

            })
            fs.close(fd,function (e) {
              console.log(fd+"close");
              if(e) throw e;
              console.log("Close file successful");
            })
            res.redirect("https://my.slack.com/messages/general");
          });


        }
      });
    }
    else
    {
      console.log("error")
    }
  });
});

router.get('/signtoslack', function(req, res, next) {

  var query = url.parse(req.url).query;

  var jsonquery = querystring.parse(query);
  var code = jsonquery["code"];
  var channel_id = jsonquery["channel_id"];
  var requrl = "https://slack.com/api/oauth.access"+"?"+"client_id="+client_id+"&client_secret="+client_secret+"&code="+code+"&redirect_uri=https://slashsf5.azurewebsites.net/slackoauth/signtoslack?channel_id="+channel_id
  request({
    url: requrl,
    // url:responseurl,
    method: "Post"
  }, function (error, response, body){
    var querystring = eval('(' + body + ')');
    var ok = querystring["ok"];
    if (!error && response.statusCode == 200 && ok ==true) {
      console.log("oauth of sign to slack OK")
      var  access_token = querystring["access_token"];
      var userid = querystring["user_id"];
      request({
        url: "https://slack.com/api/users.info?token="+access_token+"&user="+userid,
        // url:responseurl,
        method: "Get"
      },function (error,response,body) {
        var querystring = eval('(' + body + ')');
        var ok = querystring["ok"];
        if(!error&&response.statusCode==200&& ok ==true)
        {
          var user = querystring["user"];
          var username = user["name"];
          var filename = userid+".txt";
          redirect = "https://slashsf5.azurewebsites.net"+"?"+"access_token="+access_token+"&user_name="+username+"&channel_id="+channel_id
          fs.open("token/"+filename, "w",function(e,fd){
            console.log(fd+"open");
            if(e) throw e;
            fs.writeFile("token/"+filename,access_token,function(e,fd){
              console.log(fd+"Write");
              if(e) throw e;
              console.log("Write the file ok");

            })
            fs.close(fd,function (e) {
              console.log(fd+"close");
              if(e) throw e;
              console.log("Close file successful");
            })
            res.redirect(redirect);
          });
        }
      });


    }
    else
    {
      console.log("error")
    }
  });
});

module.exports = router;
