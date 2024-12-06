const PORT = 8000;
const HOST = '127.0.0.1';

const fs = require('fs');
const http = require('http');
const url = require('url');

const replaceTemplate = require('./custom_modules/replaceTemplate');

data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');
tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');

const server = http.createServer((req, res) => {

  const {pathname, query} = url.parse(req.url, true)

  if (pathname === "/" || pathname === "/overview") {
    const cardHtml  = dataObj.map(el => replaceTemplate(tempCard, el)).join('');
    const overviewHtml = tempOverview.replace(/{%PRODUCT_CARDS%}/g, cardHtml);
    res.writeHead(200, {
      "Content-Type": "text/html"
    })
    res.end(overviewHtml);
  }
  else if (pathname === "/product") {
    const productObj = dataObj[query.id];
    const productHtml = replaceTemplate(tempProduct, productObj);
    res.writeHead(200, {
      "Content-Type": "text/html"
    })
    res.end(productHtml)
  }
  else {
    res.writeHead(404, {
      "Content-Type": "text/html"
    })
    res.end(
      "<h1>Page not found!</h1>"
    )
  }

});

server.listen(PORT, HOST, () => { console.log(`Server started at http://${HOST}:${PORT}`) });