/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

var express = require("express");
var app = express();

// serves main page
app.get("/", function(req, res) {
  res.redirect('/index.html')
});

// serves all the static files
var production = process.env.NODE_ENV === 'production';
if (production) {
  app.use(express.static(__dirname + '/dist/prod'));
} else {
  app.use(express.static(__dirname + '/dist/dev'));
}

// start the server
var port = 8080;
app.listen(port, function() {
  console.log("Listening on " + port);
});
