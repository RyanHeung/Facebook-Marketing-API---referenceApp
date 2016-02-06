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

var SelectInput = require('../components/react-bootstrap-select');
var AdsOffsetPixels = require('../components/adsOffsetPixels');

var objectiveMixin = require('./objectiveMixin');
var objectiveSetupValidators = {
  websiteUrl: function(value) {
    var urlValidateRegex = /((https?:\/\/)?[\w-]+(\.[\w-]+)+\.?(:\d+)?(\/\S*)?)/i;
    var isValidUrl = urlValidateRegex.test(value);
    var ret = {pass: isValidUrl};
    if (!isValidUrl && value && value.length > 6) {
      ret.message = 'Must be a Valid Url';
    }
    return ret;
  },
  conversionPixel: function(value) {
    var ret = {pass: !!value};
    if (value && value.status === 'Unverified') {
      ret.message = 'Your conversion pixel has not been verified. '
        + 'Please remember to install the pixel to your website.';
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
      <h4>Website Conversions</h4>
      <Input type='static'
        value={'Send people to your website to take a specific action, '
          + 'like signing up for a newsletter. Use a conversion pixel to '
          + 'measure your results.'} />
      <Input type='text' label="URL for Web Conversions"
        help={this.getErrorMessage('websiteUrl')}
        bsStyle={this.hasErrorMessage('websiteUrl')? 'error':null}
        valueLink={this.linkStore('websiteUrl')}
        placeholder='Enter URL to Promote' />
      <AdsOffsetPixels label="Conversion Pixels"
        help={this.getErrorMessage('conversionPixel')}
        placeholder="Choose Existing Conversion Pixels"
        valueLink={this.linkStore('conversionPixel')}
        adAccount={this.props.api.adAccount}/>
    </div>);
  },
});


var AdsSetup = React.createClass({
  mixins: [objectiveMixin(adsSetupValidators)],

  getInitialState: function() {
    this.setToStore('objective', 'WEBSITE_CONVERSIONS');
    this.setToStore('name', '[WEBSITE_CONVERSIONS] conversion pixel ' +
        this.getFromStore('conversionPixel').id);
    return {};
  },

  getCreativeSpecs: function() {
    return {
      object_story_spec: {
        page_id: this.getFromStore('fbPage').id,
        link_data: {
          caption: this.getFromStore('title'),
          description: this.getFromStore('body'),
          image_hash: this.getFromStore('creativeImageHash'),
          link: this.getFromStore('websiteUrl'),
      }}};
  },

  getPromotedObject: function() {
    return {
      pixel_id: this.getFromStore('conversionPixel').id,
    }
  },

  getTargetingSpecs: function() {
    return {
      page_types: ['desktopfeed', 'mobilefeed', 'rightcolumn'],
    };
  },

  render: function() {
    return (<div>
      <h4>Website Conversions</h4>
      <p>
        {this.getFromStore('websiteUrl') + ' '}
        <button className='btn btn-primary' disabled type='button'>
        {this.getFromStore('conversionPixel').name}
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
  Name: 'Website Conversions',
  Description: 'Promote conversions on your website',
  ObjectiveSetup: ObjectiveSetup,
  AdsSetup: AdsSetup,
};

module.exports = objectiveRender;
