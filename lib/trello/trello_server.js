Twitter = {};
//TODO: Change these urls to match Trello
var urls = {
    requestToken: "https://api.twitter.com/oauth/request_token",
    authorize: "https://api.twitter.com/oauth/authorize",
    accessToken: "https://api.twitter.com/oauth/access_token",
    authenticate: "https://api.twitter.com/oauth/authenticate"
};

//TODO: Change these fields to match Trello
// https://dev.twitter.com/docs/api/1.1/get/account/verify_credentials
Trello.whitelistedFields = ['profile_image_url', 'profile_image_url_https', 'lang'];
OAuth.registerService('trello', 1, urls, function(oauthBinding) {
    //TODO: Change this url to match Trello
    var identity = oauthBinding.get('https://api.twitter.com/1.1/account/verify_credentials.json').data;
    var serviceData = {
        id: identity.id_str,
        screenName: identity.screen_name,
        accessToken: OAuth.sealSecret(oauthBinding.accessToken),
        accessTokenSecret: OAuth.sealSecret(oauthBinding.accessTokenSecret)
    };

    // include helpful fields from trello
    var fields = _.pick(identity, Trello.whitelistedFields);
    _.extend(serviceData, fields);
    return {
        serviceData: serviceData,
        options: {
            profile: {
                name: identity.name
            }
        }
    };
});

Trello.retrieveCredential = function(credentialToken, credentialSecret) {
    return OAuth.retrieveCredential(credentialToken, credentialSecret);
};
