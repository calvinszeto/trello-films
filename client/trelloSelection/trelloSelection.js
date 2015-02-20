Template.trelloSelection.helpers = {
	signedToTrello: function() {
		return Meteor.user().signedToTrello;
	},
	userData: function() {
		return userData.find({});
	}
};

Template.trelloSelection.events = {
	"click #signToTrello": function() {
		Meteor.loginWithTrello(function() {
			console.log("it worked?")
		});
	}
}
