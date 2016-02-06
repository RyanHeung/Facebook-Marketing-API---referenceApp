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
    Button = Bootstrap.Button,
    ButtonGroup = Bootstrap.ButtonGroup,
    ButtonToolbar = Bootstrap.ButtonToolbar,
    Col = Bootstrap.Col,
    DropdownButton = Bootstrap.DropdownButton,
    Glyphicon = Bootstrap.Glyphicon,
    Input = Bootstrap.Input,
    Label = Bootstrap.Label,
    ListGroup = Bootstrap.ListGroup,
    ListGroupItem = Bootstrap.ListGroupItem,
    MenuItem = Bootstrap.MenuItem,
    ModalTrigger = Bootstrap.ModalTrigger;
    Nav = Bootstrap.Nav,
    NavItem = Bootstrap.NavItem,
    Navbar = Bootstrap.Navbar,
    Panel = Bootstrap.Panel;
    Row = Bootstrap.Row,
    Table = Bootstrap.Table;
var LineChart = require("react-chartjs").Line;

var AdsAPIInit = require('./adsAPIInit');
var AdsCreation = require('./adsCreation');

var adCampaignUpdate = require('./update/adCampaignUpdate');
var adSetUpdate = require('./update/adSetUpdate');
var adUpdate = require('./update/adUpdate');

var adsObjects = [
  {
    displayName: 'Ad Account',
    displayNamePlural: 'Ad Accounts',
    getObject: function(account, id) {
      return account;
    },
    getChildren: function(account, id) {
      return account.getAdCampaigns()
        .require('name', 'campaign_group_status');
    },
    insights: {
      id: 'account_id',
      name: 'account_name',
      level: 'account',
    },
  },
  {
    displayName: 'Ad Campaign',
    displayNamePlural: 'Ad Campaigns',
    getObject: function(account, id) {
      return account.getAdCampaign(id);
    },
    getChildren: function(account, id) {
      return account.getAdCampaign(id).getAdSets()
        .require('name', 'campaign_status');
    },
    newObject: function(account, parentId) {
      return account.createAdCampaign();
    },
    updateModal: adCampaignUpdate,
    insights: {
      id: 'campaign_group_id',
      name: 'campaign_group_name',
      level: 'campaign_group',
    },
  },
  {
    displayName: 'Ad Set',
    displayNamePlural: 'Ad Sets',
    getObject: function(account, id) {
      return account.getAdSet(id);
    },
    getChildren: function(account, id) {
      return account.getAdSet(id).getAds()
        .require('name', 'adgroup_status');
    },
    newObject: function(account, parentId) {
      return account.getAdCampaign(parentId).createAdSet();
    },
    updateModal: adSetUpdate,
    insights: {
      id: 'campaign_id',
      name: 'campaign_name',
      level: 'campaign',
    },
  },
  {
    displayName: 'Ad',
    displayNamePlural: 'Ads',
    getObject: function(account, id) {
      return account.getAd(id);
    },
    newObject: function(account, parentId) {
      return account.getAdSet(parentId).createAd();
    },
    updateModal: adUpdate,
    insights: {
      id: 'adgroup_id',
      name: 'adgroup_name',
      level: 'adgroup',
    },
  },
];

var chartDef = {
  options: {
    responsive: true,
    maintainAspectRatio: true,
    datasetFill: false,
  },
  colors: {
    impression: "rgba(253,184,99,1)",
    click: "rgba(230,97,1,1)",
    action: "rgba(178,171,210,1)",
    reach: "rgba(94,60,153,1)",
    spend: "rgba(253,184,99,1)",
  },
};

var tableDef = [
  {
    name: 'id',
    displayName: 'Id',
  },
  {
    name: 'name',
    displayName: 'Name',
  },
  {
    name: 'delivery',
    displayName: 'Delivery',
  },
  {
    name: 'cpm',
    displayName: 'CPM',
    sortable: true,
    insights: 'cpm',
  },
  {
    name: 'cpc',
    displayName: 'CPC',
    sortable: true,
    insights: 'cpc',
  },
  {
    name: 'cpa',
    displayName: 'CPA',
    sortable: true,
    insights: 'cost_per_total_action',
  },
  {
    name: 'cpp',
    displayName: 'CPP',
    sortable: true,
    insights: 'cpp',
  },
  {
    name: 'spend',
    displayName: 'Spend',
    sortable: true,
    insights: 'spend',
  },
];

