const fs = require('fs');

require.extensions['.pug'] = function (module, filename) {
  // тут можешь прочитать содержимое файла и как-то его обработать при необходимости
  const contents = fs.readFileSync(filename, 'utf-8');

  module.exports = contents;
}
