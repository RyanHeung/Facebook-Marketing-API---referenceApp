/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

var APIHelper = require('./APIHelper');

var ad = require('./ad');
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
    _fields.bidAmount = _json.bid_amount;
    _fields.optimizationGoal = _json.optimization_goal;
    _fields.billingEvent = _json.billing_event;
    _fields.rtbFlag = _json.rtb_flag;
    _fields.bidInfo = _json.bid_info;
    _fields.budgetRemaining = _json.budget_remaining;
    _fields.campaignId = _json.campaign_group_id;
    _fields.status = _json.campaign_status;
    _fields.createdTime = _json.created_time;
    _fields.creativeSequence = _json.creative_sequence;
    _fields.dailyBudget = _json.daily_budget;
    _fields.endTime = _json.end_time;
    _fields.isAutobid = _json.is_autobid;
    _fields.lifetimeBudget = _json.lifetime_budget;
    _fields.name = _json.name;
    _fields.promotedObject = _json.promoted_object;
    _fields.rfPredictionId = _json.rf_prediction_id;
    _fields.startTime = _json.start_time;
    _fields.targeting = _json.targeting;
    _fields.updatedTime = _json.updated_time;

    // set id from json
    if (!_id) {
      _id = _fields.id;
    }
  } else {
    _fields.id = _id;
  }

  // context save
  _context.adSetId = _fields.id;
  _context.accountId = _fields.accountId;
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
    get bidAmount() {
      return _fields.bidAmount;
    },
    get optimizationGoal() {
      return _fields.optimizationGoal;
    },
    get billingEvent() {
      return _fields.billingEvent;
    },
    get rtbFlag() {
      return _fields.rtbFlag;
    },
    get bidInfo() {
      return _fields.bidInfo;
    },
    get budgetRemaining() {
      return _fields.budgetRemaining;
    },
    get campaignId() {
      return _fields.campaignId;
    },
    get status() {
      return _fields.status;
    },
    get createdTime() {
      return _fields.createdTime;
    },
    get creativeSequence() {
      return _fields.creativeSequence;
    },
    get dailyBudget() {
      return _fields.dailyBudget;
    },
    get endTime() {
      return _fields.endTime;
    },
    get isAutobid() {
      return _fields.isAutobid;
    },
    get lifetimeBudget() {
      return _fields.lifetimeBudget;
    },
    get name() {
      return _fields.name;
    },
    get promotedObject() {
      return _fields.promotedObject;
    },
    get rfPredictionId() {
      return _fields.rfPredictionId;
    },
    get startTime() {
      return _fields.startTime;
    },
    get targeting() {
      return _fields.targeting;
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
          if (_required.bidAmount || _required.bid_amount) {
            fields.push('bid_amount');
          }
          if (_required.optimizationGoal || _required.optimization_goal) {
            fields.push('optimization_goal');
          }
          if (_required.billingEvent || _required.billing_event) {
            fields.push('billing_event');
          }
          if (_required.rtbFlag || _required.rtb_flag) {
            fields.push('rtb_flag');
          }
          if (_required.bidInfo || _required.bid_info) {
            fields.push('bid_info');
          }
          if (_required.budgetRemaining || _required.budget_remaining) {
            fields.push('budget_remaining');
          }
          if (_required.campaignId || _required.campaign_group_id) {
            fields.push('campaign_group_id');
          }
          if (_required.status || _required.campaign_status) {
            fields.push('campaign_status');
          }
          if (_required.createdTime || _required.created_time) {
            fields.push('created_time');
          }
          if (_required.creativeSequence || _required.creative_sequence) {
            fields.push('creative_sequence');
          }
          if (_required.dailyBudget || _required.daily_budget) {
            fields.push('daily_budget');
          }
          if (_required.endTime || _required.end_time) {
            fields.push('end_time');
          }
          if (_required.isAutobid || _required.is_autobid) {
            fields.push('is_autobid');
          }
          if (_required.lifetimeBudget || _required.lifetime_budget) {
            fields.push('lifetime_budget');
          }
          if (_required.name || _required.name) {
            fields.push('name');
          }
          if (_required.promotedObject || _required.promoted_object) {
            fields.push('promoted_object');
          }
          if (_required.rfPredictionId || _required.rf_prediction_id) {
            fields.push('rf_prediction_id');
          }
          if (_required.startTime || _required.start_time) {
            fields.push('start_time');
          }
          if (_required.targeting || _required.targeting) {
            fields.push('targeting');
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
        set bidAmount(value) {
          _params['bid_amount'] = value;
        },
        set optimizationGoal(value) {
          _params['optimization_goal'] = value;
        },
        set billingEvent(value) {
          _params['billing_event'] = value;
        },
        set status(value) {
          _params['campaign_status'] = value;
        },
        set creativeSequence(value) {
          _params['creative_sequence'] = value;
        },
        set dailyBudget(value) {
          _params['daily_budget'] = value;
        },
        set endTime(value) {
          _params['end_time'] = value;
        },
        set isAutobid(value) {
          _params['is_autobid'] = value;
        },
        set lifetimeBudget(value) {
          _params['lifetime_budget'] = value;
        },
        set name(value) {
          _params['name'] = value;
        },
        set promotedObject(value) {
          _params['promoted_object'] = value;
        },
        set rfPredictionId(value) {
          _params['rf_prediction_id'] = value;
        },
        set startTime(value) {
          _params['start_time'] = value;
        },
        set targeting(value) {
          _params['targeting'] = value;
        },
        set: function(obj) {
          if (obj.bidAmount || obj.bid_amount) {
            _params['bid_amount'] =
              obj.bidAmount || obj.bid_amount;
          }
          if (obj.optimizationGoal || obj.optimization_goal) {
            _params['optimization_goal'] =
              obj.optimizationGoal || obj.optimization_goal;
          }
          if (obj.billingEvent || obj.billing_event) {
            _params['billing_event'] =
              obj.billingEvent || obj.billing_event;
          }
          if (obj.status || obj.campaign_status) {
            _params['campaign_status'] =
              obj.status || obj.campaign_status;
          }
          if (obj.creativeSequence || obj.creative_sequence) {
            _params['creative_sequence'] =
              obj.creativeSequence || obj.creative_sequence;
          }
          if (obj.dailyBudget || obj.daily_budget) {
            _params['daily_budget'] =
              obj.dailyBudget || obj.daily_budget;
          }
          if (obj.endTime || obj.end_time) {
            _params['end_time'] =
              obj.endTime || obj.end_time;
          }
          if (obj.isAutobid || obj.is_autobid) {
            _params['is_autobid'] =
              obj.isAutobid || obj.is_autobid;
          }
          if (obj.lifetimeBudget || obj.lifetime_budget) {
            _params['lifetime_budget'] =
              obj.lifetimeBudget || obj.lifetime_budget;
          }
          if (obj.name || obj.name) {
            _params['name'] =
              obj.name || obj.name;
          }
          if (obj.promotedObject || obj.promoted_object) {
            _params['promoted_object'] =
              obj.promotedObject || obj.promoted_object;
          }
          if (obj.rfPredictionId || obj.rf_prediction_id) {
            _params['rf_prediction_id'] =
              obj.rfPredictionId || obj.rf_prediction_id;
          }
          if (obj.startTime || obj.start_time) {
            _params['start_time'] =
              obj.startTime || obj.start_time;
          }
          if (obj.targeting || obj.targeting) {
            _params['targeting'] =
              obj.targeting || obj.targeting;
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
    getAds: function() {
      var _params = {};

      var _required = {};
      var _this = {
        require: function() {
          for (var i = 0; i < arguments.length; ++i) {
            _required[arguments[i]] = true;
          }
          return _this;
        },
        set status(value) {
          _params['adgroup_status'] = value;
        },
        set: function(obj) {
          if (obj.status || obj.adgroup_status) {
            _params['adgroup_status'] =
              obj.status || obj.adgroup_status;
          }
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
            endpoint = '/adgroups';
            _params.ids = _id.join();
          } else {
            endpoint = _endpoint + '/adgroups';
          }
          var promise = _context.adsAPI.call(
            'GET',
            endpoint,
            _params
          );

          return APIHelper.makeAPIResponse(
            APIHelper.cloneObject(_context),
            promise,
            ad.initFromData
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
            endpoint = '/adcreatives/';
            _params.ids = _id.join();
          } else {
            endpoint = _endpoint + '/adcreatives/';
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
    createAd: function() {
      // TODO: deal with the case while account_id is not in the context
      return require('./adAccount').init(APIHelper.cloneObject(_context), _context.actId).createAd();
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