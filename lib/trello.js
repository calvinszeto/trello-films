Accounts.oauth.registerService('trello');
if (Meteor.isClient) {
    Meteor.loginWithTrello = function(options, callback) {
        // support a callback without options
        if (! callback && typeof options === "function") {
            callback = options;
            options = null;
        }
        var credentialRequestCompleteCallback = Accounts.oauth.credentialRequestCompleteHandler(callback);
        Trello.requestCredential(options, credentialRequestCompleteCallback);
    };
} else {
    // TODO: Configure which fields to publish
    var autopublishedFields = _.map(
        // don't send access token. https://dev.twitter.com/discussions/5025
        Twitter.whitelistedFields.concat(['id', 'screenName']),
        function (subfield) { return 'services.twitter.' + subfield; 
    });

    Accounts.addAutopublishFields({
        forLoggedInUser: autopublishedFields,
        forOtherUsers: autopublishedFields
    });
}
