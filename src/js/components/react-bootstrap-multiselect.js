/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

var React = require('react');

var MultiSelect = React.createClass({
  propTypes: {
    maxHeight: React.PropTypes.number,
    formatter: React.PropTypes.func,
    prefix: React.PropTypes.any,
    options: React.PropTypes.arrayOf(React.PropTypes.array).isRequired,
    label: React.PropTypes.string,
    help: React.PropTypes.string,
    placeholder: React.PropTypes.arrayOf(React.PropTypes.any),
    valueLink: React.PropTypes.shape({
      value: React.PropTypes.arrayOf(React.PropTypes.any),
      requestChange: React.PropTypes.func.isRequired
    }),
    value: React.PropTypes.arrayOf(React.PropTypes.any),
    onChange: React.PropTypes.func,
  },

  getDefaultProps: function() {
    return {
      onChange: function() {},
      formatter: function(v, i) {return v;},
      prefix: function(i) {return null;},
    };
  },

  getValueLink: function(isMin, select) {
    return this.props.valueLink || {
      value: this.props.value,
      requestChange: this.props.onChange,
    };
  },

  handleClickOption: function(value, index) {
    var valueLink = this.getValueLink();
    var valueClone = (valueLink.value || []).map(function(v) {
      return v;
    });
    valueClone[index] = value;
    valueLink.requestChange(valueClone);
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

    var optionJSX = [];
    var valueLink = this.getValueLink();
    this.props.options.forEach(function(options, optionIdx) {
      var curValue = valueLink.value || [];
      curValue = curValue[optionIdx] || this.props.placeholder[optionIdx];
      optionJSX.push(this.props.prefix(optionIdx));
      optionJSX.push(
        <div key={optionIdx} className='dropdown'
          style={{display: 'inline-block'}}>
          <button className='btn btn-default dropdown-toggle' type='button'
            data-toggle='dropdown'>
            {this.props.formatter(curValue)} <span className='caret'></span>
          </button>
          <ul className='dropdown-menu' style={dropdownMenuStyle}>
            {options.map(function(value, valueIdx) {
              return <li key={valueIdx}
                className={(curValue === value)? 'active':''}>
                <a tabIndex={-1} href='javascript:void(0)'
                  onClick={this.handleClickOption.bind(this, value, optionIdx)}>
                  {this.props.formatter(value, valueIdx)}
                </a>
              </li>
              dd
            }.bind(this))}
          </ul>
        </div>
      );
    }.bind(this));

    return (
      <div className='form-group'>
        {labelJSX}
        <div className='form-group'>
          {optionJSX}
        </div>
        {helpJSX}
      </div>
    );
  },
});

module.exports = MultiSelect;
