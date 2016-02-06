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
    getPromotablePosts: function() {
      var _params = {};

      var _required = {};
      var _this = {
        require: function() {
          for (var i = 0; i < arguments.length; ++i) {
            _required[arguments[i]] = true;
          }
          return _this;
        },
        set includeHidden(value) {
          _params['include_hidden'] = value;
        },
        set filter(value) {
          _params['filter'] = value;
        },
        set isInline(value) {
          _params['is_inline'] = value;
        },
        set isPublished(value) {
          _params['is_published'] = value;
        },
        set: function(obj) {
          if (obj.includeHidden || obj.include_hidden) {
            _params['include_hidden'] =
              obj.includeHidden || obj.include_hidden;
          }
          if (obj.filter || obj.filter) {
            _params['filter'] =
              obj.filter || obj.filter;
          }
          if (obj.isInline || obj.is_inline) {
            _params['is_inline'] =
              obj.isInline || obj.is_inline;
          }
          if (obj.isPublished || obj.is_published) {
            _params['is_published'] =
              obj.isPublished || obj.is_published;
          }
          return _this;
        },
        done: function() {
          var fields = [];
          if (_required.getPromotablePosts || _required.id) {
            fields.push('id');
          }
          if (_required.getPromotablePosts || _required.name) {
            fields.push('name');
          }
          if (_required.getPromotablePosts || _required.message) {
            fields.push('message');
          }
          if (_required.getPromotablePosts || _required.picture) {
            fields.push('picture');
          }
          if (fields && fields.length > 0) {
            _params.fields = fields.join();
          }

          var endpoint;
          if (_idArray) {
            endpoint = '/promotable_posts';
            _params.ids = _id.join();
          } else {
            endpoint = _endpoint + '/promotable_posts';
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