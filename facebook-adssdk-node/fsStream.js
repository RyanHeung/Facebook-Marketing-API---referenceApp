/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

var fs = require('fs');

module.exports = function(path, options) {
  var stream = fs.createReadStream(path, options);
  stream.size = fs.statSync(path)['size'];
  stream.name = path.basename(path);
  return stream;
};
