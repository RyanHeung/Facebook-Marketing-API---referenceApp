/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

var _createInstance = function(json) {
  var instance = json;
  if (json) {
    if (Array.isArray(json)) {
      instance = json.map(function(value) {
        return _createInstance(value);
      });
    } else if (typeof(json) === 'object') {
      instance = {};
      for (var prop in json) {
        // To camelCase
        var parts = prop.split('_');
        var camelCaseProp = parts[0];
        for (var i = 1; i < parts.length; ++i) {
          var part = parts[i];
          camelCaseProp += part.charAt(0).toUpperCase() + part.slice(1);
        }
        instance[camelCaseProp] = _createInstance(json[prop]);
      }
    }
  }
  return instance;
};

module.exports = {
  initFromData: function(context, json) {
    return _createInstance(json);
  },
};
