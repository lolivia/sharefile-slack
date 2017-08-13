var express = require('express');
var router = express.Router();
var fs = require('fs');
var slacksfweb = {
  "response_type": "ephemeral",
  "text": "Getting start to ShareFile, get an account https://www.sharefile.com/",
  "attachments":[
    {
      "title":"Login to ShareFile",
      "title_link": "https://slashsf5.azurewebsites.net",
      "text": "Start your journey in ShareFile."
    }
  ]
};
// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   var appendurl = req.url;
//   var attachments =  slacksfweb.attachments
//   var at = attachments[0]
//   at.title_link = "https://sharefile.coolthink.top"+appendurl;
//   res.send(slacksfweb);
// });

router.post('/', function(req, res, next) {
  var channelid = req.body["channel_id"];
  var channelname = req.body["channel_name"];
  var response_url = req.body["response_url"];
  var team_domain = req.body["team_domain"];
  var team_id = req.body["team_id"];
  var user_id = req.body["user_id"];
  var user_name = req.body["user_name"];
  var token = req.body["token"];
  var slack_access_token = "";
  var appendurl="";
  fs.exists("token/"+user_id+".txt", function(result) {
    fs.readFile("token/"+user_id+".txt",'utf-8',function(err,data){
      if(err){
        console.log(data);
      }else{
        console.log(data);
        slack_access_token = data;
      }
    });
  });
  if(slack_access_token)
  { appendurl = "/?"+"token="+token+"&team_id="+team_id+"&team_domain="+team_domain+"&channel_name="+channelname+"&user_id="+user_id+"&user_name="+user_name+"&response_url="+response_url+"&channel_id="+channelid+"&access_token="+slack_access_token}
  else
  {
     appendurl = "/?"+"token="+token+"&team_id="+team_id+"&team_domain="+team_domain+"&channel_name="+channelname+"&user_id="+user_id+"&user_name="+user_name+"&response_url="+response_url+"&channel_id="+channelid
  }

  var attachments =  slacksfweb.attachments
  var at = attachments[0]
  at.title_link = "https://slashsf5.azurewebsites.net"+appendurl;
  res.send(slacksfweb);
});
module.exports = router;
