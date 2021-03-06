
'use latest';
/***
 *  Coded for use on https://webtask.io 
 *  service for serverless endpoints
 *
 ***/
import express from 'express';
import { fromExpress } from 'webtask-tools';
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
  const HTML = renderView({
    title: 'Test Post Cors from Form Sumbit and Ajax',
    destUrl: 'https://team.quickbase.com/db/main?a=QBI_logtrack&xml=true'
  });

  res.set('Content-Type', 'text/html');
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
    </head>

    <body>
      <h1>Test Post Cors from Form Sumbit and Ajax Call</h1>
      <form method="POST" action="${locals.destUrl}">
        Enter anything here <input type="text" name="lg" />
        <br/>
        <br/>
        Click Submit button for form Post <input type="submit" />
        Or click Ajax button for Post via ajax call <button onclick="postViaJs()">Ajax</button>
        <p>Sends to ${locals.destUrl}</p>
      </form>
      
      <script> function postViaJs() { 
        var urlForAjax = "${locals.destUrl}" + "&fromAjax=true";
        var inputValue = document.getElementsByName('lg')[0].value;
        var requestConfig = { 
          url : urlForAjax, 
          method: 'post', 
          data: {lg: inputValue },
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
