/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

var React = require('react');
var Bootstrap = require('react-bootstrap'),
    DropdownButton = Bootstrap.DropdownButton,
    Input = Bootstrap.Input,
    MenuItem = Bootstrap.MenuItem,
    Panel = Bootstrap.Panel;
var fsStream = require('fsStream');

var AdsConnectionObjects = require('../components/adsConnectionObjects');
var AdsUtil = require('../adsUtil');
var SelectInput = require('../components/react-bootstrap-select');
var TargetingAgeRange = require('../components/targetingAgeRange');

var formatter = function(value) { return value[1] };
var objectiveMixin = function(validators) {
  if (!validators) {
    validators = {};
  }

  return {
    propTypes: {
      api: React.PropTypes.object.isRequired,
      dataStore: React.PropTypes.object.isRequired,
    },

    setDataReadyState: function(curAttr) {
      if (this.props.dataReady) {
        var enabledValidators = validators;
        if (curAttr) {
          enabledValidators = {};
          enabledValidators[curAttr] = validators[curAttr];
        }

        var stateErrorMessage = {};
        for (var attr in enabledValidators) {
          var validator = enabledValidators[attr];
          if (validator) {
            var result = validator(this.props.dataStore[attr]);
            this.validated[attr] = result.pass;

            if (result.value) {
              this.props.dataStore[attr] = result.value;
            }
            if (result.message) {
              stateErrorMessage[attr] = result.message;
            }
          }
        }

        var isDataReady = true;
        for (var attr in validators) {
          if (!this.validated[attr]) {
            isDataReady = false;
            break;
          }
        }

        this.setState({errorMessage: stateErrorMessage});
        this.props.dataReady(isDataReady);
      }
    },

    componentWillMount: function() {
      this.validated = {};
      this.setDataReadyState();
      this.setState({creativeImage: this.props.dataStore['creativeImage']});
    },

    getErrorMessage: function(attr) {
      var message = this.state.errorMessage[attr];
      return message || false;
    },
    hasErrorMessage: function(attr) {
      return (!!this.state.errorMessage[attr]);
    },

    getFromStore: function(attr) {
      return this.props.dataStore[attr];
    },
    setToStore: function(attr, value) {
      this.props.dataStore[attr] = value;
    },

    linkStore: function(attr) {
      var _this = this;
      return {
        value: _this.props.dataStore[attr],
        requestChange: function(value) {
          _this.props.dataStore[attr] = value;
          _this.setDataReadyState(attr);
        },
      };
    },

    createAds: function() {
      var objective = this.getFromStore('objective');
      var name = this.getFromStore('name') + ' [created by AdsReferenceApp @' +
        new Date().toISOString(); + ']';
      var optimizationGoal = this.getFromStore('optimizationGoal')[0];
      var billingEvent = this.getFromStore('billingEvent')[0];
      var dailyBudget = this.getFromStore('dailyBudget') * 100;
      var promotedObject = this.getPromotedObject?
        this.getPromotedObject() : null;
      var creativeSpecs = this.getCreativeSpecs();
      var targeting = this.getTargetingSpecs?
        this.getTargetingSpecs() : {};
      targeting.age_min = this.getFromStore('ageRange')[0];
      targeting.age_max = this.getFromStore('ageRange')[1];
      targeting.geo_locations = {countries: ['US']}; // target in US by default.
      if (this.getFromStore('gender')[0]) {
        targeting.genders = [this.getFromStore('gender')[0]];
      };

      var adAccount = this.props.api.adAccount;
      var adCampaign = adAccount.createAdCampaign();
      adCampaign.buyingType = 'AUCTION';
      adCampaign.status = 'ACTIVE';
      adCampaign.name = 'Campaign ' + name;
      adCampaign.objective = objective;
      return adCampaign.done()
      .then(function(response) {
        var adSet = response.data.createAdSet();
        adSet.optimizationGoal = optimizationGoal;
        adSet.billingEvent = billingEvent;
        adSet.status = 'ACTIVE';
        adSet.dailyBudget = dailyBudget;
        adSet.isAutobid = true;
        adSet.name = 'AdSet ' + name;
        if (promotedObject) {
          adSet.promotedObject = JSON.stringify(promotedObject);
        }
        adSet.targeting = JSON.stringify(targeting);
        return adSet.done();
      })
      .then(function(response) {
        var ad = response.data.createAd();
        var adCreative = adAccount.createCreative();
        adCreative.set(creativeSpecs);
        return adCreative.done().then(function(response) {
          ad.creative = JSON.stringify({creative_id: response.data.id});
          return ad;
        });
      })
      .then(function(ad) {
        ad.name = 'Ad ' + name;
        ad.status = 'PAUSED';
        return ad.done();
      });
    },

    // shared panels
    renderAdsPreview: function() {
      var apiPreview = function(selectedKey) {
        var adFormat = [
          'DESKTOP_FEED_STANDARD',
          'MOBILE_FEED_STANDARD',
          'RIGHT_COLUMN_STANDARD'][selectedKey];
        var creativeSpec = this.getCreativeSpecs();
        if (creativeSpec) {
          var preview = this.props.api.adAccount.generatePreviews();
          preview.adFormat = adFormat;
          preview.creative = JSON.stringify(creativeSpec);
          preview.done().then(function(response) {
            var previewHTML = response.data.data[0].body;
            this.setState({previewHTML: previewHTML});
          }.bind(this));
        } else {
          this.setState({
            previewHTML:
              '<div class="alert alert-danger">Nothing to preview</div>',
          });
        }
      };
      //<div className='square-filler'>
      return (
        <Panel header='Preview'>
          <DropdownButton bsSize='small' bsStyle="primary" title="Preview Ad"
            onSelect={apiPreview.bind(this)}>
            <MenuItem eventKey='0'>Suggested Page</MenuItem>
            <MenuItem eventKey='1'>Mobile News Feed</MenuItem>
            <MenuItem eventKey='2'>Right Column</MenuItem>
          </DropdownButton>
          <p></p>
          <div dangerouslySetInnerHTML={{__html: this.state.previewHTML}}/>
        </Panel>
      );
    },

    renderAdsTargeting: function() {
      var genders = [
        [1, 'Male'],
        [2, 'Famale'],
        [0, 'All Genders'],
      ];
      return (
        <Panel header="Targeting">
          <TargetingAgeRange label="Age" range={['13', '65+']}
            valueLink={this.linkStore('ageRange')}/>
          <SelectInput label="Gender" options={genders} formatter={formatter}
            placeholder={[null, 'Select Gender']}
            valueLink={this.linkStore('gender')}/>
        </Panel>
      );
    },

    renderAdsOptimization: function() {
      var currentObjective = this.getFromStore('objective');
      var currentOptGoal = this.getFromStore('optimizationGoal') || [];
      var _optimizationGoal = AdsUtil.getOptimizationGoalByObjective(
        currentObjective
      );
      var _billingEvent = AdsUtil.getBillingEventByOptimizationGoal(
        currentOptGoal[0]
      );

      return (
        <Panel header="Bidding">
          <Input label="Daily Budget" type='text' addonBefore='$'
            valueLink={this.linkStore('dailyBudget')} />
          <SelectInput label="Optimize For"
            options={_optimizationGoal} formatter={formatter}
            placeholder={[null, 'Select Optimization']}
            valueLink={this.linkStore('optimizationGoal')} />
          <SelectInput label="Pay For"
            options={_billingEvent} formatter={formatter}
            placeholder={[null, 'Select Billing Event']}
            valueLink={this.linkStore('billingEvent')} />
        </Panel>
      );
    },

    browseImage: function() {
      this.refs.creativeImageFile.getDOMNode().click();
    },
    uploadImage: function(event) {
      var input = event.target;
      if (input.files) {
        console.log(input.files);
        var reader = new FileReader();
        reader.onload = function(){
          this.props.dataStore['creativeImage'] = reader.result;
          this.setState({creativeImage: reader.result});
        }.bind(this);
        reader.readAsDataURL(input.files[0]);

        var stream = fsStream(input.files[0]);
        var adAccount = this.props.api.adAccount;
        adAccount.createAdImage()
          .attachFileStream(stream)
          .done()
          .then(function(response) {
            var images = response.data.images;
            this.props.dataStore['creativeImageHash'] =
              images[Object.keys(images)[0]].hash;
            this.setDataReadyState('creativeImageHash');
          }.bind(this));
      }
    },
    renderAdsCreative: function() {
      var image = this.state.creativeImage;
      if (!image) {
        image = 'images/image-na.png';
      }
      var imageStyle = {
        maxHeight: 300,
        maxWidth: '100%',
      };
      return (
        <Panel header="Creative">
        <AdsConnectionObjects filterType='page' maxHeight={200}
          adAccount={this.props.api.adAccount}
          valueLink={this.linkStore('fbPage')}
          label='Connect to Facebook Page' placeholder='Choose Page'/>
        <Input label="Title" type='text' valueLink={this.linkStore('title')}/>
        <Input label="Text" type='textarea' rows={3} className="noresize"
          valueLink={this.linkStore('body')}/>
        <input ref="creativeImageFile" type="file" className='hidden'
          onChange={this.uploadImage} />
        <div>
            <img onClick={this.browseImage} style={imageStyle}
              className='clickable' src={image} />
        </div>
        </Panel>
      );
    },
  };
};

/*
<Row>
  <Col md={6}>
    <h5>Upload Images (3 maximum)</h5>
    <input ref="fileControl" type="file" className='hidden'
      onChange={this.handle.bind(this)} />
    <Row>
      <Col md={12}>
      {[0, 1, 2].map(function(index) {
        var image = this.state.images[index];
        return (
          <div style={styleImageThumbnail}>
            <div className="square-container">
              <div className="square-filler"></div>
              {image?
                <a className="square-center" href="javascript:void(0)"
                  onClick={this.selectAdImage.bind(this, index)}>
                  <img src={image} />
                </a> :
                <div className="square-center">
                  <Button bsSize="xsmall" bsStyle='success'
                    onClick={this.selectAdImage.bind(this, index)}>
                    Upload
                  </Button>
                </div>
              }
            </div>
          </div>
        );
      }.bind(this))}
      </Col>
    </Row>

 */
module.exports = objectiveMixin;
