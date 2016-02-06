/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

var APIHelper = require('./APIHelper');

var ad = require('./ad');
var adSet = require('./adSet');
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
    _fields.adSets = _json.adgroups;
    _fields.buyingType = _json.buying_type;
    _fields.status = _json.campaign_group_status;
    _fields.name = _json.name;
    _fields.objective = _json.objective;
    _fields.spendCap = _json.spend_cap;

    // set id from json
    if (!_id) {
      _id = _fields.id;
    }
  } else {
    _fields.id = _id;
  }

  // context save
  _context.campaignId = _fields.id;
  _context.accountId = _fields.accountId;

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
    get adSets() {
      return _fields.adSets;
    },
    get buyingType() {
      return _fields.buyingType;
    },
    get status() {
      return _fields.status;
    },
    get name() {
      return _fields.name;
    },
    get objective() {
      return _fields.objective;
    },
    get spendCap() {
      return _fields.spendCap;
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
          if (_required.adSets || _required.adgroups) {
            fields.push('adgroups');
          }
          if (_required.buyingType || _required.buying_type) {
            fields.push('buying_type');
          }
          if (_required.status || _required.campaign_group_status) {
            fields.push('campaign_group_status');
          }
          if (_required.name || _required.name) {
            fields.push('name');
          }
          if (_required.objective || _required.objective) {
            fields.push('objective');
          }
          if (_required.spendCap || _required.spend_cap) {
            fields.push('spend_cap');
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
        set status(value) {
          _params['campaign_group_status'] = value;
        },
        set executionOptions(value) {
          _params['execution_options'] = value;
        },
        set name(value) {
          _params['name'] = value;
        },
        set objective(value) {
          _params['objective'] = value;
        },
        set spendCap(value) {
          _params['spend_cap'] = value;
        },
        set: function(obj) {
          if (obj.status || obj.campaign_group_status) {
            _params['campaign_group_status'] =
              obj.status || obj.campaign_group_status;
          }
          if (obj.executionOptions || obj.execution_options) {
            _params['execution_options'] =
              obj.executionOptions || obj.execution_options;
          }
          if (obj.name || obj.name) {
            _params['name'] =
              obj.name || obj.name;
          }
          if (obj.objective || obj.objective) {
            _params['objective'] =
              obj.objective || obj.objective;
          }
          if (obj.spendCap || obj.spend_cap) {
            _params['spend_cap'] =
              obj.spendCap || obj.spend_cap;
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
    getAdSets: function() {
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
          _params['campaign_status'] = value;
        },
        set isCompleted(value) {
          _params['is_completed'] = value;
        },
        set: function(obj) {
          if (obj.status || obj.campaign_status) {
            _params['campaign_status'] =
              obj.status || obj.campaign_status;
          }
          if (obj.isCompleted || obj.is_completed) {
            _params['is_completed'] =
              obj.isCompleted || obj.is_completed;
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
            endpoint = '/adcampaigns';
            _params.ids = _id.join();
          } else {
            endpoint = _endpoint + '/adcampaigns';
          }
          var promise = _context.adsAPI.call(
            'GET',
            endpoint,
            _params
          );

          return APIHelper.makeAPIResponse(
            APIHelper.cloneObject(_context),
            promise,
            adSet.initFromData
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
        set startTime(value) {
          _params['start_time'] = value;
        },
        set endTime(value) {
          _params['end_time'] = value;
        },
        set: function(obj) {
          if (obj.startTime || obj.start_time) {
            _params['start_time'] =
              obj.startTime || obj.start_time;
          }
          if (obj.endTime || obj.end_time) {
            _params['end_time'] =
              obj.endTime || obj.end_time;
          }
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
    createAdSet: function() {
      // TODO: deal with the case while account_id is not in the context
      return require('./adAccount').init(APIHelper.cloneObject(_context), _context.actId).createAdSet();
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