"use latest";

var express = require("express");
var bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());

app.get("/", (req, res) => {
    const HTML = renderView({
        title: "My Webtask View",
        body: "<h1>Simple webtask view</h1>",
        destUrl: "https://team.quickbase.com?a=QBI_logtrack&",
    });

    res.set("Content-Type", "text/html");
    res.status(200).send(HTML);
});

function renderView(locals) {
    return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>${locals.title}</title>
      <script src="https://unpkg.com/axios/dist/axios.min.js"></script>        
  </form>
    </head>

    <body>
      ${locals.body}
      <form method="POST" action="${locals.destUrl}">
      <input type="text" name="lg" />
      <input type="submit" />
     <button onclick="postViaJs()">By Js</button>

      <script> function postViaJs() { 
        var requestConfig = { 
          url : "${locals.destUrl}", 
          method: 'post', 
          data: {lg: document.getElementsByName('lg')[0].value},
           withCredentials: true 
          }; 
          axios(requestConfig)
          .then(function(data) { 
              console.log("success result = " + JSON.stringify(data))
           }) 
          .catch(function(error) { 
              // If there is any error catch them here 
              console.log("error getting request.url: " + requestConfig.url + " error:" + JSON.stringify(error, null, 2)); 
            }); 
        } 
      </script>      
    </body>
    </html>
  `;
}

app.listen(3000, () => console.log("Example app listening on port 3000!"));
