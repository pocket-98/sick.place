$(document).ready(function() {
	$(window).on("mousemove swipe click tap" , function(e) { updateButtonPosition(e.pageX, e.pageY); });
	updateButtonPosition(window.innerWidth/2, window.innerHeight/2);
});

function updateButtonPosition(x, y) {
	var button = $("#report-sickness-button");
	var offsetX = button[0].clientWidth / 2;
console.log(offsetX);
	var offsetY = button[0].clientHeight / 2;
	button.css({
		left: (x-offsetX) + "px",
		top: (y-offsetY) + "px"
	});
}

