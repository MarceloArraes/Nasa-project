const http = require('http');
const app = require('./app');

const server = http.createServer(app);
const PORT = process.env.PORT || 8000;

/*
app.listen(); */

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
} );

