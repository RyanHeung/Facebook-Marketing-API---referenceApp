/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

var APIHelper = require('./APIHelper');

var json = require('./json');

var _createInstance = function(_context, _id, _json) {
  if (!_context) {
    _context = {};
  }

  var _fields = {};
  // load from json
  if (_json) {
    _fields.id = _json.id;
    _fields.name = _json.name;

    // set id from json
    if (!_id) {
      _id = _fields.id;
    }
  } else {
    _fields.id = _id;
  }

  // context save

  // pre-computed varaibles
  var _endpoint = '/' + _id;
  var _idArray = Array.isArray(_id);

  // create internal types
  var __json = {
    initFromData: function(context, data) {
      return data;
    },
  };
  var __self = {
    initFromData: function(context, data) {
      return _createInstance(context, null, data);
    },
  };

  return {
    get id() {
      return _fields.id;
    },
    get name() {
      return _fields.name;
    },
    get: function() {
      var _params = {};

      var _required = {};
      var _this = {
        require: function() {
          for (var i = 0; i < arguments.length; ++i) {
            _required[arguments[i]] = true;
          }
          return _this;
        },
        set: function(obj) {
          return _this;
        },
        done: function() {
          var fields = [];
          if (_required.id || _required.id) {
            fields.push('id');
          }
          if (_required.name || _required.name) {
            fields.push('name');
          }
          if (fields && fields.length > 0) {
            _params.fields = fields.join();
          }

          var endpoint;
          if (_idArray) {
            endpoint = '/';
            _params.ids = _id.join();
          } else {
            endpoint = _endpoint + '/';
          }
          var promise = _context.adsAPI.call(
            'GET',
            endpoint,
            _params
          );

          return APIHelper.makeAPIResponse(
            APIHelper.cloneObject(_context),
            promise,
            __self.initFromData
          );
        },
      };
      return _this;
    },
    getAccounts: function() {
      var _params = {};

      var _this = {
        set: function(obj) {
          return _this;
        },
        done: function() {

          var endpoint;
          if (_idArray) {
            endpoint = '/accounts';
            _params.ids = _id.join();
          } else {
            endpoint = _endpoint + '/accounts';
          }
          var promise = _context.adsAPI.call(
            'GET',
            endpoint,
            _params
          );

          return APIHelper.makeAPIResponse(
            APIHelper.cloneObject(_context),
            promise,
            json.initFromData
          );
        },
      };
      return _this;
    },
  };
};

module.exports = {
  init: function(context, id) {
    return _createInstance(context, id);
  },
  initFromData: function(context, json) {
    return _createInstance(context, null, json);
  },
};