/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

var React = require('react');
var Bootstrap = require('react-bootstrap'),
    Col = Bootstrap.Col,
    Input = Bootstrap.Input,
    Row = Bootstrap.Row;

var AdsConnectionObjects = require('../components/adsConnectionObjects');

var objectiveMixin = require('./objectiveMixin');
var objectiveSetupValidators = {
  fbApp: function(value) {
    var ret = {pass: false};
    if (value) {
      var supportedPlatforms = value.supportedPlatforms;
      if (supportedPlatforms && supportedPlatforms.length > 0) {
        ret.pass = true;
      } else {
        ret.message = "Your app is not on mobile platform!";
      }
    }
    return ret;
  },
};
var adsSetupValidators = {
  ageRange: function(value) { return {
    pass: !!value && !!value[0] && !!value[1]};
  },
  gender: function(value) { return {pass: !!value}; },
  dailyBudget: function(value) { return {pass: (value > 0)}; },
  optimizationGoal: function(value) { return {pass: !!value}; },
  billingEvent: function(value) { return {pass: !!value}; },
  fbPage: function(value) { return {pass: !!value}; },
  title: function(value) { return {pass: !!value}; },
  body: function(value) { return {pass: !!value}; },
  creativeImageHash: function(value) { return {pass: !!value}; },
};

var ObjectiveSetup = React.createClass({
  mixins: [objectiveMixin(objectiveSetupValidators)],

  render: function() {
    return (<div>
      <h4>App Installs</h4>
      <Input type='static'
        value='Get more people to use your Facebook or mobile app.' />
      <AdsConnectionObjects filterType='application' maxHeight={200}
        adAccount={this.props.api.adAccount} valueLink={this.linkStore('fbApp')}
        help={this.getErrorMessage('fbApp')}
        label='App Selection' placeholder='Choose App'/>
    </div>);
  },
});

var AdsSetup = React.createClass({
  mixins: [objectiveMixin(adsSetupValidators)],

  getInitialState: function () {
    this.setToStore('objective', 'MOBILE_APP_INSTALLS');
    this.setToStore('name', '[MOBILE_APP_INSTALLS] ' +
      this.getFromStore('fbApp').name);
    return {};
  },

  getCreativeSpecs: function() {
    var fbApp = this.getFromStore('fbApp');
    var store_link = fbApp.objectStoreUrls[
      Object.keys(fbApp.objectStoreUrls)[0]
    ];

    return {
      object_story_spec: {
        page_id: this.getFromStore('fbPage').id,
        link_data: {
          caption: this.getFromStore('title'),
          description: this.getFromStore('body'),
          image_hash: this.getFromStore('creativeImageHash'),
          link: store_link,
          call_to_action: {
            type: "INSTALL_MOBILE_APP",
            value: {
              link: store_link,
              link_title: fbApp.name,
            }
          }
    }}};
  },

  getPromotedObject: function() {
    var fbApp = this.getFromStore('fbApp');
    return {
      application_id: fbApp.id,
      object_store_url:
        fbApp.objectStoreUrls[Object.keys(fbApp.objectStoreUrls)[0]],
    };
  },

  getTargetingSpecs: function() {
    var user_os = [];
    var supportedPlatform = this.getFromStore('fbApp').supportedPlatforms;
    if (supportedPlatform.indexOf(4) >= 0 ||
        supportedPlatform.indexOf(5) >= 0) {
      user_os.push('iOS');
    }
    if (supportedPlatform.indexOf(6) >= 0) {
      user_os.push('Android');
    }
    return {
      user_os: user_os,
      page_types: ['mobilefeed'],
    };
  },

  render: function() {
    fbApp = this.getFromStore('fbApp');
    return (<div>
      <h4>App Installs</h4>
      <p>
        <button className='btn btn-primary' disabled type='button'>
          <img src={fbApp.picture} style={{maxHeight: 36}}/> {fbApp.name}
        </button>
      </p>
      <Row>
        <Col md={6}>
          <Row>
            <Col md={6}>
              {this.renderAdsTargeting()}
            </Col>
            <Col md={6}>
              {this.renderAdsOptimization()}
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              {this.renderAdsPreview()}
            </Col>
          </Row>
        </Col>
        <Col md={6}>
          {this.renderAdsCreative()}
        </Col>
      </Row>
    </div>);
  },
});

var objectiveRender = {
  Name: 'App Installs',
  Description: 'Get People to install your app',
  ObjectiveSetup: ObjectiveSetup,
  AdsSetup: AdsSetup,
};

module.exports = objectiveRender;
