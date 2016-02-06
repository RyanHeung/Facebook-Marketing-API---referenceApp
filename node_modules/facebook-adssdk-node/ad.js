/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

var APIHelper = require('./APIHelper');

var adCreative = require('./adCreative');
var json = require('./json');

var _createInstance = function(_context, _id, _json) {
  if (!_context) {
    _context = {};
  }

  var _fields = {};
  // load from json
  if (_json) {
    _fields.id = _json.id;
    _fields.accountId = _json.account_id;
    _fields.reviewFeedback = _json.review_feedback;
    _fields.status = _json.adgroup_status;
    _fields.bidAmount = _json.bid_amount;
    _fields.bidType = _json.bid_type;
    _fields.bidInfo = _json.bid_info;
    _fields.adSetId = _json.campaign_id;
    _fields.campaignId = _json.campaign_group_id;
    _fields.conversionSpecs = _json.conversion_specs;
    _fields.createdTime = _json.created_time;
    _fields.creative = _json.creative;
    _fields.failedDeliveryChecks = _json.failed_delivery_checks;
    _fields.name = _json.name;
    _fields.targeting = _json.targeting;
    _fields.trackingSpecs = _json.tracking_specs;
    _fields.updatedTime = _json.updated_time;

    // set id from json
    if (!_id) {
      _id = _fields.id;
    }
  } else {
    _fields.id = _id;
  }

  // context save
  _context.adId = _fields.id;
  _context.accountId = _fields.accountId;
  _context.adSetId = _fields.adSetId;
  _context.campaignId = _fields.campaignId;

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
    get accountId() {
      return _fields.accountId;
    },
    get reviewFeedback() {
      return _fields.reviewFeedback;
    },
    get status() {
      return _fields.status;
    },
    get bidAmount() {
      return _fields.bidAmount;
    },
    get bidType() {
      return _fields.bidType;
    },
    get bidInfo() {
      return _fields.bidInfo;
    },
    get adSetId() {
      return _fields.adSetId;
    },
    get campaignId() {
      return _fields.campaignId;
    },
    get conversionSpecs() {
      return _fields.conversionSpecs;
    },
    get createdTime() {
      return _fields.createdTime;
    },
    get creative() {
      return _fields.creative;
    },
    get failedDeliveryChecks() {
      return _fields.failedDeliveryChecks;
    },
    get name() {
      return _fields.name;
    },
    get targeting() {
      return _fields.targeting;
    },
    get trackingSpecs() {
      return _fields.trackingSpecs;
    },
    get updatedTime() {
      return _fields.updatedTime;
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
          if (_required.accountId || _required.account_id) {
            fields.push('account_id');
          }
          if (_required.reviewFeedback || _required.review_feedback) {
            fields.push('review_feedback');
          }
          if (_required.status || _required.adgroup_status) {
            fields.push('adgroup_status');
          }
          if (_required.bidAmount || _required.bid_amount) {
            fields.push('bid_amount');
          }
          if (_required.bidType || _required.bid_type) {
            fields.push('bid_type');
          }
          if (_required.bidInfo || _required.bid_info) {
            fields.push('bid_info');
          }
          if (_required.adSetId || _required.campaign_id) {
            fields.push('campaign_id');
          }
          if (_required.campaignId || _required.campaign_group_id) {
            fields.push('campaign_group_id');
          }
          if (_required.conversionSpecs || _required.conversion_specs) {
            fields.push('conversion_specs');
          }
          if (_required.createdTime || _required.created_time) {
            fields.push('created_time');
          }
          if (_required.creative || _required.creative) {
            fields.push('creative');
          }
          if (_required.failedDeliveryChecks || _required.failed_delivery_checks) {
            fields.push('failed_delivery_checks');
          }
          if (_required.name || _required.name) {
            fields.push('name');
          }
          if (_required.targeting || _required.targeting) {
            fields.push('targeting');
          }
          if (_required.trackingSpecs || _required.tracking_specs) {
            fields.push('tracking_specs');
          }
          if (_required.updatedTime || _required.updated_time) {
            fields.push('updated_time');
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
        set status(value) {
          _params['adgroup_status'] = value;
        },
        set bidAmount(value) {
          _params['bid_amount'] = value;
        },
        set creative(value) {
          _params['creative'] = value;
        },
        set trackingSpecs(value) {
          _params['tracking_specs'] = value;
        },
        set: function(obj) {
          if (obj.name || obj.name) {
            _params['name'] =
              obj.name || obj.name;
          }
          if (obj.status || obj.adgroup_status) {
            _params['adgroup_status'] =
              obj.status || obj.adgroup_status;
          }
          if (obj.bidAmount || obj.bid_amount) {
            _params['bid_amount'] =
              obj.bidAmount || obj.bid_amount;
          }
          if (obj.creative || obj.creative) {
            _params['creative'] =
              obj.creative || obj.creative;
          }
          if (obj.trackingSpecs || obj.tracking_specs) {
            _params['tracking_specs'] =
              obj.trackingSpecs || obj.tracking_specs;
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
    getCreatives: function() {
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
            endpoint = '/adcreatives';
            _params.ids = _id.join();
          } else {
            endpoint = _endpoint + '/adcreatives';
          }
          var promise = _context.adsAPI.call(
            'GET',
            endpoint,
            _params
          );

          return APIHelper.makeAPIResponse(
            APIHelper.cloneObject(_context),
            promise,
            adCreative.initFromData
          );
        },
      };
      return _this;
    },
    getStats: function() {
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
          if (_required.getStats || _required.impressions) {
            fields.push('impressions');
          }
          if (_required.getStats || _required.clicks) {
            fields.push('clicks');
          }
          if (_required.getStats || _required.spent) {
            fields.push('spent');
          }
          if (_required.getStats || _required.social_impressions) {
            fields.push('social_impressions');
          }
          if (_required.getStats || _required.social_clicks) {
            fields.push('social_clicks');
          }
          if (_required.getStats || _required.social_spent) {
            fields.push('social_spent');
          }
          if (_required.getStats || _required.unique_impressions) {
            fields.push('unique_impressions');
          }
          if (_required.getStats || _required.unique_clicks) {
            fields.push('unique_clicks');
          }
          if (_required.getStats || _required.social_unique_impressions) {
            fields.push('social_unique_impressions');
          }
          if (_required.getStats || _required.social_unique_clicks) {
            fields.push('social_unique_clicks');
          }
          if (_required.getStats || _required.actions) {
            fields.push('actions');
          }
          if (_required.getStats || _required.inline_actions) {
            fields.push('inline_actions');
          }
          if (_required.getStats || _required.account_id) {
            fields.push('account_id');
          }
          if (_required.getStats || _required.start_time) {
            fields.push('start_time');
          }
          if (_required.getStats || _required.end_time) {
            fields.push('end_time');
          }
          if (fields && fields.length > 0) {
            _params.fields = fields.join();
          }

          var endpoint;
          if (_idArray) {
            endpoint = '/stats';
            _params.ids = _id.join();
          } else {
            endpoint = _endpoint + '/stats';
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
    getInsights: function() {
      var _params = {};

      var _this = {
        set timeRanges(value) {
          _params['time_ranges'] = value;
        },
        set timeRange(value) {
          _params['time_range'] = value;
        },
        set datePreset(value) {
          _params['date_preset'] = value;
        },
        set timeIncrement(value) {
          _params['time_increment'] = value;
        },
        set fields(value) {
          _params['fields'] = value;
        },
        set breakdowns(value) {
          _params['breakdowns'] = value;
        },
        set sort(value) {
          _params['sort'] = value;
        },
        set level(value) {
          _params['level'] = value;
        },
        set filtering(value) {
          _params['filtering'] = value;
        },
        set actionBreakdowns(value) {
          _params['action_breakdowns'] = value;
        },
        set actionAttributionWindows(value) {
          _params['action_attribution_windows'] = value;
        },
        set actionReportTime(value) {
          _params['action_report_time'] = value;
        },
        set defaultSummary(value) {
          _params['default_summary'] = value;
        },
        set limit(value) {
          _params['limit'] = value;
        },
        set after(value) {
          _params['after'] = value;
        },
        set before(value) {
          _params['before'] = value;
        },
        set: function(obj) {
          if (obj.timeRanges || obj.time_ranges) {
            _params['time_ranges'] =
              obj.timeRanges || obj.time_ranges;
          }
          if (obj.timeRange || obj.time_range) {
            _params['time_range'] =
              obj.timeRange || obj.time_range;
          }
          if (obj.datePreset || obj.date_preset) {
            _params['date_preset'] =
              obj.datePreset || obj.date_preset;
          }
          if (obj.timeIncrement || obj.time_increment) {
            _params['time_increment'] =
              obj.timeIncrement || obj.time_increment;
          }
          if (obj.fields || obj.fields) {
            _params['fields'] =
              obj.fields || obj.fields;
          }
          if (obj.breakdowns || obj.breakdowns) {
            _params['breakdowns'] =
              obj.breakdowns || obj.breakdowns;
          }
          if (obj.sort || obj.sort) {
            _params['sort'] =
              obj.sort || obj.sort;
          }
          if (obj.level || obj.level) {
            _params['level'] =
              obj.level || obj.level;
          }
          if (obj.filtering || obj.filtering) {
            _params['filtering'] =
              obj.filtering || obj.filtering;
          }
          if (obj.actionBreakdowns || obj.action_breakdowns) {
            _params['action_breakdowns'] =
              obj.actionBreakdowns || obj.action_breakdowns;
          }
          if (obj.actionAttributionWindows || obj.action_attribution_windows) {
            _params['action_attribution_windows'] =
              obj.actionAttributionWindows || obj.action_attribution_windows;
          }
          if (obj.actionReportTime || obj.action_report_time) {
            _params['action_report_time'] =
              obj.actionReportTime || obj.action_report_time;
          }
          if (obj.defaultSummary || obj.default_summary) {
            _params['default_summary'] =
              obj.defaultSummary || obj.default_summary;
          }
          if (obj.limit || obj.limit) {
            _params['limit'] =
              obj.limit || obj.limit;
          }
          if (obj.after || obj.after) {
            _params['after'] =
              obj.after || obj.after;
          }
          if (obj.before || obj.before) {
            _params['before'] =
              obj.before || obj.before;
          }
          return _this;
        },
        done: function() {

          var endpoint;
          if (_idArray) {
            endpoint = '/insights';
            _params.ids = _id.join();
          } else {
            endpoint = _endpoint + '/insights';
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
    getPreviews: function() {
      var _params = {};

      var _this = {
        set adFormat(value) {
          _params['ad_format'] = value;
        },
        set: function(obj) {
          if (obj.adFormat || obj.ad_format) {
            _params['ad_format'] =
              obj.adFormat || obj.ad_format;
          }
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