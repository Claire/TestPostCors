"use latest";

import express from 'express';
import { fromExpress } from 'webtask-tools';
import bodyParser from 'body-parser';
const app = express();

app.use(bodyParser.json());

app.get("/", (req, res) => {
    const HTML = renderView({
        title: "Test Post Cors from Form Sumbit and Ajax",
        body: "<h1>Test Post Cors from Form Sumbit and Ajax Call</h1>",
        destUrl: "https://team.quickbase.com/db/main?a=QBI_logtrack",
    });

    res.set("Content-Type", "text/html");
    res.status(200).send(HTML);
});

module.exports = fromExpress(app);

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
      <p>Sends post to ${locals.destUrl}</p>
      <form method="POST" action="${locals.destUrl}">
      Enter Anything here <input type="text" name="lg" />
      <br/><br/>
      Click Submit for Form Post<input type="submit" />
      <br/>
      Or Click Ajax for Post via Ajax call <button onclick="postViaJs()">Ajax</button>

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

