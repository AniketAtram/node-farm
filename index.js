const PORT = 8000;
const HOST = '127.0.0.1';

const fs = require('fs');
const http = require('http');

data = fs.readFileSync(`./dev-data/data.json`, 'utf-8');

const server = http.createServer((req, res) => {
  if(req.url === '/api/data'){
    res.writeHead(200,{
      "Content-Type": "application/json"
    });
    res.end(data);
  }
  else{
    res.end("Hello from basic http server");
  }

});

server.listen(PORT, HOST, () => { console.log(`Server started at http://${HOST}:${PORT}`) });