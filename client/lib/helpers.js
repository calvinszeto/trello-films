requestFilms = function(query) {
	var params = {
		q: query,
		page_limit: 10,
		page: 1
	};
	var rtBaseUrl = "http://api.rottentomatoes.com/api/public/v1.0/movies.json?apikey=htntxm48ts9uh4jk74p34bpp&"
	Session.set("loading", true);
	jQuery.ajax({
		type: "GET",
		crossDomain: true,
		url: rtBaseUrl + jQuery.param(params),
		dataType: 'jsonp',
        cache: true,
		success: function(response) {
			Session.set("films", response.movies);
			Session.set("loading", false);
		}
	});
}
