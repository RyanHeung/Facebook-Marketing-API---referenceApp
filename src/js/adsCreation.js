/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

var React = require('react');
var Bootstrap = require('react-bootstrap'),
    Alert = Bootstrap.Alert,
    Row = Bootstrap.Row,
    Col = Bootstrap.Col,
    Button = Bootstrap.Button,
    ListGroup = Bootstrap.ListGroup,
    ListGroupItem = Bootstrap.ListGroupItem,
    Modal = Bootstrap.Modal,
    Glyphicon = Bootstrap.Glyphicon;

var objectives = [
  require('./objectives/websiteConversion'),
  require('./objectives/postEngagement'),
  require('./objectives/appInstalls'),
];

var callStates = {
  CALL_PREPARE: 0,
  CALL_IN_PROGRESS: 1,
  CALL_SUCC: 2,
};
var pageStates = {
  OBJECTIVE_SETUP: 0,
  ADS_SETUP: 1,
};

var adsCreation = React.createClass({
  propTypes: {
    api: React.PropTypes.object.isRequired,
  },

  setPageState: function(pageState) {
    this.setState({pageState: pageState});
  },
  enterAdsSetupMode: function() {
    this.setPageState(pageStates.ADS_SETUP);
  },
  enterObjectiveSetupMode: function() {
    this.setPageState(pageStates.OBJECTIVE_SETUP);
  },

  selectObjective: function(index) {
    this.setState({objective: index});
  },

  canMoveNext: function(canMoveNext) {
    this.setState({canMoveNext: canMoveNext});
  },

  getInitialState: function() {
    this.dataStore = {};
    return {
      callState: 0,
      pageState: pageStates.OBJECTIVE_SETUP,
      canMoveNext: false,
    };
  },

  dismissAlertMsg: function() {
    this.setState({callError: null});
  },
  createAds: function() {
    this.setState({callState: callStates.CALL_IN_PROGRESS});
    this.refs.adsSetup.createAds().then(
      function(response) {
        this.setState({callState: callStates.CALL_SUCC});
      }.bind(this),
      function(response) {
        this.setState({
          callState: callStates.CALL_PREPARE,
          callError: response.message,
        });
      }.bind(this)
    );
  },

  render: function() {
    var objectiveIndex = this.state.objective;
    var objective = objectives[objectiveIndex];

    var page;
    if (this.state.pageState === pageStates.OBJECTIVE_SETUP) {
      var objectiveSetup;
      if (objective) {
        var ObjectiveSetup = objective.ObjectiveSetup;
        objectiveSetup = <ObjectiveSetup api={this.props.api}
          dataReady={this.canMoveNext} dataStore={this.dataStore} />;
      } else {
        objectiveSetup = <div></div>;
      }
      page = (
        <Modal {...this.props} title="Ads Creation Step 1: Objective">
          <Row className="modal-body">
            <Col md={4}>
              <ListGroup>
                {objectives.map(function(value, index) {
                  var boundClick = this.selectObjective.bind(this, index);
                  return (
                    <ListGroupItem header={value.Name} key={index}
                      href="javascript:void(0)"
                      onClick={boundClick}
                      className={(objectiveIndex === index)?'active':''}>
                      {value.Description}
                    </ListGroupItem>
                  );
                }, this)}
              </ListGroup>
            </Col>
            <Col md={8}>
              {objectiveSetup}
            </Col>
          </Row>
          <div className="modal-footer">
            <Button bsStyle="primary" onClick={this.enterAdsSetupMode}
              disabled={!this.state.canMoveNext}>
              Next
            </Button>
          </div>
        </Modal>
      );
    } else if (this.state.pageState === pageStates.ADS_SETUP) {
      if (objective) {
        var actionButtonJSX;
        if (this.state.callState === callStates.CALL_PREPARE) {
          actionButtonJSX = (
            <Button bsStyle="primary" onClick={this.createAds}
              disabled={!this.state.canMoveNext}>
              Place Ad Order
            </Button>
          );
        } else if (this.state.callState === callStates.CALL_IN_PROGRESS) {
          actionButtonJSX = (
            <Button bsStyle="primary" disabled>
              <Glyphicon glyph='refresh' className='rotate-animate' />
              &nbsp;Place Ad Order
            </Button>
          );
        } else {
          actionButtonJSX = (
            <Button bsStyle="primary" onClick={this.props.onRequestHide}>
              Close
            </Button>
          );
        }

        var errorMsgJSX = null;
        if (this.state.callError) {
          errorMsgJSX =
            <Alert bsStyle='danger' onDismiss={this.dismissAlertMsg}>
              <p>{this.state.callError}</p>
            </Alert>;
        }

        var AdsSetup = objective.AdsSetup;
        page = (
          <Modal {...this.props} title="Ads Creation Step 2: Ads Details">
            <div className='modal-body'>
              <AdsSetup dataReady={this.canMoveNext} ref='adsSetup'
                api={this.props.api} dataStore={this.dataStore} />
            </div>
            <div className="modal-footer">
              {errorMsgJSX}
              <Button onClick={this.enterObjectiveSetupMode}>Back</Button>
              {actionButtonJSX}
            </div>
          </Modal>
        );
      }
    }

    return page;
  },
});

module.exports = adsCreation;
