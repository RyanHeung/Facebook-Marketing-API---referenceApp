/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

var React = require('react');
var MultiSelectInput = require('./react-bootstrap-multiselect');

var TargetingAgeRange = React.createClass({
  propTypes: {
    maxHeight: React.PropTypes.number,
    range: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
    label: React.PropTypes.string,
    help: React.PropTypes.string,
    valueLink: React.PropTypes.shape({
      value: React.PropTypes.arrayOf(React.PropTypes.number),
      requestChange: React.PropTypes.func.isRequired
    }),
    value: React.PropTypes.arrayOf(React.PropTypes.number),
    onChange: React.PropTypes.func,
  },

  getInitialState: function() {
    var options = [];
    var ageMin = parseInt(this.props.range[0]);
    var ageMax = parseInt(this.props.range[1]);
    for (var i = ageMin; i <= ageMax; ++i) {
      options.push(i);
    }
    return {
      options: [options, options],
      ageMin: ageMin,
      ageMax: ageMax,
    }
  },

  getDefaultProps: function() {
    return {
      maxHeight: 200,
      onChange: function() {},
    };
  },

  getValueLink: function() {
    return this.props.valueLink || {
      value: this.props.value,
      requestChange: this.props.onChange,
    };
  },

  render: function() {
    var formatter = function(value) {
      if (value === this.state.ageMin) {
        return this.props.range[0];
      } else if (value === this.state.ageMax) {
        return this.props.range[1];
      } else {
        return value;
      }
    }.bind(this);
    var prefix = function(index) {
      return index? ' -- ':null;
    };

    var valueLink = this.getValueLink();
    var valueLinkRelay = {
      value: valueLink.value,
      requestChange: function(value) {
        if (value[0] > value[1]) {
          if (value[0] !== valueLink.value[0]) {
            value[1] = value[0];
          } else {
            value[0] = value[1];
          }
        }
        valueLink.requestChange(value);
      }
    }
    return (
      <MultiSelectInput label={this.props.label} help={this.props.help}
        maxHeight={this.props.maxHeight} placeholder={['From', 'To']}
        options={this.state.options} formatter={formatter} prefix={prefix}
        valueLink={valueLinkRelay}/>
    );
  },
});

module.exports = TargetingAgeRange;
