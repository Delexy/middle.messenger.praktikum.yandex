const express = require('express');
const server = express();

server.use('/', express.static(__dirname + '/static'));

server.listen(3000, () => {
  console.log('Server start on 3000 port');
});