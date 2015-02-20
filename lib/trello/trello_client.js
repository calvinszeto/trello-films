Trello = {};

// Request Trello credentials for the user
// @param options {optional} http://docs.meteor.com/#/full/meteor_loginwithexternalservice
// @param credentialRequestCompleteCallback {Function} Callback function to call on
// completion. Takes one argument, credentialToken on success, or Error on
// error.
Trello.requestCredential = function (options, credentialRequestCompleteCallback) {
    // support both (options, callback) and (callback).
    if (!credentialRequestCompleteCallback && typeof options === 'function') {
        credentialRequestCompleteCallback = options;
        options = {};
    }

    var config = ServiceConfiguration.configurations.findOne({service: 'trello'});
    if (!config) {
        credentialRequestCompleteCallback && credentialRequestCompleteCallback(
                new ServiceConfiguration.ConfigError());
        return;
    }

    var credentialToken = Random.secret();
    // We need to keep credentialToken across the next two 'steps' so we're adding
    // a credentialToken parameter to the url and the callback url that we'll be returned
    // to by oauth provider
    var loginStyle = OAuth._loginStyle('trello', config, options);
    // url to app, enters "step 1" as described in
    // packages/accounts-oauth1-helper/oauth1_server.js
    // TODO: Change this path to Trello path
    var loginPath = '_oauth/twitter/?requestTokenAndRedirect=true'
        + '&state=' + OAuth._stateParam(loginStyle, credentialToken);
    if (Meteor.isCordova) { // For Mobile apps
        loginPath = loginPath + "&cordova=true";
        if (/Android/i.test(navigator.userAgent)) {
            loginPath = loginPath + "&android=true";
        }
    }
    var loginUrl = Meteor.absoluteUrl(loginPath);
    OAuth.launchLogin({
        loginService: "trello",
        loginStyle: loginStyle,
        loginUrl: loginUrl,
        credentialRequestCompleteCallback: credentialRequestCompleteCallback,
        credentialToken: credentialToken
    });
};
