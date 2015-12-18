'use strict';

var request = require('request'),
    cheerio = require('cheerio');

function search(term, cat, callback) {
  if (typeof term !== 'string') {
    callback(new Error("You must enter a string to search."));
    return;
  }
  scrape("http://ilcorsaronero.info/argh.php?search=" + encodeURIComponent(term), cat, callback);
}

function latest(cat, callback) {
  scrape("http://ilcorsaronero.info/recenti", cat, callback);
}

function scrape(url, cat, callback) {
  if (typeof callback === 'undefined' && typeof cat !== 'function') {
    console.log("Missing callback function.");
    return;
  }
  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var $ = cheerio.load(body);
      // We'll store retrieved data here
      var result = [],
          counter = 0;
      // We don't scrape the categories if they're specified
      if (typeof cat === 'undefined' || typeof cat === 'function') {
        var items = $('.odd, .odd2');
        callback = cat;
      } else if (typeof cat === 'string') {
        var items = $('.odd, .odd2').filter(function() {
          return $(this).children('td').eq(0).children('a').text() === cat;
        });
      } else if (Array.isArray(cat)) {
        // STILL IN PROGRESS
        cat.forEach(function(el, i) {
          var items = $('.odd, .odd2').filter(function() {
            return $(this).children('td').eq(0).children('a').text() === el;
          });
        });
      } else {
        callback(new Error("The category parameter must be a String or an array of String."));
        return;
      }

      /*var items = $('.odd, .odd2').filter(function() {
        return $(this).children('td').eq(0).children('a').text() === cat;
      });*/

      items.each(function(i, row) {
        // Unluckily the magnets are not accessible from the search page. We must access the torrent page and get the magnet
        request( $(row).children('td').eq(1).children('a').attr("href"), function(error, response, body) {
          if (!error && response.statusCode == 200) {
            var cat = $(row).children('td').eq(0).children('a').text(),
                name = $(row).children('td').eq(1).children('a').text(),
                link = cheerio.load(body)('.magnet').attr('href'),
                size = $(row).children('td').eq(2).text(),
                date = $(row).children('td').eq(4).text(),
                seeds = $(row).children('td').eq(5).text(),
                peers = $(row).children('td').eq(6).text();

            result.push( { "cat": cat, "name": name, "link": link, "size": size, "date": date, "seeds": seeds, "peers": peers } );

            counter++;
            if(counter == items.length) {
              callback(null, result);
            }
          }
        });
      });
    }
  });
}

exports.search = search;
exports.latest = latest;
