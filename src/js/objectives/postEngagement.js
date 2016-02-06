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
    DropdownButton = Bootstrap.DropdownButton,
    Input = Bootstrap.Input,
    MenuItem = Bootstrap.MenuItem,
    Row = Bootstrap.Row;

var SelectInput = require('../components/react-bootstrap-select');
var AdsConnectionObjects = require('../components/adsConnectionObjects');
var PromotablePosts = require('../components/promotablePosts');

var objectiveMixin = require('./objectiveMixin');
var objectiveSetupValidators = {
  fbPage: function(value) { return {pass: !!value}; },
  fbPost: function(value) { return {pass: !!value}; },
};
var adsSetupValidators = {
  ageRange: function(value) { return {
    pass: !!value && !!value[0] && !!value[1]};
  },
  gender: function(value) { return {pass: !!value}; },
  dailyBudget: function(value) { return {pass: (value > 0)}; },
  optimizationGoal: function(value) { return {pass: !!value}; },
  billingEvent: function(value) { return {pass: !!value}; },
};

var ObjectiveSetup = React.createClass({
  mixins: [objectiveMixin(objectiveSetupValidators)],

  render: function() {
    var fbPageAPI = undefined;
    var fbPage = this.getFromStore('fbPage');
    if (fbPage) {
      fbPageAPI = this.props.api.adsAPI.getPage(fbPage.id);
    }

    return (<div>
      <h4>Page Post Engagement</h4>
      <Input type='static'
        value='Get more people to see and engage with your Page posts.' />
      <Row>
        <Col md={4}>
          <AdsConnectionObjects filterType='page' maxHeight={200}
            adAccount={this.props.api.adAccount}
            valueLink={this.linkStore('fbPage')}
            label='Page Selection' placeholder='Choose Page'/>
        </Col>
        <Col md={8}>
          <PromotablePosts maxHeight={200}
            fbPage={fbPageAPI} valueLink={this.linkStore('fbPost')}
            label='Post Selection' placeholder='Choose Post'/>
        </Col>
      </Row>
    </div>);
  },
});

var AdsSetup = React.createClass({
  mixins: [objectiveMixin(adsSetupValidators)],

  getInitialState: function () {
    this.setToStore('objective', 'POST_ENGAGEMENT');
    this.setToStore('name', '[POST_ENGAGEMENT] ' +
      this.getFromStore('fbPost').name);
    return {};
  },

  getCreativeSpecs: function() {
    return {object_story_id: this.getFromStore('fbPost').id};
  },

  getTargetingSpecs: function() {
    return {
      page_types: ['desktopfeed', 'mobilefeed', 'rightcolumn'],
    };
  },

  render: function() {
    var fbPage = this.getFromStore('fbPage');
    var fbPost = this.getFromStore('fbPost');
    return (<div>
      <h4>Page Post Engagement</h4>
      <p>
        <button className='btn btn-primary' disabled type='button'>
          <img src={fbPage.picture} style={{maxHeight: 36}}/> {fbPage.name}
        </button>
        &nbsp;&nbsp;
        <button className='btn btn-primary' disabled type='button'>
          <img src={fbPost.picture} style={{maxHeight: 36}}/> {fbPost.name}
        </button>
      </p>
      <Row>
        <Col md={3}>
         {this.renderAdsTargeting()}
        </Col>
        <Col md={3}>
         {this.renderAdsOptimization()}
        </Col>
        <Col md={6}>
          {this.renderAdsPreview()}
        </Col>
      </Row>
    </div>);
  },
});

var objectiveRender = {
  Name: 'Page Post Engagement',
  Description: 'Promote your Facebook Page',
  ObjectiveSetup: ObjectiveSetup,
  AdsSetup: AdsSetup,
};

module.exports = objectiveRender;
