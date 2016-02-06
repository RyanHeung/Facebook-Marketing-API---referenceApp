/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

var React = require('react');
var SelectInput = require('./react-bootstrap-select');

function formatter(value) {
  return <span>{value.name}</span>;
}

var AdsOffsetPixels = React.createClass({
  propTypes: {
    maxHeight: React.PropTypes.number,
    label: React.PropTypes.string,
    help: React.PropTypes.string,
    placeholder: React.PropTypes.string,
    adAccount: React.PropTypes.object.isRequired,
    valueLink: React.PropTypes.shape({
      value: React.PropTypes.object,
      requestChange: React.PropTypes.func.isRequired
    }),
    value: React.PropTypes.object,
    onChange: React.PropTypes.func,
  },

  getInitialState: function() {
    return {
      options: [],
    }
  },

  getDefaultProps: function() {
    return {
      maxHeight: 300,
      onChange: function() {},
    };
  },

  getValueLink: function() {
    return this.props.valueLink || {
      value: this.props.value,
      requestChange: this.props.onChange,
    };
  },

  refreshComponent: function(adAccount) {
    // load the data from API
    this.setState({options: []});
    adAccount.getConversionPixels().done().then(function(response) {
      if (response.data) {
        this.setState({options: response.data});
      }
    }.bind(this));
  },

  componentWillMount: function() {
    if (this.props.adAccount) {
      this.refreshComponent(this.props.adAccount);
    }
  },

  componentWillReceiveProps: function(nextProps) {
    if (nextProps.adAccount && (
        !this.props.adAccount ||
        nextProps.adAccount.id !== this.props.adAccount.id)) {
      this.refreshComponent(nextProps.adAccount);
    }
  },

  render: function() {
    var selectValue = null;
    var valueLink = this.getValueLink();
    if (valueLink.value) {
      this.state.options.every(function(value) {
        if (value.id === valueLink.value.id) {
          selectValue = value;
          return false;
        }
        return true;
      });
    }
    var valueLinkChild = {
      value: selectValue,
      requestChange: function(value) {
        valueLink.requestChange(value);
      },
    };

    var placeholder = false;
    if (this.props.placeholder) {
      placeholder = {name: this.props.placeholder};
    }
    return (
      <SelectInput options={this.state.options}
        maxHeight={this.props.maxHeight}
        label={this.props.label} help={this.props.help}
        formatter={formatter} valueLink={valueLinkChild}
        placeholder={placeholder}
        />
    );
  },
});

module.exports = AdsOffsetPixels;
