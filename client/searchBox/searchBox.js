var timeout = null;
Session.set("films", []);
Session.set("loading", false);

Template.searchBox.events({
	"keydown input.film-name": function(event, template) {
		if (event.target.value.length <2) {
			timeout = Meteor.setTimeout(function() {
				Session.set("films", []);
			});
		} else if (event.target.value.length >= 2 || event.keyCode === 13) {
			if (timeout !== null) {
				Meteor.clearTimeout(timeout);
			}
			if (event.keyCode === 13) {
				timeout = null;
				requestFilms(event.target.value);
			} else {
				timeout = Meteor.setTimeout(function() {
					timeout = null;
					requestFilms(event.target.value);
				}, 1000);
			}
		}
	}
});

Template.searchBox.helpers({
	films: function() {
		return Session.get("films");
	},
	loading: function() {
		return Session.get("loading");
	}
})