var toCamelCase = function(underscore) {
  var parts = underscore.split('_');
  var camelCase = parts[0];
  for (var i = 1; i < parts.length; ++i) {
    var part = parts[i];
    camelCase += part.charAt(0).toUpperCase() + part.slice(1);
  }
  return camelCase;
};

var adsManagement = React.createClass({
  mixins: [AdsAPIInit.AdsAPIInitMixin, Router.Navigation],

  // data refresh
  updatePageData: function() {
    var level = this.state.objectLevel;
    var id = this.state.idTrace[level];
    var adsObject = adsObjects[level];
    var insightsFields = [
      'impressions', 'clicks', 'total_actions', 'reach',
      'cpm', 'cpc', 'cost_per_total_action', 'cpp',
      'spend',
    ];

    // get time serise
    var insights = adsObject.getObject(
        this.APIContext.adAccount, id).getInsights();
    insights.datePreset = 'last_14_days';
    insights.timeIncrement = 1;
    insights.fields = JSON.stringify(insightsFields.concat(
      adsObject.insights.id, adsObject.insights.name
    ));
    insights.done().then(function(response) {
      var data = response.data;
      if (data && data.length > 0) {
        console.log(data);
        console.log(adsObject.insights.name);
        var newState = {name: data[0][toCamelCase(adsObject.insights.name)]};

        var xLabels = [];
        var chartDataCount = [[],[],[],[]];
        var chartDataCost = [[],[],[],[]];
        var chartDataSpend = [];
        data.forEach(function(value) {
          xLabels.push(value.dateStart);
          chartDataCount[0].push(value.impressions);
          chartDataCount[1].push(value.clicks);
          chartDataCount[2].push(value.totalActions);
          chartDataCount[3].push(value.reach);
          chartDataCost[0].push(value.cpm);
          chartDataCost[1].push(value.cpc);
          chartDataCost[2].push(value.costPerTotalAction);
          chartDataCost[3].push(value.cpp);
          chartDataSpend.push(value.spend);
        });

        var createDataset = function(label, timeSerise) {
          return {
            label: label.charAt(0).toUpperCase() + label.slice(1),
            pointColor: chartDef.colors[label],
            strokeColor: chartDef.colors[label],
            data: timeSerise,
          };
        };
        newState.chartData = [
          {
            labels: xLabels,
            datasets: [
              createDataset('impression', chartDataCount[0]),
              createDataset('click', chartDataCount[1]),
              createDataset('action', chartDataCount[2]),
              createDataset('reach', chartDataCount[3]),
            ],
          },
          {
            labels: xLabels,
            datasets: [
              createDataset('impression', chartDataCost[0]),
              createDataset('click', chartDataCost[1]),
              createDataset('action', chartDataCost[2]),
              createDataset('reach', chartDataCost[3]),
            ],
          },
          {
            labels: xLabels,
            datasets: [
              createDataset('spend', chartDataSpend),
            ],
          },
        ];
        this.setState(newState);
      }
    }.bind(this));

    this.updateTableData();
  },

  updateTableData: function(data) {
    var level = this.state.objectLevel;
    if (level < adsObjects.length - 1) {
      var id = this.state.idTrace[level];
      var adsObject = adsObjects[level];
      var adsObjectChild = adsObjects[level + 1];

      adsObject.getChildren(this.APIContext.adAccount, id).done()
        .then(function(response) {
          // set page size
          response.pageSize = 15;
          // save response for pagination
          this.tableDataResponse = response;
          this.fillTableData(response.data);
        }.bind(this));
    }
  },

  fillTableData: function(data) {
    if (data && data.map) {
      var level = this.state.objectLevel;
      var id = this.state.idTrace[level];
      var adsObject = adsObjects[level];
      var adsObjectChild = adsObjects[level + 1];
      var insightsFields = [
        'cpm', 'cpc', 'cost_per_total_action', 'cpp',
        'spend',
      ];

      var insights = adsObject.getObject(
          this.APIContext.adAccount, id).getInsights();
      insights.datePreset = 'last_14_days';
      insights.timeIncrement = 'all_days';
      insights.level = adsObjectChild.insights.level;
      insights.filtering = JSON.stringify([
        {
          field: adsObjectChild.insights.id,
          operator: 'IN',
          value: data.map(function(v){return v.id}),
        }
      ]);
      insights.fields = JSON.stringify(insightsFields.concat(
        adsObjectChild.insights.id
      ));
      insights.done().then(function(response) {
        var insights_data = {};
        if (response.data && response.data.forEach) {
          var insights_id = toCamelCase(adsObjectChild.insights.id);
          response.data.forEach(function(value) {
            insights_data[value[insights_id]] = value;
          });
        }

        var tableData = [];
        var pageSize = this.tableDataResponse.pageSize;
        data.forEach(function(value, index) {
          if (index < pageSize) {
            var insights_value = insights_data[value.id];
            tableData.push({
              id: value.id,
              name: value.name,
              cpm: insights_value? insights_value.cpm : 0,
              cpc: insights_value? insights_value.cpc : 0,
              cpa: insights_value? insights_value.costPerTotalAction : 0,
              cpp: insights_value? insights_value.cpp : 0,
              spend: insights_value? insights_value.spend : 0,
            });
          }
        });
        this.setState({tableData: tableData});
      }.bind(this));
    }
  },

  // event handlers
  handleChartSelect: function(chartIndex) {
    this.setState({chartIndex:chartIndex});
  },

  handleTableSort: function(colIndex, event) {
    var def = tableDef[colIndex];
    if (def.sortable) {
      if (def.insights === this.state.sortBy) {
        this.state.sortDesc = !this.state.sortDesc;
      } else {
        this.state.sortBy = def.insights;
        this.state.sortDesc = true;
      }
      this.updateTableData();
    }
  },

  handleRowClick: function(rowIndex, event) {
    // move to the next level
    this.state.idTrace[++this.state.objectLevel] =
      this.state.tableData[rowIndex].id;

    this.transitionTo('/adsManagement', {}, {
      level: this.state.objectLevel,
      ids: JSON.stringify(this.state.idTrace),
    });
  },

  handleBack: function(level, event) {
    this.transitionTo('/adsManagement', {}, {
      level: level,
      ids: JSON.stringify(this.state.idTrace),
    });
  },

  preventRowClick: function(event) {
    event.stopPropagation();
  },

  tablePrevPage: function(e) {
    this.tableDataResponse.previous()
      .then(function(response) {
        this.fillTableData(response.data);
      }.bind(this));
  },

  tableNextPage: function(e) {
    this.tableDataResponse.next()
      .then(function(response) {
        this.fillTableData(response.data);
      }.bind(this));
  },

  // react functions
  getInitialState: function() {
    this.APIContext = {
      adsAPI: this.getAdsAPI(),
      adAccountId: this.getAdAccountId(),
      adAccount: this.getAdsAPI().getAdAccount(this.getAdAccountId()),
    }

    var query = this.props.query;
    var level = (query.level)? parseInt(query.level) : 0;
    var idTrace = (query.ids)? JSON.parse(query.ids) : [this.getAdAccountId()];
    if (level >= idTrace.length) {
      level = idTrace.length - 1;
    }

    return {
      idTrace: idTrace ,
      objectLevel: level,
      sortBy: 'spend',
      sortDesc: true,
      tableData: [],
      chartData: [],
      chartIndex: 0,
    };
  },

  componentWillMount: function() {
    this.updatePageData();
  },

  render: function() {
    var level = this.state.objectLevel;
    var id = this.state.idTrace[level];
    var adsObject = adsObjects[level];

    var chartData = this.state.chartData[this.state.chartIndex];
    var chartJSX = <div />;
    var chartLegendJSX = chartJSX;
    if (chartData) {
      chartJSX = <LineChart style={{paddingRight: 20}}
        data={chartData} options={chartDef.options}
        redraw />;
      chartLegendJSX = (
        <ul className="line-legend">
          {chartData.datasets.map(function(value, index) {
            return (
              <li key={index}>
                <span style={{color: value.strokeColor}}>
                  <strong>{value.label}</strong>
                </span>
              </li>
            );
          })}
        </ul>
      );
    }
    var chartPanelJSX = (
      <Panel header="Performance">
        <Row>
          <Col md={3}>
            <ListGroup>
              <ListGroupItem key={0} href='javascript:void(0)'
                onClick={this.handleChartSelect.bind(this, 0)}
                active={this.state.chartIndex === 0? true:false}>
                Delivery Stats
              </ListGroupItem>
              <ListGroupItem key={1} href='javascript:void(0)'
                onClick={this.handleChartSelect.bind(this, 1)}
                active={this.state.chartIndex === 1? true:false}>
                Cost
              </ListGroupItem>
              <ListGroupItem key={2} href='javascript:void(0)'
                onClick={this.handleChartSelect.bind(this, 2)}
                active={this.state.chartIndex === 2? true:false}>
                Amount Spent
              </ListGroupItem>
            </ListGroup>
          </Col>
          <Col md={7}>
            {chartJSX}
          </Col>
          <Col md={2}>
            {chartLegendJSX}
          </Col>
        </Row>
      </Panel>
    );

    var tablePanelJSX = (<div></div>);
    if (level < adsObjects.length - 1) {
      var adsObjectChild = adsObjects[level + 1];
      var UpdateModal = adsObjectChild.updateModal;
      var obj = adsObjectChild.newObject(this.APIContext.adAccount,
        this.state.idTrace[this.state.objectLevel]);
      var toolbarJSX = (
        <ButtonToolbar>
          <ButtonGroup>
            <ModalTrigger
              modal={<UpdateModal api={this.APIContext} objectNew={obj}/>}>
            <Button>
              <Glyphicon glyph='plus' /> New {adsObjectChild.displayName}
            </Button>
            </ModalTrigger>
          </ButtonGroup>
          <ButtonGroup className="pull-right">
            <Button onClick={this.tablePrevPage}>
              <Glyphicon glyph='menu-left'/> Previous
            </Button>
            <Button onClick={this.tableNextPage}>
              Next <Glyphicon glyph='chevron-right'/>
            </Button>
          </ButtonGroup>
        </ButtonToolbar>
      );
      tablePanelJSX = (
        <Panel header={adsObjectChild.displayNamePlural}>
          <Table responsive hover>
            <thead>
              <th></th>
              {tableDef.map(function(value, index) {
                var className = (value.sortable)? 'clickable' : '';
                var isColSorted = (this.state.sortBy === value.insights);
                return (
                  <th key={index} className={className}
                    onClick={this.handleTableSort.bind(this, index)}>
                    {value.displayName} {(isColSorted)?
                      <Glyphicon glyph={(this.state.sortDir === 0)?
                        'triangle-top':'triangle-bottom'} />:
                      <span></span>
                    }
                  </th>
                );
              }.bind(this))}
              <th></th>
            </thead>
            <tbody>
              {this.state.tableData.map(function(rowData, rowIndex) {
                var rows = [];

                var UpdateModal = adsObjectChild.updateModal;
                var obj = adsObjectChild.getObject(
                    this.APIContext.adAccount, rowData.id);
                rows.push(
                  <td key={-1}>
                    <ModalTrigger modal={
                      <UpdateModal api={this.APIContext} objectExist={obj}/>}>
                      <Button bsSize='xsmall' onClick={this.preventRowClick}>
                        <Glyphicon glyph='edit' /> Edit
                      </Button>
                    </ModalTrigger>
                  </td>
                );

                tableDef.map(function(value, colIndex) {
                  var colData = rowData[value.name];
                  rows.push(
                    <td key={colIndex}>
                      {(value.format)?
                        value.format.bind(this, rowIndex)(colData) : colData
                      }
                    </td>
                  );
                }.bind(this));
                return (
                  <tr key={rowIndex}
                    onClick={this.handleRowClick.bind(this, rowIndex)}>
                    {rows}
                  </tr>
                );
              }.bind(this))}
            </tbody>
          </Table>
          {toolbarJSX}
        </Panel>
      );
    }

    return (
      <div>
        <Navbar brand='AdsReferenceApp'>
          <Nav right>
            <ModalTrigger modal={<AdsCreation api={this.APIContext}/>}>
              <NavItem href='javascript:void(0)'>Create Ads</NavItem>
            </ModalTrigger>
            <NavItem href={'#' + AdsAPIInit.RounterPath}>
              <Glyphicon glyph='lock'/>
            </NavItem>
          </Nav>
        </Navbar>
        <div style={{padding: '10px 30px'}}>
          <h4>
            {adsObject.displayName}: {this.state.name} ({id})
          </h4>
          <h6>
            {this.state.idTrace.map(function(value, index) {
              if (index >= this.state.objectLevel) {
                return null;
              }
              var text = adsObjects[index].displayName + ' (' + value + ')';
              return (
                <a key={index} href='javascript:void(0)'
                  style={{paddingRight:10}}
                  onClick={this.handleBack.bind(this, index)}>
                  <Glyphicon glyph='chevron-left' />{text}
                </a>
              );
            }.bind(this))}
          </h6>
          {chartPanelJSX}
          {tablePanelJSX}
        </div>
      </div>
    );
  },
});

module.exports = adsManagement;
