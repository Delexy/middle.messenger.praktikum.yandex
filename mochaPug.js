const fs = require('fs');

require.extensions['.pug'] = function (module, filename) {
  const contents = fs.readFileSync(filename, 'utf-8');

  module.exports = contents;
}
