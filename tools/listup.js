#!/usr/bin/env node

var fs = require('fs')
var path = require('path');
var files = fs.readdirSync('./samples');

files.forEach(function(f) {
  if (f.indexOf('.html') === -1 || f === 'index.html')
    return;

  var data = fs.readFileSync(path.join('./samples', f));
  var title = /<title>(.*)<\/title>/.exec(data);

  if (title && title.length > 1) {
    title = title[1].replace('Polymer Samples - ', '');
    console.log('<li><a href="./' + f + '"">' + title + '</a></li>');
  }
});
