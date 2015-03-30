#!/usr/bin/env node

var write = require('fs').writeFileSync;
var mkdir = require('fs').mkdirSync;
var path = require('path');
var _ = require('lodash');

var title = process.argv[2];
var template = _.template(['<!doctype html>',
'<html>',
'<head>',
'\t<meta charset="utf-8">',
'\t<meta name="viewport" content="width=device-width, minimum-scale=1.0, initial-scale=1.0">',
'\t<title>Polymer Samples - <%= title %></title>',
'\t<script src="/bower_components/webcomponentsjs/webcomponents.js"></script>',
'\t<link rel="import" href="/bower_components/polymer/polymer.html">',
'</head>',
'<body>',
'<script>',
'</script>',
'</body>',
'</html>'].join('\n'));


if (!title) {
  console.error('Title must be followed');
  process.exit(-1);
}

var target = path.join(__dirname, 'samples', title.toLowerCase().replace(/ /gi, '-'));

mkdir(target)
write(path.join(target, 'index.html'), template({title: title}));
