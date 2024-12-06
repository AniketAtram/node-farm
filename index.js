const PORT = 8000;
const HOST = '127.0.0.1';

const fs = require('fs');
const http = require('http');

data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');
tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');

const replaceTemplate = (template, product) => {
  let output = template.replace(/{%PRODUCTNAME%}/g, product.productName);
  output = output.replace(/{%IMAGE%}/g, product.image);
  output = output.replace(/{%FROM%}/g, product.from);
  output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
  output = output.replace(/{%QUANTITY%}/g, product.quantity);
  output = output.replace(/{%PRICE%}/g, product.price);
  output = output.replace(/{%DESCRIPTION%}/g, product.description);

  if (!product.organic) output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');

  return output;

}

const server = http.createServer((req, res) => {
  if (req.url === "/" || req.url === "/overview") {
    const cardHtml  = dataObj.map(el => replaceTemplate(tempCard, el)).join('');
    const overviewHtml = tempOverview.replace(/{%PRODUCT_CARDS%}/g, cardHtml);
    res.writeHead(200, {
      "Content-Type": "text/html"
    })
    res.end(overviewHtml);
  }
  else if (req.url === "/product") {
    res.writeHead(200, {
      "Content-Type": "text/html"
    })
    res.end(tempProduct)
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