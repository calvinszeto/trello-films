var timeout = null;
Session.set("films", []);

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
			Session.set("films", response.movies);
		}
	});
}

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
	}
})
