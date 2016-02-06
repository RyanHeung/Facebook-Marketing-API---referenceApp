/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

var https = require('https');
var url = require('url');
var qstring = require('querystring');
var Promise = require('promise');

// sdk modules
var APIHelper = require('./APIHelper');
var adAccount = require('./adAccount');
var fbPage = require('./page');

var _APIResponse = function(data, reqOptions) {
  var _pageNext = null;

  var json = JSON.parse(data);
  var response = {};
  if (json.paging) {
    _pageNext = json.paging.next;

    response.paging = true;
    response.data = json.data;
    response.fetch = function(count) {
      return new Promise(function (resolve, reject) {
        if (_pageNext)
        {
          if (count) {
            // change the 'limit' parameter
            _pageNext = _pageNext.replace(
              /[\?&]limit=([0-9]+)/,
              function(match, p1) {
                if (parseInt(p1) < count) {
                  return match.substring(0, 7) + count.toString();
                }
                return match;
            });
          }

          // withCredentials = false is required in browser due to CORS
          var options = url.parse(_pageNext);
          options.withCredentials = false;
          https.get(options, function(resp) {
            var respData = '';
            resp.on('data', function(chunk) {
              respData += chunk;
            });
            resp.on('end', function() {
              if (resp.statusCode === 200) {
                var nextJson = JSON.parse(respData);
                if (nextJson.paging) {
                  _pageNext = nextJson.paging.next
                } else {
                  _pageNext = null;
                }

                response.data = nextJson.data;
                resolve(response);
              } else {
                reject(Error(
                  'HTTP Error ' + resp.statusCode + '\n' + respData));
              }
            });
          }).on('error', function(error) {
            reject(error);
          });
        } else {
          // no more pages
          response.data = null;
          resolve(response);
        }
      });
    };
  } else {
    response.data = json;
    response.paging = false;
  }
  return response;
};

var _isFileStream = function(value) {
  return (value.pipe instanceof Function);
}

var _makeMultipartContent = function(content, params, boundary) {
  // prepare the request body and compute its length
  var length = 0;
  for (var key in params) {
    var value = params[key];
    var header = '--' + boundary + '\r\n';
    if (length) {
      header = '\r\n' + header;
    }
    if (_isFileStream(value)) {
      // add file size
      length += value.size;
      header += 'Content-Disposition: form-data; name="'
        + key + '"; filename="' + value.name + '"\r\n'
        + 'Content-Type: application/octet-stream\r\n'
        + 'Content-Transfer-Encoding: binary\r\n\r\n';
    } else {
      // add string length
      value = new Buffer(value.toString());
      length += value.length;
      header += 'Content-Disposition: form-data; name="'
        + key +'"\r\n\r\n';
    }

    var headerBytes = new Buffer(header);
    length += headerBytes.length;
    content.push(headerBytes);
    content.push(value);
  }

  var lastLine = new Buffer('\r\n--' + boundary + '--\r\n');
  length += lastLine.length;
  content.push(lastLine);

  return length;
};

module.exports = function(version, accessToken) {
  var adsAPI =  {
    call: function(method, path, params) {
      return new Promise(function (resolve, reject) {
        var options = {
          host: 'graph.facebook.com',
          port: 443,
          path: '/' + version + path,
          method: method,
          // this parameter is required in browser due to CORS
          withCredentials: false,
        };

        var fullParams = {
          access_token: accessToken,
        };
        var hasFileParam = false;
        for (var key in params) {
          var value = params[key];
          if (_isFileStream(value)) {
            hasFileParam = true;
          } else if (typeof value === 'object') {
            value = JSON.stringify(value);
          }
          fullParams[key] = value;
        }

        var postContent = null;
        if (method === 'GET' || method == 'DELETE') {
          if (hasFileParam) {
            reject(
              Error('GET or DELETE method does not support file params!')
            );
          }
          options.path += '?' + qstring.stringify(fullParams);
        } else if (method === 'POST') {
          postContent = [];
          if (hasFileParam) {
            var boundary = '------' + APIHelper.randomString(24);
            var length = _makeMultipartContent(
              postContent, fullParams, boundary);

            options.headers = {
              'Content-Type': 'multipart/form-data; boundary='+ boundary,
              'Content-Length': length,
            };
          } else {
            var content = qstring.stringify(fullParams);
            postContent.push(content);
            options.headers = {
              'Content-Type': 'application/x-www-form-urlencoded',
              'Content-Length': content.length,
            };
          }
        } else {
          reject(Error('Invalid method ' + method));
        }

        // Add SDK tracking on user agent
        options.headers = options.headers || {};
        var userAgentForSDK = 'fb-js-ads-sdk-'
          + require('./package.json').version;
        options.headers['User-Agent'] = userAgentForSDK;

        // Altering user agent is not allowed in browsers
        // Use custom HTTP header then
        var isInBrower = (typeof window !== 'undefined');
        if (isInBrower) {
          options.headers['X-FB-JS-USER-AGENT'] = userAgentForSDK;
        }

        var req = https.request(options, function(resp) {
          var respData = '';
          resp.on('data', function(chunk) {
            respData += chunk;
          });
          resp.on('end', function() {
            if (resp.statusCode === 200) {
              resolve(_APIResponse(respData, options));
            } else {
              reject(Error(
                'HTTP Error ' + resp.statusCode + '\n' + respData));
            }
          });
        });
        if (method === "POST") {
          var queue = Promise.resolve();
          postContent.forEach(function(content) {
            queue = queue.then(function() {
              return new Promise(function(resolve, reject) {
                if (_isFileStream(content)) {
                  content.pipe(req);
                  content.on('end', resolve).on('error', reject);
                } else {
                  req.write(content);
                  resolve();
                }
              });
            });
          });
          queue.then(function() {
            req.end();
          });
        } else {
          req.end();
        }

        req.on('error', reject);
      });
    },
    getAdAccount: function(adAccountId) {
      return adAccount.init({adsAPI: adsAPI}, 'act_' + adAccountId);
    },
    getPage: function(pageId) {
      return fbPage.init({adsAPI: adsAPI}, pageId);
    },
  };

  return adsAPI;
};
