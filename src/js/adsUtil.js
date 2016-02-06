/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

var adsUtil = {
  getOptimizationGoalByObjective: function(objective) {
    // Decide possible optimization goals based on objective
    // Ref: https://developers.facebook.com/docs/marketing-api/validation/v2.4
    var optimizationGoal = [
      ['NONE', 'No Optimization Goal'],
    ];
    if (objective === 'WEBSITE_CONVERSIONS') {
      optimizationGoal = [
        ['OFFSITE_CONVERSIONS', 'Offsite Coversions'],
        ['IMPRESSIONS', 'Impressions'],
        ['LINK_CLICKS', 'Clicks on Links'],
        ['POST_ENGAGEMENT', 'Post Engaements'],
        ['REACH', 'Number of Reaches'],
      ];
    } else if (objective === 'POST_ENGAGEMENT') {
      optimizationGoal = [
        ['POST_ENGAGEMENT', 'Post Engaements'],
        ['IMPRESSIONS', 'Impressions'],
        ['LINK_CLICKS', 'Clicks on Links'],
        ['REACH', 'Number of Reaches'],
        ['VIDEO_VIEWS', 'Video Views'],
      ];
    } else if (objective === 'MOBILE_APP_INSTALLS') {
      optimizationGoal = [
        ['APP_INSTALLS', 'App Installs'],
        ['LINK_CLICKS', 'Clicks on Links'],
        ['IMPRESSIONS', 'Impressions'],
        ['REACH', 'Number of Reaches'],
      ];
    }
    return optimizationGoal;
  },
  getBillingEventByOptimizationGoal: function(optimizationGoal) {
    // Decide possible billing events based on optimization goal
    // Ref: https://developers.facebook.com/docs/marketing-api/validation/v2.4
    var billingEvent = [
      ['IMPRESSIONS', 'Impressions'],
    ];
    if (optimizationGoal === 'APP_INSTALLS') {
      // Remove this event as it does not work with autobid
      // billingEvent.push(['APP_INSTALLS', 'App Installs']);
    } else if (optimizationGoal === 'LINK_CLICKS') {
      billingEvent.push(['LINK_CLICKS', 'Clicks on Links']);
    } else if (optimizationGoal === 'POST_ENGAGEMENT') {
      billingEvent.push(['POST_ENGAGEMENT', 'Post Engagements']);
    }
    return billingEvent;
  },
};

module.exports = adsUtil;
