const fs = require('fs');
const lessToJs = require('less-vars-to-js');
const paths = require('./paths');

let vars = {};

try {
  const themeLessFile = fs.readFileSync(paths.appTheme, 'utf8');
  vars = lessToJs(themeLessFile, {
    resolveVariables: true,
    stripPrefix: true
  });
} catch(e) {
  console.error(e);
}

module.exports = vars;
