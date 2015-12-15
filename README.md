#ilcorsaronero-api
With this module we can get magnets of torrents from ilcorsaronero.info. They're not providing any kind of API, so this module just scrape the information from the website.

##Installation
Give `npm install -g ilcorsaronero-api` into your project<br/>
Or<br/>
Download this repo and give `npm install`<br/>

##Documentation
Right now the module provide two functions:
###.search("string to search", categories, callback(err, data){ });
Here is pretty much self explanatory except for categories.<br/>
It can be a string or an array of string (we're implementing this last one). It is optional and if added as parameter the module will avoid to scrape every other item resulted from the search that doesn't match the paramater.

###.latest(categories, callback(err, data){ });
{inprogress}

##Available categories
The categories are the ones you can see from the website, capital letters and space must be respected:
Screener
DVD
SerieTv
Anime
BDRiP
PC Games
PlayStation
XBOX
Musica
Audiolibri
Ebooks
App Win
App Linux
App Mac
H4cikn9
Altro

##Example of Usage
There is a very simple example in the 'test' folder. This is what it contains:
```javascript
var icn = require("../index.js");
icn.search("Star Wars", "BDRiP", function(err, data) {
    if (err) throw err;
    console.log(data);
});
```
{inprogress}

##License
Released under the GNU 3 license.<br>
If you distribute a copy or make a fork of the project, you have to credit this project as source.<br>
Copyright © 2015, Giacomo cerquone.<br>
All rights reserved.
