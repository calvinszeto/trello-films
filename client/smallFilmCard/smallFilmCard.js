Template.smallFilmCard.events({
	"click .small-film-card": function(event, template) {
		films = Session.get("films");
		selectedFilm = films.filter(function(element) {
			return element.id === template.data.id;
		})[0];
		Session.set("selectedFilm", selectedFilm);
	}
});
