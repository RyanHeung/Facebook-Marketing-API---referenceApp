# Reference App with Facebook Ads API #

We are excited to introduce open source **Ads Reference App** build on top of Facebook's Ads APIs.  The app is built in Javascript and uses [Node.js](http://nodejs.org/) and [react](http://facebook.github.io/react/).

## Download ##
We are hosting a live version on [Facebook Marketing Developers](https://www.facebookmarketingdevelopers.com/reference_app/). You can try out the reference app and also download the code from the webpage.

## Setup ##
We have not fully tested the app on various operating systems. The app is independent of operating systems but you may encounter issues while setting it up on your system.  You may need to hack them and are more than welcome to report any issues during the setup.

### Linux/Unix/Mac ###
Here are the steps to setup the reference app on your Linux box.

1. Unzip the ZIP file containing the code.  You should have already done that as you are reading the document in the ZIP.
2. Run "**./env_setup**" to setup Node.js on your machine.  The script will download Node.js (v0.12.0), compile and install it into the package folder.  It may take a while and please be patient.  If you already have Node.js installed on your machine, you can skip this step but ensure that your Node.js version is higher or equal to v0.12.0.  Please note that you can always run the provided script to setup Node.js.  It will not interfere with the one in your system and can be easily removed by deleting the folder.
3. Run "**./build**" to download dependencies by npm and bundle javascript files with browserify.  We are using gulp and watcher to enable automatic bundle update while you changed the source files.  If you do not plan to change source files while you are playing with the reference app, you can stop the script (<kbd>Ctrl+C</kbd>) while you see "**Finished 'default' after xxx μs**" in your console window.
4. Run "**./start_app**".  You may need to open a new console window if you want to keep the "build" script running.  This script will start a web server to host the reference app at localhost:8080.
5. Open your browser and change the address to "http://localhost:8080".  You will see the reference app.

### Windows ###
Here are the steps to setup the reference app on Windows system.

1. Unzip the ZIP file containing the code.  You should have already done that as you are reading the document in the ZIP.
2. Go to [Node.js](http://nodejs.org/) to install Node.js on your machine.  If you already have Node.js installed on your machine, please upgrade it if its version is lower than v0.12.0.
3. Run "**build_win.cmd**" to download dependencies by npm and bundle javascript files with browserify.  We are using gulp and watcher to enable automatic bundle update while you changed the source files.  If you do not plan to change source files while you are playing with the reference app, you can stop the script (<kbd>Ctrl+C</kbd>) while you see "**Finished 'default' after xxx μs**" in your console window.
4. Run "**./start_app_win.cmd**".  You may need to open a new console window if you want to keep the "build" script running.  This script will start a web server to host the reference app at localhost:8080.
5. Open your browser and change the address to "http://localhost:8080".  You will see the reference app.

## Quick Intro on Reference App ##
This is an early release of the **Ads Reference App**, there might be still some bugs and defects in the app, and we welcome any feedback.

After you launch the app, you will be immediately asked for an ad account and access token.  You can generate access tokens from the [Graph API Explorer](https://developers.facebook.com/tools/explorer/).  You need to select your own apps to generate the access token to be used in the reference app. Please remember to include ad_management permission while you are requesting the access token.  You can also add your ad account and access token to the file "**src/js/adsAPIInit.js**" to avoid being asked after every page refresh.

```javascript
  var adsAPIConfig = {
    // Please add your Access Token & Ad Account here
    // If they are missing, you will be asked in the app
    adAccountId: <ad_account_id>,
    accessToken: <access_token>,
    ......
```

Once you provided valid ad account and access token, you will see the information about your ads. Although, the UI is similar to the ads manager, given the focus of the reference app is to educate and help you onboard the Ads API more quickly, we have not focused on UI.

## Beta version of Node.JS SDK ##
You may noticed the folder "**facebook-adssdk-node**" in the package folder.  It contains the beta version of the Node.js SDK.  It can be run in both Node.js and browser (through browserify).  The reference app is calling the SDK to communicate with Facebook's API servers.  If you are also interested in this SDK, please take a look and share with us your feedback.  We hope the SDK can fit your need as much as possible.  The SDK is automatically generated and may not be very readable right now.  You may just need to pay attention to the callsites in the reference app.
