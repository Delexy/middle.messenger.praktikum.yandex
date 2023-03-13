const express = require('express');
const server = express();

const PORT = process.env.PORT || 3000;
server.use('/', express.static(__dirname + '/dist'));
server.get('*', (req, res) => {
  res.sendFile(__dirname + '/dist/index.html');
});

server.listen(PORT, () => {
  console.log(`Server start on ${PORT} port`);
});
