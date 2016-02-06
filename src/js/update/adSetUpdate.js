/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

var React = require('react');
var Router = require('react-router');
var Bootstrap = require('react-bootstrap'),
    Row = Bootstrap.Row,
    Col = Bootstrap.Col,
    Input = Bootstrap.Input,
    Button = Bootstrap.Button,
    Modal = Bootstrap.Modal;

var adsUtil = require('../adsUtil');
var updateMixin = require('./updateMixin');
var SelectInput = require('../components/react-bootstrap-select');
var AdsConnectionObjects = require('../components/adsConnectionObjects');

var bidTypes = ['CPM', 'CPC', 'ABSOLUTE_OCPM', 'CPA'];
var statuses = [
  'ACTIVE', 'PAUSED'
];

var adSetUpdate = React.createClass({
  mixins: [updateMixin],
  fields: [
    'name', 'status', 'optimizationGoal', 'billingEvent', 'campaignId',
    'dailyBudget', 'lifetimeBudget', 'promotedObject', 'targeting', 'isAutobid'
  ],

  getInitialState: function() {
    return {
      canSave: false,
    };
  },

  saveValidate: function() {
    var canSave = false;
    if (this.state.isUpdate) {
      if (this.state.name !== '') {
        // cannot change to empty name
        canSave = (this.state.hasOwnProperty('name') ||
          this.state.hasOwnProperty('status') ||
          this.state.hasOwnProperty('optimizationGoal') ||
          this.state.hasOwnProperty('billingEvent') ||
          this.state.hasOwnProperty('dailyBudge') ||
          this.state.hasOwnProperty('lifetimeBudget') ||
          this.state.hasOwnProperty('promotedObject') ||
          this.state.hasOwnProperty('targeting'));
      }
    } else {
      canSave = (this.state.name &&
        this.state.hasOwnProperty('optimizationGoal') &&
        this.state.hasOwnProperty('billingEvent') &&
        this.state.hasOwnProperty('targeting'));
    }

    if (canSave != this.state.canSave) {
      this.setState({canSave: canSave});
    }
  },

  loadTransform: function(store) {
    if (store.promotedObject) {
      store.promotedObject = JSON.stringify(store.promotedObject);
    }
    if (store.targeting) {
      store.targeting = JSON.stringify(store.targeting);
    }
    if (store.dailyBudget) {
      store.dailyBudget /= 100;
    }
    if (store.lifetimeBudget) {
      store.lifetimeBudget /= 100;
    }
    // get the objective to set up optimization goal
    if (store.campaignId) {
      this.props.api.adAccount
        .getAdCampaign(store.campaignId)
        .get()
        .require('objective')
        .done()
        .then(function(response) {
          this.adObjective = response.data.objective;
          this.forceUpdate();
        }.bind(this));

      delete store.campaignGroupId;
    }
  },

  saveTransform: function(store) {
    if (store.dailyBudget) {
      store.dailyBudget *= 100;
    }
    if (store.lifetimeBudget) {
      store.lifetimeBudget *= 100;
    }
    store.isAutobid = true;
  },

  render: function() {
    var optimizationGoals = adsUtil.getOptimizationGoalByObjective(
      this.adObjective
    );
    var billingEvents = adsUtil.getBillingEventByOptimizationGoal(
      this.state.optimizationGoal
    );

    // Remove descriptions
    optimizationGoals = optimizationGoals.map(function(v) {
      return v[0];
    });
    billingEvents = billingEvents.map(function(v) {
      return v[0];
    });

    return (
      <Modal {...this.props}
        title={(this.state.isUpdate?'Edit':'Create') + ' Ad Set'}>
        <div className='modal-body'>
          <Input type='text' label="Promoted Object Spec"
            valueLink={this.linkData('promotedObject')}
            placeholder='Enter Promoted Object Spec' />
          <Input type='text' label="Targeting Spec"
            valueLink={this.linkData('targeting')}
            placeholder='Enter Targeting Spec' />
          <Row>
            <Col md={3}>
              <SelectInput label='Optimize for' options={optimizationGoals}
                placeholder='Choose Optimization Goal'
                valueLink={this.linkData('optimizationGoal')}/>
            </Col>
            <Col md={3}>
              <SelectInput label='Pay for' options={billingEvents}
                placeholder='Choose Billing Event'
                valueLink={this.linkData('billingEvent')}/>
            </Col>
            <Col md={6}>
              <Input type='text' label="Ad Set Name"
                valueLink={this.linkData('name')}
                placeholder='Enter Ad Set Name' />
            </Col>
          </Row>
          <Row>
            <Col md={4}>
              <SelectInput label='Campaign Status' options={statuses}
                placeholder='Choose Status'
                valueLink={this.linkData('status')}/>
            </Col>
            <Col md={4}>
              <Input type='text' label="Daily Budget" addonBefore='$'
                valueLink={this.linkData('dailyBudget')}
                placeholder='Enter Daily Budget' />
            </Col>
            <Col md={4}>
              <Input type='text' label="Lifetime Budget" addonBefore='$'
                valueLink={this.linkData('lifetimeBudget')}
                placeholder='Enter Lifetime Budget' />
            </Col>
          </Row>
        </div>
        <div className="modal-footer">
          {this.renderErrorMessage()}
          <Button bsStyle="primary" disabled={!this.state.canSave}
            onClick={this.saveData}>
            Save
          </Button>
        </div>
      </Modal>
    );
  },
});

module.exports = adSetUpdate;
