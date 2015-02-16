Meteor.subscribe("films");

requestFilms = function(query) {
	var params = {
		q: query,
		page_limit: 10,
		page: 1
	};
	var rtBaseUrl = "http://api.rottentomatoes.com/api/public/v1.0/movies.json?apikey=htntxm48ts9uh4jk74p34bpp&"
	jQuery.ajax({
		type: "GET",
		crossDomain: true,
		url: rtBaseUrl + jQuery.param(params),
		dataType: 'jsonp',
		success: function(response) {
			Meteor.call("updateFilms", response.movies);
		}
	});
}

Template.searchBox.events({
	"change input.film-name": function(event, template) {
		// TODO: Cancel the timeout on new calls
		Meteor.setTimeout(function() {
			requestFilms(event.target.value);
		}, 1000);
	}
});

Template.searchBox.helpers({
	films: function() {
		return Films.find({});
	}
})
