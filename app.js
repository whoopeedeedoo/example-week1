/**
 * @overview
 *
 * @author
 * @version 2014/04/26
 */

var http = require("http");
var port = 1554;
var request = require("request");
var fs = require("fs");
var url = "http://graph.facebook.com/Boo/photos?type=uploaded";
var tile_n = 2;



http.createServer(function (req, res) {

    if(req.url.indexOf('.js') != -1){ //req.url has the pathname, check if it conatins '.js'

      fs.readFile(__dirname + req.url, function (err, da) {
        if (err) console.log(err);
        res.writeHead(200, {'Content-Type': 'text/javascript'});
        //res.write(data);
        res.end(da);
      });
    }

    if(req.url.indexOf('.css') != -1){ //req.url has the pathname, check if it conatins '.css'

      fs.readFile(__dirname + req.url, function (err, da) {
        if (err) console.log(err);
        res.writeHead(200, {'Content-Type': 'text/css'});
        //res.write(data);
        res.end(da);
      });
    }

  res.writeHeader(200, {"Content-Type": "text/html"});
  
  var data = "<!DOCTYPE html><html><head>";
  data += "<meta charset='utf-8'>";
  data += "<title>Boo</title>";

  data += "<link href='style/main.css' rel='stylesheet' type='text/css'>";
  data += "<style>";
   request.get(url, function (err, body, response) {

    response = JSON.parse(response);
    response.data.forEach(function (val, idx) {
    data += ".tile.tile-" + tile_n + " .tile-inner {";
    data += "background-image:url('" + val.images[5].source + "');";
    data += "background-size:107px 107px;}"
    tile_n = tile_n * 2;
    });
    
  
  data += "</style>";
  data += "<script src='js/other.js'></script>";
  data += "<link rel='shortcut icon' href='favicon.ico'>";
  data += "<link rel='apple-touch-icon' href='meta/apple-touch-icon.png'>";
  data += "<link rel='apple-touch-startup-image' href='meta/apple-touch-startup-image-640x1096.png' media='(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)'>";
  data += "<link rel='apple-touch-startup-image' href='meta/apple-touch-startup-image-640x920.png'  media='(device-width: 320px) and (device-height: 480px) and (-webkit-device-pixel-ratio: 2)'>";
  data += "<meta name='apple-mobile-web-app-capable' content='yes'>";
  data += "<meta name='apple-mobile-web-app-status-bar-style' content='black'>";

  data += "<meta name='HandheldFriendly' content='True'>";
  data += "<meta name='MobileOptimized' content='320'>";
  data += "<meta name='viewport' content='width=device-width, target-densitydpi=160dpi, initial-scale=1.0, maximum-scale=1, user-scalable=no, minimal-ui'>";
data += "</head>";
data += "<body style='display:none;' onload='showbdy()' >";
  data += "<div class='container'>";
    data += "<div class='heading'>";
      data += "<h1 class='title'>Boo</h1>";
      data += "<div class='scores-container'>";
        data += "<div class='score-container'>0</div>";
        data += "<div class='best-container'>0</div>";
      data += "</div>";
    data += "</div>";

    data += "<div class='above-game'>";
      data += "<p class='game-intro'>Join the Boos and get to see more <strong>Boos!</strong></p>";
      data += "<a class='restart-button'>New Game</a>";
    data += "</div>";

    data += "<div class='game-container'>";
      data += "<div class='game-message'>";
        data += "<p></p>";
        data += "<div class='lower'>";
	        data += "<a class='keep-playing-button'>Keep going</a>";
          data += "<a class='retry-button'>Try again</a>";
        data += "</div>";
      data += "</div>";

      data += "<div class='grid-container'>";
        data += "<div class='grid-row'>";
          data += "<div class='grid-cell'></div>";
          data += "<div class='grid-cell'></div>";
          data += "<div class='grid-cell'></div>";
          data += "<div class='grid-cell'></div>";
        data += "</div>";
        data += "<div class='grid-row'>";
          data += "<div class='grid-cell'></div>";
          data += "<div class='grid-cell'></div>";
          data += "<div class='grid-cell'></div>";
          data += "<div class='grid-cell'></div>";
        data += "</div>";
        data += "<div class='grid-row'>";
          data += "<div class='grid-cell'></div>";
          data += "<div class='grid-cell'></div>";
          data += "<div class='grid-cell'></div>";
          data += "<div class='grid-cell'></div>";
        data += "</div>";
        data += "<div class='grid-row'>";
          data += "<div class='grid-cell'></div>";
          data += "<div class='grid-cell'></div>";
          data += "<div class='grid-cell'></div>";
          data += "<div class='grid-cell'></div>";
        data += "</div>";
      data += "</div>";

      data += "<div class='tile-container'>";

      data += "</div>";
    data += "</div>";

    data += "<p class='game-explanation'>";
      data += "<strong class='important'>How to play:</strong> Use your <strong>arrow keys</strong> to move the tiles. When two tiles with the same number touch, they <strong>merge into one!</strong>";
    data += "</p>";
    data += "<hr>";
    data += "<p><strong class='important'>Note:</strong> This site is not the official version of 2048. I forked his code and made adjustment.</p>";
    data += "<hr>";
    data += "<p>Original 2048 created by <a href='http://gabrielecirulli.com' target='_blank'>Gabriele Cirulli.</a> Based on <a href='https://itunes.apple.com/us/app/1024!/id823499224' target='_blank'>1024 by Veewo Studio</a> and conceptually similar to <a href='http://asherv.com/threes/' target='_blank'>Threes by Asher Vollmer.</a></p>";
  data += "</div>";

  data += "<script src='js/bind_polyfill.js'></script>";
  data += "<script src='js/classlist_polyfill.js'></script>";
  data += "<script src='js/animframe_polyfill.js'></script>";
  data += "<script src='js/keyboard_input_manager.js'></script>";
  data += "<script src='js/html_actuator.js'></script>";
  data += "<script src='js/grid.js'></script>";
  data += "<script src='js/tile.js'></script>";
  data += "<script src='js/local_storage_manager.js'></script>";
  data += "<script src='js/game_manager.js'></script>";
  data += "<script src='js/application.js'></script>";

data += "</body></html>";
    res.end(data);
  });

tile_n = 2;//init
}).listen(port);

console.log("start server port: " + port);


