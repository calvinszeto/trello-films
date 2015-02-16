Meteor.publish("films", function() {
	return Films.find();
});
