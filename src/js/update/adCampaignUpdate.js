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

var updateMixin = require('./updateMixin');
var SelectInput = require('../components/react-bootstrap-select');

var objectives = [
  'WEBSITE_CONVERSIONS', 'POST_ENGAGEMENT', 'MOBILE_APP_INSTALLS'
];
var buyingTypes = ['AUCTION'];
var statuses = [
  'ACTIVE', 'PAUSED'
];

var adCampaignUpdate = React.createClass({
  mixins: [updateMixin],
  fields: [
    'name', 'status', 'objective', 'buyingType', 'spendCap',
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
          this.state.hasOwnProperty('objective') ||
          this.state.hasOwnProperty('buyingType') ||
          this.state.hasOwnProperty('spendCap'));
      }
    } else {
      canSave = (this.state.name &&
        this.state.hasOwnProperty('objective') &&
        this.state.hasOwnProperty('buyingType'));
    }

    if (canSave != this.state.canSave) {
      this.setState({canSave: canSave});
    }
  },

  loadTransform: function(store) {
    if (store.spendCap) {
      store.spendCap /= 100;
    }
  },

  saveTransform: function(store) {
    if (store.spendCap) {
      store.spendCap *= 100;
    }
  },

  render: function() {
    return (
      <Modal {...this.props}
        title={(this.state.isUpdate?'Edit':'Create') + ' Ad Campaign'}>
        <div className='modal-body'>
          <Row>
            <Col md={4}>
              <SelectInput label='Campaign Objective' options={objectives}
                placeholder='Select Objective'
                valueLink={this.linkData('objective')}/>
            </Col>
            <Col md={8}>
              <Input type='text' label="Campaign Name"
                valueLink={this.linkData('name')}
                placeholder='Enter Campaign Name' />
            </Col>
          </Row>
          <Row>
            <Col md={4}>
              <SelectInput label='Campaign Buying Type' options={buyingTypes}
                placeholder='Select Buying Type'
                valueLink={this.linkData('buyingType')}/>
            </Col>
            <Col md={4}>
              <SelectInput label='Campaign Status' options={statuses}
                placeholder='Select Status'
                valueLink={this.linkData('status')}/>
            </Col>
            <Col md={4}>
              <Input type='text' label="Spend Cap" addonBefore='$'
                valueLink={this.linkData('spendCap')}
                placeholder='Enter Spend Cap' />
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

module.exports = adCampaignUpdate;
