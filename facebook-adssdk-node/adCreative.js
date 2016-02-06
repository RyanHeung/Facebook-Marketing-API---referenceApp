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
    _fields.actorId = _json.actor_id;
    _fields.body = _json.body;
    _fields.callToActionType = _json.call_to_action_type;
    _fields.followRedirect = _json.follow_redirect;
    _fields.imageCrops = _json.image_crops;
    _fields.imageFile = _json.image_file;
    _fields.imageHash = _json.image_hash;
    _fields.imageUrl = _json.image_url;
    _fields.linkUrl = _json.link_url;
    _fields.name = _json.name;
    _fields.objectId = _json.object_id;
    _fields.objectStoryId = _json.object_story_id;
    _fields.objectStorySpec = _json.object_story_spec;
    _fields.objectUrl = _json.object_url;
    _fields.runStatus = _json.run_status;
    _fields.title = _json.title;
    _fields.urlTags = _json.url_tags;
    _fields.thumbnailUrl = _json.thumbnail_url;
    _fields.objectType = _json.object_type;

    // set id from json
    if (!_id) {
      _id = _fields.id;
    }
  } else {
    _fields.id = _id;
  }

  // context save
  _context.creativeId = _fields.id;

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
    get actorId() {
      return _fields.actorId;
    },
    get body() {
      return _fields.body;
    },
    get callToActionType() {
      return _fields.callToActionType;
    },
    get followRedirect() {
      return _fields.followRedirect;
    },
    get imageCrops() {
      return _fields.imageCrops;
    },
    get imageFile() {
      return _fields.imageFile;
    },
    get imageHash() {
      return _fields.imageHash;
    },
    get imageUrl() {
      return _fields.imageUrl;
    },
    get linkUrl() {
      return _fields.linkUrl;
    },
    get name() {
      return _fields.name;
    },
    get objectId() {
      return _fields.objectId;
    },
    get objectStoryId() {
      return _fields.objectStoryId;
    },
    get objectStorySpec() {
      return _fields.objectStorySpec;
    },
    get objectUrl() {
      return _fields.objectUrl;
    },
    get runStatus() {
      return _fields.runStatus;
    },
    get title() {
      return _fields.title;
    },
    get urlTags() {
      return _fields.urlTags;
    },
    get thumbnailUrl() {
      return _fields.thumbnailUrl;
    },
    get objectType() {
      return _fields.objectType;
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
          if (_required.actorId || _required.actor_id) {
            fields.push('actor_id');
          }
          if (_required.body || _required.body) {
            fields.push('body');
          }
          if (_required.callToActionType || _required.call_to_action_type) {
            fields.push('call_to_action_type');
          }
          if (_required.followRedirect || _required.follow_redirect) {
            fields.push('follow_redirect');
          }
          if (_required.imageCrops || _required.image_crops) {
            fields.push('image_crops');
          }
          if (_required.imageFile || _required.image_file) {
            fields.push('image_file');
          }
          if (_required.imageHash || _required.image_hash) {
            fields.push('image_hash');
          }
          if (_required.imageUrl || _required.image_url) {
            fields.push('image_url');
          }
          if (_required.linkUrl || _required.link_url) {
            fields.push('link_url');
          }
          if (_required.name || _required.name) {
            fields.push('name');
          }
          if (_required.objectId || _required.object_id) {
            fields.push('object_id');
          }
          if (_required.objectStoryId || _required.object_story_id) {
            fields.push('object_story_id');
          }
          if (_required.objectStorySpec || _required.object_story_spec) {
            fields.push('object_story_spec');
          }
          if (_required.objectUrl || _required.object_url) {
            fields.push('object_url');
          }
          if (_required.runStatus || _required.run_status) {
            fields.push('run_status');
          }
          if (_required.title || _required.title) {
            fields.push('title');
          }
          if (_required.urlTags || _required.url_tags) {
            fields.push('url_tags');
          }
          if (_required.thumbnailUrl || _required.thumbnail_url) {
            fields.push('thumbnail_url');
          }
          if (_required.objectType || _required.object_type) {
            fields.push('object_type');
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
    update: function() {
      var _params = {};

      var _this = {
        set name(value) {
          _params['name'] = value;
        },
        set: function(obj) {
          if (obj.name || obj.name) {
            _params['name'] =
              obj.name || obj.name;
          }
          return _this;
        },
        attachFileStream: function(stream) {
          _params[stream.name] = stream;
          return _this;
        },
        done: function() {
          var endpoint;
          if (_idArray) {
            endpoint = '/';
            _params.ids = _id.join();
          } else {
            endpoint = _endpoint + '/';
          }
          var promise = _context.adsAPI.call(
            'POST',
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
    delete: function() {
      var _params = {};

      var _this = {
        set: function(obj) {
          return _this;
        },
        done: function() {
          var endpoint;
          if (_idArray) {
            endpoint = '/';
            _params.ids = _id.join();
          } else {
            endpoint = _endpoint + '/';
          }
          var promise = _context.adsAPI.call(
            'DELETE',
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
    getPreviews: function() {
      var _params = {};

      var _this = {
        set: function(obj) {
          return _this;
        },
        done: function() {

          var endpoint;
          if (_idArray) {
            endpoint = '/previews';
            _params.ids = _id.join();
          } else {
            endpoint = _endpoint + '/previews';
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