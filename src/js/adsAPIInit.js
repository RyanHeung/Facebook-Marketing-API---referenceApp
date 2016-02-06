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
    Alert = Bootstrap.Alert,
    Button = Bootstrap.Button,
    Input = Bootstrap.Input,
    Modal = Bootstrap.Modal,
    Navbar = Bootstrap.Navbar;

var SelectInput = require('./components/react-bootstrap-select');

var adsAPI = require('facebook-adssdk-node');
var adsAPIConfig = {
  // Please add your Access Token & Ad Account here
  // If they are missing, you will be asked in the app
  adsAPIVersion: 'v2.4',
};

var authPath = '/adsAPIInit';
var adsAPIInitMixin = {
  statics: {
    willTransitionTo: function(transition) {
      if (!adsAPIConfig.accessToken || !adsAPIConfig.adAccountId) {
        transition.redirect(authPath, {}, {'nextPath' : transition.path});
      }
    },
  },

  getAdsAPI: function() {
    return adsAPI(adsAPIConfig.adsAPIVersion, adsAPIConfig.accessToken);
  },
  getAdAccountId: function() {
    return adsAPIConfig.adAccountId;
  },
  getAccessToken: function() {
    return adsAPIConfig.accessToken;
  },
};

var adsAPIInit = React.createClass({
  mixins: [Router.Navigation],

  linkState: function(name) {
    return {
      value: this.state[name],
      requestChange: function(value) {
        var newState = {};
        newState[name] = (typeof value === 'object') ? value.id : value;
        newState[name + 'ErrMsg'] = undefined;
        this.setState(newState);
      }.bind(this),
    };
  },

  getInitialState: function() {
    return {
      adAccountId: adsAPIConfig.adAccountId,
      accessToken: adsAPIConfig.accessToken,
    };
  },

  updateAccessToken: function() {
    var adAccountId = this.state.adAccountId.trim();
    var accessToken = this.state.accessToken.trim();
    if (adAccountId && accessToken) {
      // verify ad account and access token by fetching ad account info
      var adAccount = adsAPI(adsAPIConfig.adsAPIVersion, accessToken)
        .getAdAccount(adAccountId)
        .get()
        .done()
        .then(function(response) {
          adsAPIConfig.adAccountId = adAccountId;
          adsAPIConfig.accessToken = accessToken;

          // redirect when accessToken is provided
          var nextPath = this.props.query.nextPath;
          this.replaceWith(nextPath || '/');
        }.bind(this))
        .catch(function(error) {
          this.setState({
            callError: error.message,
          });
        }.bind(this));
    } else {
      var newState = {};
      if (!adAccountId) {
        newState.adAccountIdErrMsg = 'You need to provide ad account';
      }
      if (!accessToken) {
        newState.accessTokenErrMsg = 'You need to provide access token';
      }
      this.setState(newState);
    }
  },

  renderHack: function() {
    // HACK for facebook website integration
    // Directly read ad acccount and access token from the input field
    // account data is in the format of
    // accountsHack = [{'id': 'act_123', 'name': 'Xxx ad account...'}, {...}]

    accountsElementHack = document.getElementById("accounts");
    accessTokenElementHack = document.getElementById("token");
    if (accountsElementHack && accessTokenElementHack) {
      accountsHack = JSON.parse(accountsElementHack.value)
        .map(function(account) {
          var id = account.id.replace('act_', '');
          var name = account.name === "" ? id : account.name;
          return {'id': id, 'name': name};
        });
      accessTokenElementHack = accessTokenElementHack.value;

      // this is good enough, no need to setState for refresh
      this.state.accessToken = accessTokenElementHack;

      var formatter = function(value) {
        if (typeof value === 'object') {
          return value.name + ' (' + value.id + ')';
        } else {
          return value;
        }
      };

      return (
        <div>
          <Navbar brand='AdsReferenceApp' />
          <Modal title='Ad Accounts'
            onRequestHide={this.updateAccessToken}>
            <div className='modal-body'>
              <SelectInput options={accountsHack}
                valueLink={this.linkState('adAccountId')}
                formatter={formatter}
                placeholder='Choose Ad Account' />
            </div>
            <div className='modal-footer'>
              <Button onClick={this.updateAccessToken}>Done</Button>
            </div>
          </Modal>
        </div>
      );
    }
    return null;
  },

  render: function() {
    var errorMsgJSX = null;
    if (this.state.callError) {
      errorMsgJSX =
        <Alert bsStyle='danger' onDismiss={this.dismissAlertMsg}>
          <p>{this.state.callError}</p>
        </Alert>;
    }

    return this.renderHack() || (
      <div>
        <Navbar brand='AdsReferenceApp' />
        <Modal title='Access Token'
          onRequestHide={this.updateAccessToken}>
          <div className='modal-body'>
            <Input type='text'
              valueLink={this.linkState('adAccountId')}
              bsStyle={this.state.adAccountIdErrMsg? 'error':undefined}
              help={this.state.adAccountIdErrMsg || false}
              label='Ad Account'/>
            <Input type='text'
              valueLink={this.linkState('accessToken')}
              bsStyle={this.state.accessTokenErrMsg? 'error':undefined}
              help={this.state.accessTokenErrMsg || false}
              label='Access Token'/>
            <p>
              Alternatively, you can request the access token from the current
              user. The app ID and app secret are required to make the request.
              The authorization requires the server running on the registered
              domain of the app. We cannot deomostrate the process in this
              sample app.
            </p>
          </div>
          <div className='modal-footer'>
            {errorMsgJSX}
            <Button onClick={this.updateAccessToken}>Done</Button>
          </div>
        </Modal>
      </div>
    );
  },
});

module.exports = {
  RounterPath: authPath,
  AdsAPIInit: adsAPIInit,
  AdsAPIInitMixin: adsAPIInitMixin,
}
