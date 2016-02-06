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
  if (!value) {
    return this.props.placeholder;
  }
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

var PromotablePosts = React.createClass({
  propTypes: {
    maxHeight: React.PropTypes.number,
    label: React.PropTypes.string,
    help: React.PropTypes.string,
    placeholder: React.PropTypes.string,
    fbPage: React.PropTypes.object,
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

  refreshComponent: function(fbPage) {
    // load the data from API
    this.setState({options: []});
    fbPage.getPromotablePosts()
      .require('name', 'message', 'picture')
      .done()
      .then(function(response) {
        if (response.data) {
          var options = [];
          response.data.forEach(function(data) {
            var lengthLimit = 50;
            var name = data.name || data.message || 'Untitled' ;
            if (name.length > lengthLimit) {
              var curPos = name.lastIndexOf(' ', lengthLimit);
              if (curPos < lengthLimit - 8) {
                curPos = lengthLimit;
              }
              name = name.substring(0, curPos) + ' ...';
            }
            options.push({
              id: data.id,
              picture: data.picture || 'images/image-na.png',
              name: name,
            });
          });
          this.setState({options: options});
        }
      }.bind(this));
  },

  componentWillMount: function() {
    if (this.props.fbPage) {
      this.refreshComponent(this.props.fbPage);
    }
  },

  componentWillReceiveProps: function(nextProps) {
    if (nextProps.fbPage && (
        !this.props.fbPage || nextProps.fbPage.id !== this.props.fbPage.id)) {
      this.refreshComponent(nextProps.fbPage);
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

    return (
      <SelectInput options={this.state.options}
        maxHeight={this.props.maxHeight}
        label={this.props.label} help={this.props.help}
        formatter={formatter.bind(this)}
        valueLink={valueLinkChild} />
    );
  },
});

module.exports = PromotablePosts;
