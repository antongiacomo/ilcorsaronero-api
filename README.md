#ilcorsaronero-api
With this module we can get magnets of torrents from ilcorsaronero.info. They're not providing any kind of API, so this module just scrape the information from the website.

##Installation
Give `npm install ilcorsaronero-api` into your project<br/>
Or<br/>
Download this repo and give `npm install`<br/>

##Documentation
Right now the module provide two functions:

###.search("string to search", categories, callback(err, data));
With this method we can search for torrents.<br/>
"Categories" is a parameter and it can be a string or an array of string, it's optional and if added the module will avoid completely to scrape every other item resulted from the search that doesn't match the paramaterso, being also faster in this way.

###.latest(categories, callback(err, data));
With this method we can get the latest torrents published on ilcorsaronero.info
The same here, categories is optional and can be a string or an array of string.

##Example of Usage
There is a very simple example in the 'test' folder. This is what it contains:
```javascript
var icn = require("ilcorsaronero-api");

icn.search("Star Wars", ["BDRiP", "Screener"] , function(err, data) {
  if (err) throw err;
  console.log(data);
});
icn.latest(function(err, data) {
  if (err) throw err;
  console.log(data);
});
```

##Available categories
The categories are the ones you can see from the website, capital letters and space must be respected:<br/>
"Screener"<br/>
"DVD"<br/>
"SerieTv"<br/>
"Anime"<br/>
"BDRiP"<br/>
"PC Games"<br/>
"PlayStation"<br/>
"XBOX"<br/>
"Musica"<br/>
"Audiolibri"<br/>
"Ebooks"<br/>
"App Win"<br/>
"App Linux"<br/>
"App Mac"<br/>
"H4cikn9"<br/>
"Altro"

##License
Released under the GNU 3 license.<br>
If you distribute a copy or make a fork of the project, you have to credit this project as source.<br>
Copyright © 2015, Giacomo cerquone.<br>
All rights reserved.
