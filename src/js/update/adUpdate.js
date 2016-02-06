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
var AdsConnectionObjects = require('../components/adsConnectionObjects');

var statuses = [
  'ACTIVE', 'PAUSED'
];

var adSetUpdate = React.createClass({
  mixins: [updateMixin],
  fields: [
    'name', 'status', 'creative'
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
          this.state.hasOwnProperty('creative'));
      }
    } else {
      canSave = (this.state.name &&
        this.state.hasOwnProperty('status') &&
        this.state.hasOwnProperty('creative'));
    }

    if (canSave != this.state.canSave) {
      this.setState({canSave: canSave});
    }
  },

  loadTransform: function(store) {
    if (store.creative) {
      store.creative = JSON.stringify(store.creative);
    }
  },

  render: function() {
    return (
      <Modal {...this.props}
        title={(this.state.isUpdate?'Edit':'Create') + ' Ad'}>
        <div className='modal-body'>
          <Input type='text' label="Creative Spec"
            valueLink={this.linkData('creative')}
            placeholder='Enter Creative Spec' />
          <Row>
            <Col md={6}>
              <SelectInput label='Ad Status' options={statuses}
                placeholder='Choose Status'
                valueLink={this.linkData('status')}/>
            </Col>
            <Col md={6}>
              <Input type='text' label="Ad Name"
                valueLink={this.linkData('name')}
                placeholder='Enter Ad Name' />
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
