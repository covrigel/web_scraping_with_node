var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var siteUrl = "http://substack.net"

request(siteUrl + '/images/', function (error, response, html) {

  var csvArray = [];

  if (!error && response.statusCode == 200) {
    $ = cheerio.load(html);
  }

  $("tr").each(function(){
    var permission = $(this).first("td").find("code").first().text();
    if (!permission.startsWith("(d")){
      var url = siteUrl + $(this).last("td").find("a").attr("href");
      var filePath = url.substring(url.lastIndexOf("."));
      var newLine = csvArray.push([ "\n" + permission, url, filePath]);

    }
  });  

  fs.writeFile("images.csv", csvArray, function(err) {
    if (err) {
      console.log("There was an error, please check your code");
    } else {
      console.log("File saved!");
    }
  }); 

});