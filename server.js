const express = require('express');
const server = express();

const PORT = process.env.PORT || 3000;
server.use('/', express.static(__dirname + '/static'));

server.listen(PORT, () => {
  console.log(`Server start on ${PORT} port`);
});
