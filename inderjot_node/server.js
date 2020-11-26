var express =require('express')
const fs = require('fs');
const app = express()
const port = 3000
var path = require('path');

var https = require('https');

const options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
};
app.use('/static', express.static(__dirname + '/..'));
app.use(express.static(__dirname + '/..'));


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/lecture/:type/:lecture_number', (req, res) => {
    console.log( path.join(__dirname + `/../${req.params.type}/lecture${req.params.lecture_number}/index.html`));
    fs.readFile(
        path.join(__dirname + `/../${req.params.type}/lecture${req.params.lecture_number}/index.html`),
            (error, pgResp) => {
                if (error) {
                    res.writeHead(404);
                    res.write(`Lecture ${req.params.lecture_number} of type ${req.params.type} does not exists`);
                } else {
                    console.log(pgResp)
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.write(pgResp);
            }
                res.end();
            });
});

var httpsServer = https.createServer(options, app);

httpsServer.listen(port);