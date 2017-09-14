/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/
var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10 // Seconds.
};

var requestHandler = function(request, response) {
  console.log('Serving request type ' + request.method + ' for url ' + request.url);
  var statusCode = 404;
  var headers = defaultCorsHeaders;
  headers['Content-Type'] = 'text/json';

  const {method, url} = request;
  if (request.method === 'GET' && request.url === '/classes/messages') {
    statusCode = 200;
    response.writeHead(statusCode, headers);
    let results = [];
    request.on('error', (err) => {
      console.error(err);
    }).on('data', (chunk) => {
      results.push(chunk);
    }).on('end', () => {
      const responseBody = {headers, method, url, results};
      response.end(JSON.stringify(responseBody));
    });
  }

  if (request.method === 'POST' && request.url === '/classes/messages') {
    statusCode = 201;
    response.writeHead(statusCode, headers);
    let results = [];
    request.on('error', (err) => {
      console.error(err);
    }).on('data', (chunk) => {
      results.push(chunk);
    }).on('end', () => {
      const responseBody = {headers, method, url, results};

      response.end(JSON.stringify(responseBody));
    });
  }

  response.on('error', (err) => {
    console.error(err);
  });
};


module.exports = requestHandler;
