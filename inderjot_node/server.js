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

app.use(express.static(__dirname + '/..'));


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/:type/:lecture_number', (req, res) => {
    fs.readFile(
        path.join(__dirname + `/../${req.params.type}/lecture${req.params.lecture_number}/index.html`),
            (error, pgResp) => {
                if (error) {
                    resp.writeHead(404);
                    resp.write('Contents you are looking are Not Found');
                } else {
                    resp.writeHead(200, { 'Content-Type': 'text/html' });
                    resp.write(pgResp);
            }
         
                resp.end();
            });

    // console.log(path.join(__dirname + `/../${req.params.type}/lecture${req.params.lecture_number}/index.html`))
    // res.sendFile(path.join(__dirname + `/../${req.params.type}/lecture${req.params.lecture_number}/index.html`))
});

// app.listen(port, () => {
//     console.log(`Example app listening at http://localhost:${port}`)
// })

var httpsServer = https.createServer(options, app);

httpsServer.listen(port);