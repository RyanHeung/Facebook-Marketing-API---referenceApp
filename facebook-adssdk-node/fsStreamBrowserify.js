/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

var EventEmitter = require('events').EventEmitter;

module.exports = function(file) {
  var stream = new EventEmitter();
  stream.size = file.size;
  stream.name = file.name;
  stream.pipe = function(dest) {
    var reader = new FileReader();
    reader.onloadend = function() {
      dest.write(new Uint8Array(reader.result));
      stream.emit('end', stream.size);
    };
    reader.onerror = function() {
      stream.emit('error', reader.error);
    };
    reader.readAsArrayBuffer(file);
  };

  return stream;
};
