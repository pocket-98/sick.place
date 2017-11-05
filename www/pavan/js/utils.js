function errorHTML(msg) {
	if (msg == "" || msg == null) {
		return "";
	}
	return '<h4 class="error">' + msg + '</h4>';
}

function transitionElement(elem, html, time) {
		var el = $(elem);

		el.fadeOut(time);
		setTimeout(function() {
			el.html(html);
			el.fadeIn(time);
		}, time);
}
