/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

var React = require('react');

var SelectInput = React.createClass({
  propTypes: {
    maxHeight: React.PropTypes.number,
    formatter: React.PropTypes.func,
    options: React.PropTypes.array.isRequired,
    label: React.PropTypes.string,
    help: React.PropTypes.string,
    placeholder: React.PropTypes.any,
    valueLink: React.PropTypes.shape({
      value: React.PropTypes.any,
      requestChange: React.PropTypes.func.isRequired
    }),
    value: React.PropTypes.any,
    onChange: React.PropTypes.func,
  },

  getInitialState: function() {
    return {options: []};
  },

  getDefaultProps: function() {
    return {
      onChange: function() {},
      formatter: function(value) {
        return value;
      },
    };
  },

  getValueLink: function() {
    return this.props.valueLink || {
      value: this.props.value,
      requestChange: this.props.onChange,
    };
  },

  handleClickOption: function(value) {
    var valueLink = this.getValueLink();
    if (valueLink.value !== value) {
      valueLink.requestChange(value);
    }
  },

  renderChildren: function() {
    var valueLink = this.getValueLink();
    return this.props.options.map(function(value, index) {
      var active = (value === valueLink.value);
      return (
        <li key={index} className={active? 'active':''}>
          <a tabIndex="-1" href="javascript:void(0)"
            onClick={this.handleClickOption.bind(this, value)}>
            {this.props.formatter(value)}
          </a>
        </li>
      );
    }.bind(this));
  },

  render: function() {
    var dropdownMenuStyle = {
      height: 'auto',
      overflowX: 'hidden',
    };
    if (this.props.maxHeight) {
      dropdownMenuStyle.maxHeight = this.props.maxHeight;
    }

    var labelJSX = (this.props.label)?
      <label className="control-label">{this.props.label}</label> : null;
    var helpJSX = (this.props.help)?
      <span className="help-block">{this.props.help}</span> : null;

    var valueLink = this.getValueLink();
    return (
      <div className="form-group">
        {labelJSX}
        <div className="dropdown">
          <button className="btn btn-default dropdown-toggle"
            disabled={this.props.options.length === 0}
            type="button"
            data-toggle="dropdown">
            {this.props.formatter(valueLink.value || this.props.placeholder)}
            &nbsp;<span className="caret"></span>
          </button>
          <ul className="dropdown-menu" style={dropdownMenuStyle}>
            {this.renderChildren()}
          </ul>
        </div>
        {helpJSX}
      </div>
    );
  },
});

module.exports = SelectInput;
