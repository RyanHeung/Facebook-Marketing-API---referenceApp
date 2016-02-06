/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

var APIHelper = require('./APIHelper');

var ad = require('./ad');
var adCampaign = require('./adCampaign');
var adCreative = require('./adCreative');
var adSet = require('./adSet');
var conversionPixel = require('./conversionPixel');
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
    _fields.accountGroups = _json.account_groups;
    _fields.accountStatus = _json.account_status;
    _fields.age = _json.age;
    _fields.agencyClientDeclaration = _json.agency_client_declaration;
    _fields.amountSpent = _json.amount_spent;
    _fields.balance = _json.balance;
    _fields.business = _json.business;
    _fields.businessCity = _json.business_city;
    _fields.businessCountryCode = _json.business_country_code;
    _fields.businessName = _json.business_name;
    _fields.businessState = _json.business_state;
    _fields.businessStreet = _json.business_street;
    _fields.businessStreet2 = _json.business_street2;
    _fields.businessZip = _json.business_zip;
    _fields.capabilities = _json.capabilities;
    _fields.createdTime = _json.created_time;
    _fields.currency = _json.currency;
    _fields.dailySpendLimit = _json.daily_spend_limit;
    _fields.endAdvertiser = _json.end_advertiser;
    _fields.fundingSource = _json.funding_source;
    _fields.fundingSourceDetails = _json.funding_source_details;
    _fields.isPersonal = _json.is_personal;
    _fields.mediaAgency = _json.media_agency;
    _fields.name = _json.name;
    _fields.offsitePixelsTosAccepted = _json.offsite_pixels_tos_accepted;
    _fields.partner = _json.partner;
    _fields.rfSpec = _json.rf_spec;
    _fields.spendCap = _json.spend_cap;
    _fields.taxIdStatus = _json.tax_id_status;
    _fields.timezoneId = _json.timezone_id;
    _fields.timezoneName = _json.timezone_name;
    _fields.timezoneOffsetHoursUtc = _json.timezone_offset_hours_utc;
    _fields.tosAccepted = _json.tos_accepted;
    _fields.users = _json.users;

    // set id from json
    if (!_id) {
      _id = _fields.id;
    }
  } else {
    _fields.id = _id;
  }

  // context save
  _context.actId = _fields.id;
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
    get accountGroups() {
      return _fields.accountGroups;
    },
    get accountStatus() {
      return _fields.accountStatus;
    },
    get age() {
      return _fields.age;
    },
    get agencyClientDeclaration() {
      return _fields.agencyClientDeclaration;
    },
    get amountSpent() {
      return _fields.amountSpent;
    },
    get balance() {
      return _fields.balance;
    },
    get business() {
      return _fields.business;
    },
    get businessCity() {
      return _fields.businessCity;
    },
    get businessCountryCode() {
      return _fields.businessCountryCode;
    },
    get businessName() {
      return _fields.businessName;
    },
    get businessState() {
      return _fields.businessState;
    },
    get businessStreet() {
      return _fields.businessStreet;
    },
    get businessStreet2() {
      return _fields.businessStreet2;
    },
    get businessZip() {
      return _fields.businessZip;
    },
    get capabilities() {
      return _fields.capabilities;
    },
    get createdTime() {
      return _fields.createdTime;
    },
    get currency() {
      return _fields.currency;
    },
    get dailySpendLimit() {
      return _fields.dailySpendLimit;
    },
    get endAdvertiser() {
      return _fields.endAdvertiser;
    },
    get fundingSource() {
      return _fields.fundingSource;
    },
    get fundingSourceDetails() {
      return _fields.fundingSourceDetails;
    },
    get isPersonal() {
      return _fields.isPersonal;
    },
    get mediaAgency() {
      return _fields.mediaAgency;
    },
    get name() {
      return _fields.name;
    },
    get offsitePixelsTosAccepted() {
      return _fields.offsitePixelsTosAccepted;
    },
    get partner() {
      return _fields.partner;
    },
    get rfSpec() {
      return _fields.rfSpec;
    },
    get spendCap() {
      return _fields.spendCap;
    },
    get taxIdStatus() {
      return _fields.taxIdStatus;
    },
    get timezoneId() {
      return _fields.timezoneId;
    },
    get timezoneName() {
      return _fields.timezoneName;
    },
    get timezoneOffsetHoursUtc() {
      return _fields.timezoneOffsetHoursUtc;
    },
    get tosAccepted() {
      return _fields.tosAccepted;
    },
    get users() {
      return _fields.users;
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
          if (_required.accountGroups || _required.account_groups) {
            fields.push('account_groups');
          }
          if (_required.accountStatus || _required.account_status) {
            fields.push('account_status');
          }
          if (_required.age || _required.age) {
            fields.push('age');
          }
          if (_required.agencyClientDeclaration || _required.agency_client_declaration) {
            fields.push('agency_client_declaration');
          }
          if (_required.amountSpent || _required.amount_spent) {
            fields.push('amount_spent');
          }
          if (_required.balance || _required.balance) {
            fields.push('balance');
          }
          if (_required.business || _required.business) {
            fields.push('business');
          }
          if (_required.businessCity || _required.business_city) {
            fields.push('business_city');
          }
          if (_required.businessCountryCode || _required.business_country_code) {
            fields.push('business_country_code');
          }
          if (_required.businessName || _required.business_name) {
            fields.push('business_name');
          }
          if (_required.businessState || _required.business_state) {
            fields.push('business_state');
          }
          if (_required.businessStreet || _required.business_street) {
            fields.push('business_street');
          }
          if (_required.businessStreet2 || _required.business_street2) {
            fields.push('business_street2');
          }
          if (_required.businessZip || _required.business_zip) {
            fields.push('business_zip');
          }
          if (_required.capabilities || _required.capabilities) {
            fields.push('capabilities');
          }
          if (_required.createdTime || _required.created_time) {
            fields.push('created_time');
          }
          if (_required.currency || _required.currency) {
            fields.push('currency');
          }
          if (_required.dailySpendLimit || _required.daily_spend_limit) {
            fields.push('daily_spend_limit');
          }
          if (_required.endAdvertiser || _required.end_advertiser) {
            fields.push('end_advertiser');
          }
          if (_required.fundingSource || _required.funding_source) {
            fields.push('funding_source');
          }
          if (_required.fundingSourceDetails || _required.funding_source_details) {
            fields.push('funding_source_details');
          }
          if (_required.isPersonal || _required.is_personal) {
            fields.push('is_personal');
          }
          if (_required.mediaAgency || _required.media_agency) {
            fields.push('media_agency');
          }
          if (_required.name || _required.name) {
            fields.push('name');
          }
          if (_required.offsitePixelsTosAccepted || _required.offsite_pixels_tos_accepted) {
            fields.push('offsite_pixels_tos_accepted');
          }
          if (_required.partner || _required.partner) {
            fields.push('partner');
          }
          if (_required.rfSpec || _required.rf_spec) {
            fields.push('rf_spec');
          }
          if (_required.spendCap || _required.spend_cap) {
            fields.push('spend_cap');
          }
          if (_required.taxIdStatus || _required.tax_id_status) {
            fields.push('tax_id_status');
          }
          if (_required.timezoneId || _required.timezone_id) {
            fields.push('timezone_id');
          }
          if (_required.timezoneName || _required.timezone_name) {
            fields.push('timezone_name');
          }
          if (_required.timezoneOffsetHoursUtc || _required.timezone_offset_hours_utc) {
            fields.push('timezone_offset_hours_utc');
          }
          if (_required.tosAccepted || _required.tos_accepted) {
            fields.push('tos_accepted');
          }
          if (_required.users || _required.users) {
            fields.push('users');
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
        set agencyClientDeclaration(value) {
          _params['agency_client_declaration'] = value;
        },
        set endAdvertiser(value) {
          _params['end_advertiser'] = value;
        },
        set mediaAgency(value) {
          _params['media_agency'] = value;
        },
        set name(value) {
          _params['name'] = value;
        },
        set spendCap(value) {
          _params['spend_cap'] = value;
        },
        set spendCapAction(value) {
          _params['spend_cap_action'] = value;
        },
        set: function(obj) {
          if (obj.agencyClientDeclaration || obj.agency_client_declaration) {
            _params['agency_client_declaration'] =
              obj.agencyClientDeclaration || obj.agency_client_declaration;
          }
          if (obj.endAdvertiser || obj.end_advertiser) {
            _params['end_advertiser'] =
              obj.endAdvertiser || obj.end_advertiser;
          }
          if (obj.mediaAgency || obj.media_agency) {
            _params['media_agency'] =
              obj.mediaAgency || obj.media_agency;
          }
          if (obj.name || obj.name) {
            _params['name'] =
              obj.name || obj.name;
          }
          if (obj.spendCap || obj.spend_cap) {
            _params['spend_cap'] =
              obj.spendCap || obj.spend_cap;
          }
          if (obj.spendCapAction || obj.spend_cap_action) {
            _params['spend_cap_action'] =
              obj.spendCapAction || obj.spend_cap_action;
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
    getAdCampaigns: function() {
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
          _params['campaign_group_status'] = value;
        },
        set isCompleted(value) {
          _params['is_completed'] = value;
        },
        set: function(obj) {
          if (obj.status || obj.campaign_group_status) {
            _params['campaign_group_status'] =
              obj.status || obj.campaign_group_status;
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
            endpoint = '/adcampaign_groups';
            _params.ids = _id.join();
          } else {
            endpoint = _endpoint + '/adcampaign_groups';
          }
          var promise = _context.adsAPI.call(
            'GET',
            endpoint,
            _params
          );

          return APIHelper.makeAPIResponse(
            APIHelper.cloneObject(_context),
            promise,
            adCampaign.initFromData
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
        set: function(obj) {
          if (obj.status || obj.campaign_status) {
            _params['campaign_status'] =
              obj.status || obj.campaign_status;
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
            endpoint = '/adgroup_groups';
            _params.ids = _id.join();
          } else {
            endpoint = _endpoint + '/adgroup_groups';
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
    getConnectionObjects: function() {
      var _params = {};

      var _this = {
        set: function(obj) {
          return _this;
        },
        done: function() {

          var endpoint;
          if (_idArray) {
            endpoint = '/connectionobjects';
            _params.ids = _id.join();
          } else {
            endpoint = _endpoint + '/connectionobjects';
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
    getConversionPixels: function() {
      var _params = {};

      var _this = {
        set: function(obj) {
          return _this;
        },
        done: function() {

          var endpoint;
          if (_idArray) {
            endpoint = '/offsitepixels';
            _params.ids = _id.join();
          } else {
            endpoint = _endpoint + '/offsitepixels';
          }
          var promise = _context.adsAPI.call(
            'GET',
            endpoint,
            _params
          );

          return APIHelper.makeAPIResponse(
            APIHelper.cloneObject(_context),
            promise,
            conversionPixel.initFromData
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
    getAdStats: function() {
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
          if (_required.getAdStats || _required.impressions) {
            fields.push('impressions');
          }
          if (_required.getAdStats || _required.clicks) {
            fields.push('clicks');
          }
          if (_required.getAdStats || _required.spent) {
            fields.push('spent');
          }
          if (_required.getAdStats || _required.social_impressions) {
            fields.push('social_impressions');
          }
          if (_required.getAdStats || _required.social_clicks) {
            fields.push('social_clicks');
          }
          if (_required.getAdStats || _required.social_spent) {
            fields.push('social_spent');
          }
          if (_required.getAdStats || _required.unique_impressions) {
            fields.push('unique_impressions');
          }
          if (_required.getAdStats || _required.unique_clicks) {
            fields.push('unique_clicks');
          }
          if (_required.getAdStats || _required.social_unique_impressions) {
            fields.push('social_unique_impressions');
          }
          if (_required.getAdStats || _required.social_unique_clicks) {
            fields.push('social_unique_clicks');
          }
          if (_required.getAdStats || _required.actions) {
            fields.push('actions');
          }
          if (_required.getAdStats || _required.inline_actions) {
            fields.push('inline_actions');
          }
          if (_required.getAdStats || _required.account_id) {
            fields.push('account_id');
          }
          if (_required.getAdStats || _required.start_time) {
            fields.push('start_time');
          }
          if (_required.getAdStats || _required.end_time) {
            fields.push('end_time');
          }
          if (fields && fields.length > 0) {
            _params.fields = fields.join();
          }

          var endpoint;
          if (_idArray) {
            endpoint = '/adgroup_stats';
            _params.ids = _id.join();
          } else {
            endpoint = _endpoint + '/adgroup_stats';
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
    getReportStats: function() {
      var _params = {};

      var _this = {
        set timeRanges(value) {
          _params['time_ranges'] = value;
        },
        set timeInterval(value) {
          _params['time_interval'] = value;
        },
        set datePreset(value) {
          _params['date_preset'] = value;
        },
        set timeIncrement(value) {
          _params['time_increment'] = value;
        },
        set dataColumns(value) {
          _params['data_columns'] = value;
        },
        set altionsGroupBy(value) {
          _params['altions_group_by'] = value;
        },
        set sortBy(value) {
          _params['sort_by'] = value;
        },
        set sortDir(value) {
          _params['sort_dir'] = value;
        },
        set summary(value) {
          _params['summary'] = value;
        },
        set filters(value) {
          _params['filters'] = value;
        },
        set format(value) {
          _params['format'] = value;
        },
        set: function(obj) {
          if (obj.timeRanges || obj.time_ranges) {
            _params['time_ranges'] =
              obj.timeRanges || obj.time_ranges;
          }
          if (obj.timeInterval || obj.time_interval) {
            _params['time_interval'] =
              obj.timeInterval || obj.time_interval;
          }
          if (obj.datePreset || obj.date_preset) {
            _params['date_preset'] =
              obj.datePreset || obj.date_preset;
          }
          if (obj.timeIncrement || obj.time_increment) {
            _params['time_increment'] =
              obj.timeIncrement || obj.time_increment;
          }
          if (obj.dataColumns || obj.data_columns) {
            _params['data_columns'] =
              obj.dataColumns || obj.data_columns;
          }
          if (obj.altionsGroupBy || obj.altions_group_by) {
            _params['altions_group_by'] =
              obj.altionsGroupBy || obj.altions_group_by;
          }
          if (obj.sortBy || obj.sort_by) {
            _params['sort_by'] =
              obj.sortBy || obj.sort_by;
          }
          if (obj.sortDir || obj.sort_dir) {
            _params['sort_dir'] =
              obj.sortDir || obj.sort_dir;
          }
          if (obj.summary || obj.summary) {
            _params['summary'] =
              obj.summary || obj.summary;
          }
          if (obj.filters || obj.filters) {
            _params['filters'] =
              obj.filters || obj.filters;
          }
          if (obj.format || obj.format) {
            _params['format'] =
              obj.format || obj.format;
          }
          return _this;
        },
        done: function() {

          var endpoint;
          if (_idArray) {
            endpoint = '/reportstats';
            _params.ids = _id.join();
          } else {
            endpoint = _endpoint + '/reportstats';
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
    generatePreviews: function() {
      var _params = {};

      var _this = {
        set creative(value) {
          _params['creative'] = value;
        },
        set post(value) {
          _params['post'] = value;
        },
        set width(value) {
          _params['width'] = value;
        },
        set height(value) {
          _params['height'] = value;
        },
        set adFormat(value) {
          _params['ad_format'] = value;
        },
        set: function(obj) {
          if (obj.creative || obj.creative) {
            _params['creative'] =
              obj.creative || obj.creative;
          }
          if (obj.post || obj.post) {
            _params['post'] =
              obj.post || obj.post;
          }
          if (obj.width || obj.width) {
            _params['width'] =
              obj.width || obj.width;
          }
          if (obj.height || obj.height) {
            _params['height'] =
              obj.height || obj.height;
          }
          if (obj.adFormat || obj.ad_format) {
            _params['ad_format'] =
              obj.adFormat || obj.ad_format;
          }
          return _this;
        },
        done: function() {

          var endpoint;
          if (_idArray) {
            endpoint = '/generatepreviews';
            _params.ids = _id.join();
          } else {
            endpoint = _endpoint + '/generatepreviews';
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
    createAdCampaign: function() {
      var _params = {};

      var _this = {
        set buyingType(value) {
          _params['buying_type'] = value;
        },
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
          if (obj.buyingType || obj.buying_type) {
            _params['buying_type'] =
              obj.buyingType || obj.buying_type;
          }
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
            endpoint = '/adcampaign_groups';
            _params.ids = _id.join();
          } else {
            endpoint = _endpoint + '/adcampaign_groups';
          }
          var promise = _context.adsAPI.call(
            'POST',
            endpoint,
            _params
          );

          return APIHelper.makeAPIResponse(
            APIHelper.cloneObject(_context),
            promise,
            adCampaign.initFromData
          );
        },
      };
      return _this;
    },
    createAdSet: function() {
      var _params = {};
      if (_context.campaignId) {
        _params['campaign_group_id'] = _context.campaignId;
      }

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
        set rtbFlag(value) {
          _params['rtb_flag'] = value;
        },
        set campaignId(value) {
          _params['campaign_group_id'] = value;
        },
        set status(value) {
          _params['campaign_status'] = value;
        },
        set dailyBudget(value) {
          _params['daily_budget'] = value;
        },
        set endTime(value) {
          _params['end_time'] = value;
        },
        set executionOptions(value) {
          _params['execution_options'] = value;
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
        set redownload(value) {
          _params['redownload'] = value;
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
          if (obj.rtbFlag || obj.rtb_flag) {
            _params['rtb_flag'] =
              obj.rtbFlag || obj.rtb_flag;
          }
          if (obj.campaignId || obj.campaign_group_id) {
            _params['campaign_group_id'] =
              obj.campaignId || obj.campaign_group_id;
          }
          if (obj.status || obj.campaign_status) {
            _params['campaign_status'] =
              obj.status || obj.campaign_status;
          }
          if (obj.dailyBudget || obj.daily_budget) {
            _params['daily_budget'] =
              obj.dailyBudget || obj.daily_budget;
          }
          if (obj.endTime || obj.end_time) {
            _params['end_time'] =
              obj.endTime || obj.end_time;
          }
          if (obj.executionOptions || obj.execution_options) {
            _params['execution_options'] =
              obj.executionOptions || obj.execution_options;
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
          if (obj.redownload || obj.redownload) {
            _params['redownload'] =
              obj.redownload || obj.redownload;
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
            endpoint = '/adcampaigns';
            _params.ids = _id.join();
          } else {
            endpoint = _endpoint + '/adcampaigns';
          }
          var promise = _context.adsAPI.call(
            'POST',
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
    createAd: function() {
      var _params = {};
      if (_context.adSetId) {
        _params['campaign_id'] = _context.adSetId;
      }

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
        set adSetId(value) {
          _params['campaign_id'] = value;
        },
        set creative(value) {
          _params['creative'] = value;
        },
        set redownload(value) {
          _params['redownload'] = value;
        },
        set trackingSpecs(value) {
          _params['tracking_specs'] = value;
        },
        set socialPrefs(value) {
          _params['social_prefs'] = value;
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
          if (obj.adSetId || obj.campaign_id) {
            _params['campaign_id'] =
              obj.adSetId || obj.campaign_id;
          }
          if (obj.creative || obj.creative) {
            _params['creative'] =
              obj.creative || obj.creative;
          }
          if (obj.redownload || obj.redownload) {
            _params['redownload'] =
              obj.redownload || obj.redownload;
          }
          if (obj.trackingSpecs || obj.tracking_specs) {
            _params['tracking_specs'] =
              obj.trackingSpecs || obj.tracking_specs;
          }
          if (obj.socialPrefs || obj.social_prefs) {
            _params['social_prefs'] =
              obj.socialPrefs || obj.social_prefs;
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
            endpoint = '/adgroups';
            _params.ids = _id.join();
          } else {
            endpoint = _endpoint + '/adgroups';
          }
          var promise = _context.adsAPI.call(
            'POST',
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
    createCreative: function() {
      var _params = {};

      var _this = {
        set actorId(value) {
          _params['actor_id'] = value;
        },
        set body(value) {
          _params['body'] = value;
        },
        set callToActionType(value) {
          _params['call_to_action_type'] = value;
        },
        set followRedirect(value) {
          _params['follow_redirect'] = value;
        },
        set imageCrops(value) {
          _params['image_crops'] = value;
        },
        set imageFile(value) {
          _params['image_file'] = value;
        },
        set imageHash(value) {
          _params['image_hash'] = value;
        },
        set imageUrl(value) {
          _params['image_url'] = value;
        },
        set linkUrl(value) {
          _params['link_url'] = value;
        },
        set name(value) {
          _params['name'] = value;
        },
        set objectId(value) {
          _params['object_id'] = value;
        },
        set objectStoryId(value) {
          _params['object_story_id'] = value;
        },
        set objectStorySpec(value) {
          _params['object_story_spec'] = value;
        },
        set objectUrl(value) {
          _params['object_url'] = value;
        },
        set runStatus(value) {
          _params['run_status'] = value;
        },
        set title(value) {
          _params['title'] = value;
        },
        set urlTags(value) {
          _params['url_tags'] = value;
        },
        set: function(obj) {
          if (obj.actorId || obj.actor_id) {
            _params['actor_id'] =
              obj.actorId || obj.actor_id;
          }
          if (obj.body || obj.body) {
            _params['body'] =
              obj.body || obj.body;
          }
          if (obj.callToActionType || obj.call_to_action_type) {
            _params['call_to_action_type'] =
              obj.callToActionType || obj.call_to_action_type;
          }
          if (obj.followRedirect || obj.follow_redirect) {
            _params['follow_redirect'] =
              obj.followRedirect || obj.follow_redirect;
          }
          if (obj.imageCrops || obj.image_crops) {
            _params['image_crops'] =
              obj.imageCrops || obj.image_crops;
          }
          if (obj.imageFile || obj.image_file) {
            _params['image_file'] =
              obj.imageFile || obj.image_file;
          }
          if (obj.imageHash || obj.image_hash) {
            _params['image_hash'] =
              obj.imageHash || obj.image_hash;
          }
          if (obj.imageUrl || obj.image_url) {
            _params['image_url'] =
              obj.imageUrl || obj.image_url;
          }
          if (obj.linkUrl || obj.link_url) {
            _params['link_url'] =
              obj.linkUrl || obj.link_url;
          }
          if (obj.name || obj.name) {
            _params['name'] =
              obj.name || obj.name;
          }
          if (obj.objectId || obj.object_id) {
            _params['object_id'] =
              obj.objectId || obj.object_id;
          }
          if (obj.objectStoryId || obj.object_story_id) {
            _params['object_story_id'] =
              obj.objectStoryId || obj.object_story_id;
          }
          if (obj.objectStorySpec || obj.object_story_spec) {
            _params['object_story_spec'] =
              obj.objectStorySpec || obj.object_story_spec;
          }
          if (obj.objectUrl || obj.object_url) {
            _params['object_url'] =
              obj.objectUrl || obj.object_url;
          }
          if (obj.runStatus || obj.run_status) {
            _params['run_status'] =
              obj.runStatus || obj.run_status;
          }
          if (obj.title || obj.title) {
            _params['title'] =
              obj.title || obj.title;
          }
          if (obj.urlTags || obj.url_tags) {
            _params['url_tags'] =
              obj.urlTags || obj.url_tags;
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
            endpoint = '/adcreatives';
            _params.ids = _id.join();
          } else {
            endpoint = _endpoint + '/adcreatives';
          }
          var promise = _context.adsAPI.call(
            'POST',
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
    createAdImage: function() {
      var _params = {};

      var _this = {
        set: function(obj) {
          return _this;
        },
        attachFileStream: function(stream) {
          _params[stream.name] = stream;
          return _this;
        },
        done: function() {
          var endpoint;
          if (_idArray) {
            endpoint = '/adimages';
            _params.ids = _id.join();
          } else {
            endpoint = _endpoint + '/adimages';
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
    createConversionPixel: function() {
      var _params = {};

      var _this = {
        set name(value) {
          _params['name'] = value;
        },
        set tag(value) {
          _params['tag'] = value;
        },
        set: function(obj) {
          if (obj.name || obj.name) {
            _params['name'] =
              obj.name || obj.name;
          }
          if (obj.tag || obj.tag) {
            _params['tag'] =
              obj.tag || obj.tag;
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
            endpoint = '/offsitepixels';
            _params.ids = _id.join();
          } else {
            endpoint = _endpoint + '/offsitepixels';
          }
          var promise = _context.adsAPI.call(
            'POST',
            endpoint,
            _params
          );

          return APIHelper.makeAPIResponse(
            APIHelper.cloneObject(_context),
            promise,
            conversionPixel.initFromData
          );
        },
      };
      return _this;
    },
    getAdCampaign: function(adCampaignId) {
      return adCampaign.init(APIHelper.cloneObject(_context), adCampaignId);
    },
    getAdSet: function(adSetId) {
      return adSet.init(APIHelper.cloneObject(_context), adSetId);
    },
    getAd: function(adId) {
      return ad.init(APIHelper.cloneObject(_context), adId);
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