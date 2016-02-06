/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

var React = require('react');
var Bootstrap = require('react-bootstrap'),
    Alert = Bootstrap.Alert;

var updateMixin = {
  propTypes: {
    api: React.PropTypes.object.isRequired,
  },

  saveData: function() {
    var updateData = {};
    this.fields.forEach(function(field) {
      if (field in this.state) {
        var value = this.state[field];
        if (value !== this.store[field]) {
          updateData[field] = value;
        }
      }
    }.bind(this));
    if (this.saveTransform) {
      this.saveTransform(updateData);
    }

    var promise = Promise.resolve(null);
    if (this.props.objectExist) {
      promise = this.props.objectExist
        .update()
        .set(updateData)
        .done();
    } else if (this.props.objectNew) {
      promise = this.props.objectNew
        .set(updateData)
        .done();
    }
    promise.then(
      function() {
        this.props.onRequestHide();
      }.bind(this),
      function(response) {
        this.setState({callError: response.message});
      }.bind(this)
    );
  },

  linkData: function(attr) {
    var newState = {};
    return {
      value: this.state[attr],
      requestChange: function(value) {
        newState[attr] = value;
        this.setState(newState);

        if (this.saveValidate) {
          this.saveValidate();
        }
      }.bind(this),
    };
  },

  componentWillMount: function() {
    this.store = {};
    this.state.isUpdate = false;
    if (this.props.objectExist) {
      this.state.isUpdate = true;

      var store = {};
      var loader = this.props.objectExist.get();
      this.fields.forEach(function(field) {
        loader.require(field);
      });
      loader.done().then(function(response) {
        this.fields.forEach(function(field) {
          store[field] = response.data[field];
        });
        if (this.loadTransform) {
          this.loadTransform(store);
        }
        this.setState(store);
        this.store = store;
      }.bind(this));
    }
  },

  dismissAlertMsg: function() {
    this.setState({callError: null});
  },
  renderErrorMessage: function() {
    var errorMsgJSX = null;
    if (this.state.callError) {
      errorMsgJSX =
      <Alert bsStyle='danger' onDismiss={this.dismissAlertMsg}>
        <p>{this.state.callError}</p>
      </Alert>;
    }
    return errorMsgJSX;
  },
};

module.exports = updateMixin;
