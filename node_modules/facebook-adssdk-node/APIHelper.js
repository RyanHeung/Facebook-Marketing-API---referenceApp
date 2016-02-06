/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

var Promise = require('promise');

var _chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

module.exports = {
  makeAPIResponse: function(context, promise, loader) {
    return promise.then(function(response) {
      var _object = {};
      var _sliceData = function() {
        var offset = _object.pageIndex * _object.pageSize;
        if (offset < _object.cache.length) {
          _object.data = _object.cache.slice(offset, offset + _object.pageSize);
        } else {
          _object.data = null;
        }
      };

      if (response.paging) {
        _object.paging = true;
        _object.pageSize = 25;
        _object.pageIndex = 0;
        if (response.count) {
          _object.count = response.count;
        }

        _object.cache = [];
        response.data.forEach(function(data) {
          _object.cache.push(loader(context, data));
        });
        if (_object.pageSize < _object.cache.length) {
          _object.pageSize = _object.cache.length;
        }
        _sliceData();

        _object.next = function() {
          var lastOffset = (_object.pageIndex + 2) * _object.pageSize;
          if (lastOffset > _object.cache.length) {
            var fetchCount = lastOffset - _object.cache.length;
            return response.fetch(fetchCount).then(function(nextResp) {
              if (nextResp.data) {
                nextResp.data.forEach(function(data) {
                  _object.cache.push(loader(context, data));
                });
              }

              ++_object.pageIndex;
              _sliceData();
              return _object;
            });
          } else {
            return new Promise(function(resolve, reject) {
              ++_object.pageIndex;
              _sliceData();
              resolve(_object);
            });
          }
        };
        _object.previous = function() {
          return new Promise(function(resolve, reject) {
            if (_object.pageIndex > 0) {
              --_object.pageIndex;
              _sliceData();
            } else {
              _object.data = null;
            }
            resolve(_object);
          });
        };
      } else {
        _object.paging = false;
        _object.data = loader(context, response.data);
      }
      return _object;
    });
  },
  cloneObject: function(obj) {
    var retObj = {};
    for (var prop in obj) {
      if (obj.hasOwnProperty(prop)) {
          retObj[prop] = obj[prop];
      }
    }
    return retObj;
  },
  randomString: function(length) {
    var randStr = '';
    for (var i = 0; i < length; ++i) {
      var rand = Math.floor(Math.random() * _chars.length);
      randStr += _chars.substring(rand, rand + 1);
    }
    return randStr;
  }
};
