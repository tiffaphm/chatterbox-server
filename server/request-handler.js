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

var msg = {results: []};

var requestHandler = function(request, response) {
  console.log('Serving request type ' + request.method + ' for url ' + request.url);
  var statusCode = 404;
  var headers = defaultCorsHeaders;
  headers['Content-Type'] = 'application/json';

  const {method, url} = request;

  if (!url.startsWith('/classes/messages')) {
    response.writeHead(statusCode, headers);
    response.end('statusCode');
  }

  if (method === 'GET' && url === '/classes/messages') {
    statusCode = 200;
    response.writeHead(statusCode, headers);
    request.on('error', (err) => {
      console.error(err);
    });
    response.end(JSON.stringify(msg));
  }
  
  if (method === 'POST' && url === '/classes/messages') {
    statusCode = 201;
    response.writeHead(statusCode, headers);
    request.on('error', (err) => {
      console.error(err);
    });
    request.on('data', (data) => {
      msg.results.push(JSON.parse(data));
    });
    response.end(console.log(msg.results));
  }
};

module.exports.requestHandler = requestHandler;
