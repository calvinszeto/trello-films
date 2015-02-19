Trello = {};

// Request Trello credentials for the user
//
// @param options {optional}
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
	var mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone/i.test(navigator.userAgent);
	var display = mobile ? 'touch' : 'popup';
	var scope = "email";

	if (options && options.requestPermissions)
		scope = options.requestPermissions.join(',');

	var loginStyle = OAuth._loginStyle('trello', config, options);
	var loginUrl = // TODO: update this url
		'https://www.facebook.com/dialog/oauth?client_id=' + config.appId +
		'&redirect_uri=' + OAuth._redirectUri('facebook', config) +
		'&display=' + display + '&scope=' + scope +
		'&state=' + OAuth._stateParam(loginStyle, credentialToken);

	OAuth.launchLogin({
		loginService: "trello",
		loginStyle: loginStyle,
		loginUrl: loginUrl,
		credentialRequestCompleteCallback: credentialRequestCompleteCallback,
		credentialToken: credentialToken
	});
};
