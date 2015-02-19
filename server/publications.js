Meteor.publish("userData", function() {
	if (this.userId) {
		user = Meteor.users.find({_id: this.userId},
            {fields: {emails: 1, signedToTrello: 1}});
		console.log(user);
		return user;
	} else {
		this.ready();
	}
});
