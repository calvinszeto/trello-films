Session.set("selectedFilm", null);

Template.body.helpers({
	showSearchBox: function() {
		return Session.get("selectedFilm") === null;
	},
	showFilmCard: function() {
		return Session.get("selectedFilm") !== null;
	}
});
