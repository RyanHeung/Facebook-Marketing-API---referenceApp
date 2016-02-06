/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

var React = require('react');
var Router = require('react-router'),
    DefaultRoute = Router.DefaultRoute,
    Route = Router.Route,
    RouteHandler = Router.RouteHandler;

var AdsAPIInit = require('./adsAPIInit');
var AdsManagement = require('./adsManagement');

var app = React.createClass({
  mixins: [Router.State],

  // force reload while changing query string
  render: function() {
    return (<RouteHandler key={this.getPath()}/>);
  }
});

var routes = (
  <Route handler={app}>
    <Route path={AdsAPIInit.RounterPath} handler={AdsAPIInit.AdsAPIInit}/>
    <Route path='adsManagement' handler={AdsManagement}/>
    <DefaultRoute handler={AdsManagement}/>
  </Route>
);

Router.run(routes, Router.HashLocation, function(Root) {
  React.render(<Root/>, document.getElementById('ads-reference-app'));
});
