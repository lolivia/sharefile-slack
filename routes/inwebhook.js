/**
 * Created by lingl on 6/30/2016.
 */
var express = require('express');
var path = require('path');
var request = require('request');
var fs = require('fs');
var url = require("url");

var querystring = require("querystring");

var key_info = require('./sf-keys.js');
var key_context = key_info.key_context;

var router = express.Router();
var copyurl = "https://slashsf5.azurewebsites.net"
var filename = "Sharefile"

/* GET users listing. */
router.get('/', function(req, res, next) {
    console.log(req.url);
    console.log(url.parse(req.url,true));
    var query = url.parse(req.url,true).query;
    //var jsonquery = querystring.parse(query);
    // var channelname = jsonquery["channel_name"];
    var channelid = query["channel_id"];
    var username = query["user_name"];

    var access_token = query["access_token"];
	
    // fs.exists("../token/"+teamname+".txt", function(result) {
    //     fs.readFile("../token/"+teamname+".txt",'utf-8',function(err,data){
    //         if(err){
    //             console.log(data);
    //         }else{
    //             console.log(data);
    //             acess_token = data;
    //         }
    //     });
    // });
    // var responseurl = jsonquery["response_url"];
    copyurl = query["copyurl"];
    filename = query["filename_copy"]
    console.log("Request for copyurl:" + copyurl + " received.");

  var requrl = "https://slack.com/api/chat.postMessage"+"?"+"token="+access_token+"&"+"username=ShareFile"+"&"+"channel="+channelid+"&"+"icon_url=https://slashsf5.azurewebsites.net/img/iconsf.jpg"+"&"+ "text=@"+username+" share the file "+"<"+copyurl+"|"+filename+">"+"  with you"

    request({
        url: requrl,
        // url:responseurl,
        method: "POST"
    }, function (error, response, body){
        if (!error && response.statusCode == 200) {
            console.log("OK")
            res.send(response)

        }
    });

});

module.exports = router;
