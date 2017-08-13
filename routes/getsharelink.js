/**
 * Created by Administrator on 7/5/2016.
 */
var express = require('express');

var request = require('request');
var url = require("url");
var querystring = require("querystring");
var router = express.Router();


/* GET share link .
router.get('/{itemId}', function(req, res, next) {

    var url= "https://account.sf-api.com/sf/v3/Shares(itemId)"

    request({
        url: url,
        method: "Get",
       // json: true,   // <--Very important!!!
        headers: {'access_token': req.access_token,'token_type': bearer,'subdomain': $req.subdomain,'appcp': req.appcp, Authorization : "Bearer " + req.access_token}
    }, function (error, response, body){
        if (!error && response.statusCode == 200) {
            console.log("OK")
        }
    });

});
*/
router.get('/', function(req, res, next)
{
    var query = url.parse(req.url).query;
    var jsonquery = querystring.parse(query);
    var itemid = jsonquery["itemid"];
    var accesstoken = jsonquery["access_token"];
    var subdomain = jsonquery["subdomain"];
    var appcp = jsonquery["appcp"];
    var filename=jsonquery["title"];
    var Body= {
        "ShareType":"Send",
        "Title":"Sample Send Share",
        "Items": [ { "Id": itemid}],
        "Parent": { "Id": itemid },

        "RequireLogin": false,
        "RequireUserInfo": false,
        "MaxDownloads": -1,
        "UsesStreamIDs": false,
        "Title": filename
    };
    var urllink= "https://"+ subdomain + ".sf-api.com/sf/v3/Shares?notify=false"
    
    request({
        url: urllink,
        method: "Post",
        json: true,   // <--Very important!!!
        body: Body,
        headers: {'access_token': accesstoken,'token_type': 'bearer','subdomain': subdomain,'appcp': appcp, Authorization : "Bearer " + accesstoken, 'Content-Type' : 'application/json'}
    }, function (error, response, body){
        if (!error && response.statusCode == 200) {
            console.log("OK")
            res.send(response)
        }
    });
});
module.exports = router;
