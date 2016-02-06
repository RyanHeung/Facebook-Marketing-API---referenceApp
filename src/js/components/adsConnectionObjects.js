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
  return (
    <span>
      <img src={value.picture} style={{maxHeight: 36}}/> {value.name}
    </span>
  );
}

var objectTypeMapping = {
  1: 'page',
  2: 'application',
  3: 'events',
  6: 'place',
  7: 'domains',
};

var AdsConnectionObjects = React.createClass({
  propTypes: {
    maxHeight: React.PropTypes.number,
    label: React.PropTypes.string,
    help: React.PropTypes.string,
    placeholder: React.PropTypes.string,
    adAccount: React.PropTypes.object.isRequired,
    filterType: React.PropTypes.string,
    valueLink: React.PropTypes.shape({
      value: React.PropTypes.string,
      requestChange: React.PropTypes.func.isRequired
    }),
    value: React.PropTypes.string,
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
    adAccount.getConnectionObjects().done().then(function(response) {
      if (response.data) {
        var options = [];
        var filterType = this.props.filterType;
        if (filterType) {
          filterType = filterType.toLowerCase();
        }
        response.data.forEach(function(data) {
          if (filterType) {
            var typeStr = objectTypeMapping[data.type];
            if (typeStr !== filterType) {
              return;
            }
          }
          var lengthLimit = 25;
          var name = data.name || data.message || 'Untitled' ;
          if (name.length > lengthLimit) {
            var curPos = name.lastIndexOf(' ', lengthLimit);
            if (curPos < lengthLimit - 8) {
              curPos = lengthLimit;
            }
            name = name.substring(0, curPos) + ' ...';
          }
          data.picture = data.picture || 'images/image-na.png';
          data.name = name;
          options.push(data);
        });
        this.setState({options: options});
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

module.exports = AdsConnectionObjects;
