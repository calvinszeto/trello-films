Meteor.methods({
	updateFilms: function(films) {
		Films.remove({});
		films.map(function(film) {
			Films.insert(film);
		});
	}
});
